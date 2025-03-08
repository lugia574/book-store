const express = require("express");
const router = express.Router();
const CartsController = require("../controllers/CartsController");
const {
  validBookId,
  validate,
  validQuantity,
  validId,
} = require("../utils/validation");
router.use(express.json());

router.post("/", [validBookId, validQuantity, validate], CartsController.add);
router.get("/", CartsController.get);
router.delete("/:id", [validId, validate], CartsController.remove);

module.exports = router;
