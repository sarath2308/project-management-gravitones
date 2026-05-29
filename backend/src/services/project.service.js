import { HttpStatus } from "../constant/http.status.js";
import { Messages } from "../constant/message.js";
import { AppError } from "../utils/error/app.error.js";

export class ProjectService
{
    constructor(projectRepository,userRepository)
    {
        this.projectRepository=projectRepository;
        this.userRepository=userRepository;
    }

    async createProject(projectData)
    {
        return await this.projectRepository.create(projectData);
    }

    async updateProject(projectId, updateData)
    {
        return await this.projectRepository.update(projectId, updateData);
    }

    async getProjectById(projectId)
    {
        return await this.projectRepository.findById(projectId);
    }

    async getProjectsByUserId(userId)
    {
        return await this.projectRepository.findByUserId(userId);
    }
    async addMember(projectId, userId)
    {
            const user=await this.userRepository.findById(userId);
            if(!user)
            {
                throw new AppError(Messages.USER_NOT_FOUND,HttpStatus.NOT_FOUND);
            }
            const project=await this.projectRepository.findById(projectId);
            if(!project)
            {
                throw new AppError(Messages.PROJECT_NOT_FOUND,HttpStatus.NOT_FOUND);
            }

            if(project.owner.toString()!==userId.toString() && user.role!=="admin")
            {
                throw new AppError(Messages.FORBIDDEN,HttpStatus.FORBIDDEN);
            }
        return await this.projectRepository.addMember(projectId, userId);
    }

    async removeMember(projectId, userId)
    {
        const user=await this.userRepository.findById(userId);
            if(!user)
            {
                throw new AppError(Messages.USER_NOT_FOUND,HttpStatus.NOT_FOUND);
            }
            const project=await this.projectRepository.findById(projectId);
            if(!project)
            {
                throw new AppError(Messages.PROJECT_NOT_FOUND,HttpStatus.NOT_FOUND);
            }
            if(project.owner.toString()!==userId.toString() && user.role!=="admin")
            {
                throw new AppError(Messages.FORBIDDEN,HttpStatus.FORBIDDEN);
            }
        return await this.projectRepository.removeMember(projectId, userId);
    }

    async deleteProject(projectId,userId)
    {
       const user=await this.userRepository.findById(userId);
         const project=await this.projectRepository.findById(projectId);
            if(project.owner.toString()!==userId.toString() && user.role!=="admin")
        {
            throw new AppError(Messages.FORBIDDEN,HttpStatus.FORBIDDEN);
        }
        return await this.projectRepository.delete(projectId);
    }

}