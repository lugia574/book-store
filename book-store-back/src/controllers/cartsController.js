const CartsModel = require("../models/CartsModel");
const { tokenErrorHandler, isTokens } = require("../utils/auth");

const {
  createdResponse,
  successResponse,
  unauthorizedResponse,
} = require("../utils/response");

// 장바구니 추가
class CartsController {
  async add(req, res) {
    const { book_id, quantity } = req.body;

    try {
      const token = await isTokens(req);
      if (token) {
        const result = await CartsModel.add(book_id, quantity, token);

        return createdResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      console.log(err);
      return tokenErrorHandler(res, err);
    }
  }

  // 장바구니 도서 조회
  async get(req, res) {
    const { selected } = req.body;

    try {
      const token = await isTokens(req);
      if (token) {
        const result = await CartsModel.get(selected, token);
        return successResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }

  // 장바구니 도서 삭제
  async remove(req, res) {
    const cartItemId = req.params.id;

    try {
      const token = await isTokens(req);
      if (token) {
        const result = await CartsModel.remove(cartItemId);
        return successResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }
}

module.exports = new CartsController();
