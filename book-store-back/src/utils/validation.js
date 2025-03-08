// 선언 잋 미들웨어, 변수

const { body, param, validationResult, query } = require("express-validator");
const { badRequestResponse } = require("./response");

const validate = (req, res, next) => {
  const err = validationResult(req);
  const { errors } = err;
  if (!err.isEmpty()) return badRequestResponse(res, errors);
  next();
};

const validEmail = body("email")
  .notEmpty()
  .isEmail()
  .withMessage("이메일 입력해주세요");

const validPassword = body("password")
  .notEmpty()
  .isString()
  .withMessage("비밀번호 입력해주세요");

const validId = param("id").notEmpty().withMessage("잘못된 정도 입니다.");

// book
const validLimit = query("limit")
  .notEmpty()
  .isInt()
  .withMessage("페이지내 도서 갯수를 지정해주세요.");

const validCurrentPage = query("currentPage")
  .notEmpty()
  .isInt()
  .withMessage("페이지를 지정해주세요");

// const validNews = query("news")
//   .notEmpty()
//   .isBoolean()
//   .withMessage("신간보기 설정 해주세요");

const validCategoryId = query("category_id").isInt().notEmpty();

// cart
const validBookId = body("book_id")
  .notEmpty()
  .isInt({ min: 1 })
  .withMessage("book을 지정해주세요");

const validQuantity = body("quantity")
  .notEmpty()
  .isInt({ min: 1 })
  .withMessage("수량을 입력해주세요");

// order
const validItem = body("items").isArray().withMessage("items이 없습니다.");
const validDelivery = body("delivery")
  .isObject()
  .withMessage("정보가 올바르지 않습니다..");
const validAddress = body("delivery.address")
  .isString()
  .withMessage("주소가 올바르지 않습니다..");
const validReciver = body("delivery.receiver")
  .isString()
  .withMessage("수취인이 올바르지 않습니다.");
const validContact = body("delivery.contact")
  .isMobilePhone("any", { strictMode: false })
  .withMessage("전화번호가 올바르지 않습니다.");
const validBookTitle = body("first_book_title").isString().withMessage("");
const validTotalQunatity = body("total_quantity")
  .isInt({ min: 1 })
  .withMessage("수량이 올바르지 않습니다.");
const validTotalPrice = body("total_price")
  .isInt({ min: 0 })
  .withMessage("가격이 올바르지 않습니다.");
const validUserId = body("user_id")
  .isInt({ min: 1 })
  .withMessage("유저 id가 올바르지 않습니다.");

module.exports = {
  validId,
  validEmail,
  validPassword,
  validate,
  validLimit,
  validCurrentPage,
  validCategoryId,
  validBookId,
  validQuantity,
  validItem,
  validDelivery,
  validAddress,
  validReciver,
  validContact,
  validBookTitle,
  validTotalQunatity,
  validTotalPrice,
  validUserId,
};
