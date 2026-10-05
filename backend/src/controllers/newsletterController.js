import pool from "../db/pool.js";
import {
  validateEmail,
  sanitizeEmail,
  getClientIP,
} from "../utils/validators.js";
import {
  sendSubscriptionConfirmationEmail,
  sendNewsletterNotification,
} from "../services/mailService.js";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  const sanitizedEmail = sanitizeEmail(email);
  const ipAddress = getClientIP(req);
  const userAgent = req.headers["user-agent"] || null;

  try {
    // Check if already subscribed
    const existingSubscriber = await pool.query(
      "SELECT email FROM newsletter_subscribers WHERE email = $1",
      [sanitizedEmail],
    );

    if (existingSubscriber.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You are already subscribed.",
      });
    }

    // Insert new subscriber
    await pool.query(
      `INSERT INTO newsletter_subscribers (email, ip_address, user_agent)
       VALUES ($1, $2, $3)`,
      [sanitizedEmail, ipAddress, userAgent],
    );

    // Send confirmation email from info.c2x.com@gmail.com to the subscriber's email
    try {
      await sendSubscriptionConfirmationEmail(sanitizedEmail);
      await sendNewsletterNotification(sanitizedEmail, ipAddress, userAgent);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue - don't fail the request if email fails
    }

    return res.status(201).json({
      success: true,
      message: "Thanks for subscribing!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, subscribed_at, ip_address, user_agent FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT 100",
    );
    return res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers.",
    });
  }
};
