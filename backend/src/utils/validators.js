export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeEmail = (email) => {
  return email.trim().toLowerCase();
};

export const getClientIP = (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.ip ||
    null
  );
};

export default {
  validateEmail,
  sanitizeEmail,
  getClientIP,
};
