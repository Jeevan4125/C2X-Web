import pool from "../db/pool.js";

export const findSubscriberByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM newsletter_subscribers WHERE email = $1",
    [email],
  );
  return result.rows[0] || null;
};

export const createSubscriber = async (email, ipAddress, userAgent) => {
  const result = await pool.query(
    `INSERT INTO newsletter_subscribers (email, ip_address, user_agent)
     VALUES ($1, $2, $3)
     RETURNING id, email, subscribed_at`,
    [email, ipAddress, userAgent],
  );
  return result.rows[0];
};

export const getAllSubscribers = async (limit = 100) => {
  const result = await pool.query(
    "SELECT id, email, subscribed_at, ip_address, user_agent FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT $1",
    [limit],
  );
  return result.rows;
};

export default {
  findSubscriberByEmail,
  createSubscriber,
  getAllSubscribers,
};
