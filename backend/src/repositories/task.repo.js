import mongoose from 'mongoose';

export class TaskRepository {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }

  async createTask(taskData) {
    return await this.taskModel.create(taskData);
  }

  async getTaskById(taskId) {
    return await this.taskModel.findById(taskId);
  }

  async updateTask(taskId, updateData) {
    return await this.taskModel.findByIdAndUpdate(taskId, updateData, { new: true });
  }

  async deleteTask(taskId) {
    return await this.taskModel.findByIdAndUpdate(taskId, { isDeleted: true }, { new: true });
  }

  async addComment(taskId, commentData) {
    return await this.taskModel.findByIdAndUpdate(
      taskId,
      { $push: { comments: commentData } },
      { new: true }
    );
  }

  async getTasksWithFilters(filters) {
    const query = { isDeleted: false };
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.projectId) {
      query.projectId = filters.projectId;
    }

    const sortField = filters.sortBy || 'createdAt';
    const sortOption = { [sortField]: -1 };

    const page = parseInt(filters.page, 10) || 1;
    const limit = parseInt(filters.limit, 10) || 10;
    const skip = (page - 1) * limit;

    return await this.taskModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
  }

  async getProjectSummary(projectId) {
    const result = await this.taskModel.aggregate([
      {
        $match: {
          projectId: new mongoose.Types.ObjectId(projectId),
        },
      },

      {
        $facet: {
          totalTasks: [
            {
              $count: 'count',
            },
          ],

          completedTasks: [
            {
              $match: {
                status: 'done',
              },
            },
            {
              $count: 'count',
            },
          ],

          tasksPerUser: [
            {
              $group: {
                _id: '$assignedTo',
                count: {
                  $sum: 1,
                },
              },
            },

            {
              $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user',
              },
            },

            {
              $unwind: '$user',
            },

            {
              $project: {
                _id: 0,
                userId: '$user._id',
                name: '$user.name',
                email: '$user.email',
                count: 1,
              },
            },
          ],
        },
      },
    ]);

    const summary = result[0];

    return {
      totalTasks: summary.totalTasks[0]?.count || 0,
      completedTasks: summary.completedTasks[0]?.count || 0,
      tasksPerUser: summary.tasksPerUser,
    };
  }
}
