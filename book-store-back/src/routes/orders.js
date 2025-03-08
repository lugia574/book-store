const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  validate,
  validItem,
  validDelivery,
  validAddress,
  validReciver,
  validContact,
  validBookTitle,
  validTotalQunatity,
  validTotalPrice,
  validUserId,
  validId,
} = require("../utils/validation");

const validateOrder = [
  // validItem,
  // validDelivery,
  // validAddress,
  // validReciver,
  // validContact,
  // validBookTitle,
  // validTotalQunatity,
  // validTotalPrice,
  // validUserId,
  // validate,
];

router.use(express.json());

router.post("/", validateOrder, OrderController.order);
router.get("/", OrderController.get);
router.get("/:id", [validId, validate], OrderController.detail);

module.exports = router;
