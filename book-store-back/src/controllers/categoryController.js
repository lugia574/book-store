const CategoryModel = require("../models/categoryModel");
const { successResponse, badRequestResponse } = require("../utils/response");
class CategoryController {
  async all(req, res) {
    try {
      const result = await CategoryModel.all();
      return successResponse(res, result);
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }
}

module.exports = new CategoryController();
