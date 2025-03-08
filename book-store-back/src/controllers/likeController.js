const LikeModel = require("../models/likeModel");
const { tokenErrorHandler, isTokens } = require("../utils/auth");
const { successResponse, unauthorizedResponse } = require("../utils/response");

class LikeController {
  async add(req, res) {
    const bookId = req.params.id;
    console.log("어디가 문제임?", bookId);
    try {
      const token = await isTokens(req);
      console.log("token", token);
      if (token) {
        const result = await LikeModel.add(bookId, token);
        console.log(result);
        successResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }

  async remove(req, res) {
    const bookId = req.params.id;

    try {
      const token = await isTokens(req);
      if (token) {
        const result = await LikeModel.remove(bookId, token);
        return successResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }
}

module.exports = new LikeController();
