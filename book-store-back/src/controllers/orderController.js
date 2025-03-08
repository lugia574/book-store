const OrderModel = require("../models/orderModel");
const { tokenErrorHandler, isTokens } = require("../utils/auth");
const {
  createdResponse,
  unauthorizedResponse,
  successResponse,
} = require("../utils/response");

class OrderController {
  async order(req, res) {
    const { items, totalQuantity, totalPrice, firstBookTitle, delivery } =
      req.body;

    try {
      const token = await isTokens(req);

      if (token) {
        const deliveryId = await OrderModel.insertDelivery(delivery);

        const values = [
          firstBookTitle,
          totalQuantity,
          totalPrice,
          token.id,
          deliveryId,
        ];
        const orderId = await OrderModel.insertOrders(values);
        const orderItems = await OrderModel.getCartItems(items);

        const insertOrderedBookResults = await OrderModel.insertOrderedBook(
          orderItems,
          orderId
        );

        const deleteCartItemResult = await OrderModel.deleteCartItems(items);

        return createdResponse(res, insertOrderedBookResults[0]);
      } else {
        // console.log("걍 지나간거임?");
        unauthorizedResponse(res, new Error("권한이 없습니다."));
      }
    } catch (err) {
      tokenErrorHandler(res, err);
    }
  }

  async get(req, res) {
    try {
      const token = await isTokens(req);

      if (token) {
        const result = await OrderModel.get(token.id);

        const ordersData = result.map((e) => {
          e.bookTitle = e.book_title;
          e.createdAt = e.created_at;
          e.totalPrice = e.total_price;
          e.totalQuantity = e.total_quantity;
          delete e.book_title;
          delete e.created_at;
          delete e.total_price;
          delete e.total_quantity;
          return e;
        });
        return successResponse(res, ordersData);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }

  async detail(req, res) {
    try {
      const token = await isTokens(req);
      if (token) {
        const result = await OrderModel.detail(req.params.id);
        return successResponse(res, result);
      } else return unauthorizedResponse(res, "권한이 없습니다.");
    } catch (err) {
      return tokenErrorHandler(res, err);
    }
  }
}

module.exports = new OrderController();
