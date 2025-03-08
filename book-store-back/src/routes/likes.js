const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/LikeController");
const { validId, validate } = require("../utils/validation");

router.use(express.json());

router.post("/:id", [validId, validate], LikeController.add);
router.delete("/:id", [validId, validate], LikeController.remove);

module.exports = router;
