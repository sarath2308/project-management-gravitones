import { HttpStatus } from '../constant/http.status.js';

export class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  async createProject(req, res) {
    const userId = req.user.id;
    const projectData = req.validated.body;
    projectData.owner = userId;
    const project = await this.projectService.createProject(projectData);
    res.status(HttpStatus.CREATED).json({ message: 'Project created successfully', project });
  }

  async updateProject(req, res) {
    const projectId = req.validated.params.projectId;
    const updateData = req.validated.body;
    const project = await this.projectService.updateProject(projectId, updateData);
    res.status(HttpStatus.OK).json({ message: 'Project updated successfully', project });
  }

  async getProjectById(req, res) {
    const projectId = req.validated.params.projectId;
    const project = await this.projectService.getProjectById(projectId);
    res.status(HttpStatus.OK).json({ project });
  }

  async getProjectsByUserId(req, res) {
    const userId = req.user.id;
    const projects = await this.projectService.getProjectsByUserId(userId);
    res.status(HttpStatus.OK).json({ projects });
  }
  async addMember(req, res) {
    const projectId = req.validated.params.projectId;
    const userId = req.user.id;
    const newUser = req.validated.body.userId;
    await this.projectService.addMember(projectId, userId, newUser);
    res.status(HttpStatus.OK).json({ message: 'Member added successfully' });
  }

  async removeMember(req, res) {
    const projectId = req.validated.params.projectId;
    const userId = req.user.id;
    const newUser = req.validated.body.userId;
    await this.projectService.removeMember(projectId, userId, newUser);
    res.status(HttpStatus.OK).json({ message: 'Member removed successfully' });
  }

  async deleteProject(req, res) {
    const projectId = req.validated.params.projectId;
    const usrId = req.user.id;
    await this.projectService.deleteProject(projectId, usrId);
    res.status(HttpStatus.OK).json({ message: 'Project deleted successfully' });
  }
}
