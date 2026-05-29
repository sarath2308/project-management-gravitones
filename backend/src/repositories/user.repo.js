import { User } from "../models/user.model.js";

export class UserRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async create(userData) {
    return await this.UserModel.create(userData);
  }

  async findByEmail(email) {
    return await this.UserModel.findOne({ email });
  }

  async findById(id) {
    return await this.UserModel.findById(id);
  }
}