const express = require("express");
const { createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } = require("../controllers/todoController");
const router = express.Router();

router.post("/create", createTodo);
router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.post("/", updateTodo);
router.post("/:id", deleteTodo);

module.exports = router;