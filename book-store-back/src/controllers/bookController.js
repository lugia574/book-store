const BookModel = require("../models/bookModel");
const { successResponse, badRequestResponse } = require("../utils/response");

/* 변수 설명
category_id : 도서카테고리
news : 신간도서 유무 (오늘 날짜 기준 한달)
limit : page 당 도서수
currentPage : 현재 페이지
offset = limit * (currentPage - 1) : 시작위치
*/
class BookController {
  async get(req, res) {
    const allBooksRes = {};
    const { news, limit, currentPage } = req.query;
    const categoryId = req.query.category_id;
    try {
      const books = await BookModel.getBooks(
        categoryId,
        news,
        limit,
        currentPage
      );

      allBooksRes.books = books;

      const totalCount = await BookModel.getTotalCount();

      const pagination = {
        currentPage: parseInt(currentPage),
        totalCount,
      };
      allBooksRes.pagination = pagination;

      return successResponse(res, allBooksRes);
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }

  async detail(req, res) {
    // 로그인 상태가 아니면 liked 빼고 보내주고
    const bookId = parseInt(req.params.id);

    try {
      const result = await BookModel.getBookDetail(req, res, bookId);
      if (result) return successResponse(res, result);
      else return notFoundResponse(res, "도서 정보가 없습니다.");
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }
}

module.exports = new BookController();
