const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createBook);
router.get("/", verifyToken, getAllBooks);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
