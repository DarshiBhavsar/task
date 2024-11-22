const Task = require("../models/taskModel");

const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            status
        });
        await newTask.save();
        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error("Error creating task", error);
        res.status(500).json({ message: "Error creating task" });
    }
};

const getTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const status = req.query.status || "";

        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }
        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter).skip(skip).limit(limit);

        const totalTasks = await Task.countDocuments(filter);

        res.status(200).json({
            tasks,
            pagination: {
                totalTasks,
                currentPage: page,
                totalPages: Math.ceil(totalTasks / limit),
                limit
            }
        })
    } catch (error) {
        console.error("Error fetching tasks", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ task });
    } catch (error) {
        console.error("Error fetching task", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, {
            title,
            description,
            status
        },
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ task });
    } catch (error) {
        console.error("Error updating task", error);
        res.status(500).json({ message: "Error updating tasks" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task", error);
        res.status(500).json({ message: "Error deleting tasks" });
    }
};

module.exports = {
    createTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask
};