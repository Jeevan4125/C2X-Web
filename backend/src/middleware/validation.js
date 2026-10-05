import { body, validationResult } from "express-validator";
import { validateEmail, sanitizeEmail } from "../utils/validators.js";

export const validateEmailInput = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .customSanitizer((value) => value.toLowerCase()),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
};
