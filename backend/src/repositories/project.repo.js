export class ProjectRepository {
  constructor(ProjectModel) {
    this.ProjectModel = ProjectModel;
  }

  async create(projectData) {
    return await this.ProjectModel.create(projectData);
  }

  async update(projectId, updateData) {
    return await this.ProjectModel.findByIdAndUpdate(projectId, updateData, { new: true });
  }

  async findById(projectId) {
    return await this.ProjectModel.findById(projectId);
  }

  async findByUserId(userId) {
    return await this.ProjectModel.find({ owner: userId });
  }
  async addMember(projectId, userId) {
    return await this.ProjectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: userId } },
      { new: true }
    );
  }

  async removeMember(projectId, userId) {
    return await this.ProjectModel.findByIdAndUpdate(
      projectId,
      { $pull: { members: userId } },
      { new: true }
    );
  }

  async delete(projectId) {
    return await this.ProjectModel.findByIdAndUpdate(projectId, { isDeleted: true }, { new: true });
  }
}
