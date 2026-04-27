const express = require("express");
const { createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } = require("../controllers/todoController");
const router = express.Router();

router.post("/create", createTodo);
router.get("/getTasks", getAllTodo);
router.get("/:id", getTodoById);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;