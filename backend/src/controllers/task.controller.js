import { HttpStatus } from '../constant/http.status.js';

export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async createTask(req, res) {
    const taskData = req.validated.body;
    const newTask = await this.taskService.createTask(taskData);
    res.status(HttpStatus.CREATED).json(newTask);
  }

  async getTaskById(req, res) {
    const taskId = req.validated.params.id;
    const task = await this.taskService.getTaskById(taskId);
    res.status(HttpStatus.OK).json(task);
  }

  async updateTask(req, res) {
    const taskId = req.validated.params.id;
    const updateData = req.validated.body;
    const updatedTask = await this.taskService.updateTask(taskId, updateData);
    res.status(HttpStatus.OK).json(updatedTask);
  }

  async deleteTask(req, res) {
    const taskId = req.validated.params.id;
    await this.taskService.deleteTask(taskId);
    res.status(HttpStatus.NO_CONTENT).json({ message: 'Task deleted successfully' });
  }

  async addComment(req, res) {
    const taskId = req.validated.params.id;
    const commentData = req.validated.body;
    const comment = await this.taskService.addComment(taskId, commentData);
    res.status(HttpStatus.CREATED).json(comment);
  }

  async getTasksWithFilters(req, res) {
    const filters = req.validated.query;
    const tasks = await this.taskService.getTasksWithFilters(filters);
    res.status(HttpStatus.OK).json(tasks);
  }
}
