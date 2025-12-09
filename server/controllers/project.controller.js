import Project from "../models/project.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.auth && req.auth._id,
    });

    const saved = await project.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Could not create project",
    });
  }
};

const list = async (req, res) => {
  try {
    const projects = await Project.find().sort({ created: -1 });
    return res.json(projects);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Could not list projects",
    });
  }
};

const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    req.project = project;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Could not retrieve project with that ID" });
  }
};

const read = (req, res) => {
  return res.json(req.project);
};

const update = async (req, res) => {
  try {
    let project = req.project;
    project = extend(project, req.body);
    project.updated = Date.now();

    const saved = await project.save();
    return res.json(saved);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Could not update project",
    });
  }
};

const remove = async (req, res) => {
  try {
    await req.project.deleteOne();
    return res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Could not delete project",
    });
  }
};

export default { create, list, projectByID, read, update, remove };