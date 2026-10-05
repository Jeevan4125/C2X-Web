import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  saveProjectFile,
  getProjectVersions,
  getProjectActivity,
  getRecentWorkspaces,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/workspaces/recent", getRecentWorkspaces);
router.get("/", getProjects);
router.post("/", createProject);
router.get("/:id", getProjectById);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);
router.post("/:id/files", saveProjectFile);
router.get("/:id/versions", getProjectVersions);
router.get("/:id/activity", getProjectActivity);

export default router;
