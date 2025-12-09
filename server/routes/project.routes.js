import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: list & read
router.route("/api/projects").get(projectCtrl.list);
router.route("/api/projects/:projectId").get(projectCtrl.read);

// Admin-only: create, update, delete
router
  .route("/api/projects")
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create);

router
  .route("/api/projects/:projectId")
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;