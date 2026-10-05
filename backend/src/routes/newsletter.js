import express from "express";
import {
  subscribe,
  getSubscribers,
} from "../controllers/newsletterController.js";
import { validateEmailInput } from "../middleware/validation.js";

const router = express.Router();

router.post("/subscribe", validateEmailInput, subscribe);
router.get("/subscribers", getSubscribers);

export default router;
