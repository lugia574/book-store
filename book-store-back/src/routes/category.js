const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
// const {
//   validLimit,

//   validate,
// } = require("../utils/validation");

router.use(express.json());

router.get("/", CategoryController.all);

module.exports = router;
