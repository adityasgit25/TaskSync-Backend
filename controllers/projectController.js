import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
});

// @desc    Get a project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Validate required fields
  if (!name) {
    res.status(400);
    throw new Error('Project name is required');
  }

  // Check if user already has 4 projects
  const projectCount = await Project.countDocuments({ userId: req.user._id });
  if (projectCount >= 4) {
    res.status(400);
    throw new Error('Maximum number of projects (4) reached');
  }

  // Create new project
  const project = await Project.create({
    name,
    description,
    userId: req.user._id,
  });

  if (project) {
    res.status(201).json(project);
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Find project
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (project) {
    project.name = name || project.name;
    project.description = description !== undefined ? description : project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  // Find project
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (project) {
    // Delete all associated tasks first
    await Task.deleteMany({ projectId: project._id });
    
    // Delete the project
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Get all tasks for a project
// @route   GET /api/projects/:id/tasks
// @access  Private
const getProjectTasks = asyncHandler(async (req, res) => {
  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Get tasks for the project
  const tasks = await Task.find({ projectId: req.params.id });
  res.json(tasks);
});

// @desc    Create a task for a project
// @route   POST /api/projects/:id/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  // Validate required fields
  if (!title) {
    res.status(400);
    throw new Error('Task title is required');
  }

  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Create task
  const task = await Task.create({
    title,
    description,
    status: status || 'pending',
    projectId: project._id,
    userId: req.user._id,
  });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error('Invalid task data');
  }
});

// @desc    Update a task
// @route   PUT /api/projects/:id/tasks/:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Find task
  const task = await Task.findOne({
    _id: req.params.taskId,
    projectId: req.params.id,
  });

  if (task) {
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/projects/:id/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Find task
  const task = await Task.findOne({
    _id: req.params.taskId,
    projectId: req.params.id,
  });

  if (task) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
};