const Todo = require("../models/todo");

const createTodo = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        if (!title || !description || !deadline) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingTodo = await Todo.findOne({ title });
        if (existingTodo) {
            return res.status(409).json({
                success: false,
                message: "Todo already exists"
            });
        }

        const todo = await Todo.create({
            title,
            description,
            deadline
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllTodo = async (req, res) => {
    try {
        const allTodo = await Todo.find();
        return res.status(200).json({
            success: true,
            data: allTodo,
            message: "Todos fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await Todo.findById(todoId); // Pass string directly
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            todo,
            message: "Todo found"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updatedTodo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId); // Pass string directly
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo};