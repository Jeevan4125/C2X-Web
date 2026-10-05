import pool from "../db/pool.js";
import { validateEmail, sanitizeEmail, getClientIP } from "../utils/validators.js";
import { sendSubscriptionConfirmationEmail, sendNewsletterNotification } from "../services/mailService.js";

// In-memory fallback store when PostgreSQL is offline or unconfigured
const memorySubscribers = new Map();

export const subscribe = async (req, res) => {
  const { email } = req.body || {};

  // 1. Check empty email
  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email address.",
    });
  }

  const trimmed = email.trim();

  // 2. Validate email format
  if (!validateEmail(trimmed)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  const sanitizedEmail = sanitizeEmail(trimmed);
  const ipAddress = getClientIP(req);
  const userAgent = req.headers["user-agent"] || null;
  const now = new Date().toISOString();

  try {
    let existingInDb = false;

    try {
      // Check PostgreSQL if connected
      const existing = await pool.query(
        "SELECT email FROM subscribers WHERE email = $1 UNION SELECT email FROM newsletter_subscribers WHERE email = $1",
        [sanitizedEmail]
      );
      if (existing.rows.length > 0) {
        existingInDb = true;
      }
    } catch (dbError) {
      // Database offline or query failed, fallback to memory
    }

    if (existingInDb || memorySubscribers.has(sanitizedEmail)) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed to C2X updates.",
      });
    }

    let newSubscriber = {
      id: "sub_" + Math.random().toString(36).substring(2, 10),
      email: sanitizedEmail,
      status: "active",
      subscribedAt: now,
    };

    try {
      // Try inserting into PostgreSQL
      const result = await pool.query(
        `INSERT INTO subscribers (email, status, ip_address, user_agent)
         VALUES ($1, 'active', $2, $3)
         RETURNING id, email, status, subscribed_at`,
        [sanitizedEmail, ipAddress, userAgent]
      );
      if (result.rows.length > 0) {
        newSubscriber = {
          id: result.rows[0].id,
          email: result.rows[0].email,
          status: result.rows[0].status || "active",
          subscribedAt: result.rows[0].subscribed_at,
        };
      }
    } catch (dbInsertError) {
      // Fallback to memory
      memorySubscribers.set(sanitizedEmail, newSubscriber);
    }

    // Send subscription confirmation email from info.c2x.com@gmail.com to the user's entered email
    try {
      await sendSubscriptionConfirmationEmail(sanitizedEmail);
      await sendNewsletterNotification(sanitizedEmail, ipAddress, userAgent);
    } catch (emailErr) {
      console.error("Subscription email send error:", emailErr);
      // Non-blocking: succeed even if email server credentials are not fully set
    }

    return res.status(201).json({
      success: true,
      message: "Thanks for joining C2X developer updates.",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    let list = [];
    try {
      const result = await pool.query(
        "SELECT id, email, status, subscribed_at FROM subscribers ORDER BY subscribed_at DESC LIMIT 100"
      );
      list = result.rows;
    } catch (dbError) {
      list = Array.from(memorySubscribers.values());
    }

    return res.status(200).json({
      success: true,
      data: list,
      count: list.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers.",
    });
  }
};
