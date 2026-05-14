const createError = require("http-errors");
const UserModel = require("../models/usersModel");
const UserModelInstance = new UserModel();

module.exports = class UserService {
  async getAll() {
    try {
      const users = await UserModelInstance.findAllUsers();

      if (!users) {
        throw createError(404, "No users in database");
      }

      return users;
    } catch (err) {
      throw err;
    }
  }

  async get(data) {
    const { id } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findUserById(id);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, "User record not found");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      // Check if user already exists
      const user = await UserModelInstance.update(data);

      return user;
    } catch (err) {
      throw err;
    }
  }
};
