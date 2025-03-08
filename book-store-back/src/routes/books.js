const express = require("express");
const router = express.Router();

const BookController = require("../controllers/BookController");
const {
  validate,
  validLimit,
  validCurrentPage,
  validId,
} = require("../utils/validation");

router.use(express.json());

router.get("/", [validLimit, validCurrentPage, validate], BookController.get);
router.get("/:id", [validId, validate], BookController.detail);

module.exports = router;
