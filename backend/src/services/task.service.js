export class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async createTask(taskData) {
    return await this.taskRepo.createTask(taskData);
  }

  async getTaskById(taskId) {
    return await this.taskRepo.getTaskById(taskId);
  }

  async updateTask(taskId, updateData) {
    return await this.taskRepo.updateTask(taskId, updateData);
  }

  async deleteTask(taskId) {
    return await this.taskRepo.deleteTask(taskId);
  }

  async addComment(taskId, commentData) {
    return await this.taskRepo.addComment(taskId, commentData);
  }

  async getTasksWithFilters(filters) {
    return await this.taskRepo.getTasksWithFilters(filters);
  }

  async getProjectSummary(projectId) {
    return await this.taskRepo.getProjectSummary(projectId);
  }
}
