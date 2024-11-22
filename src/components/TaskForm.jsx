import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskForm = ({ fetchTasks, darkMode }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (!status.trim()) newErrors.status = "Status is required";
        return newErrors;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
        if (name === "title") {
            setTitle(value);
        }
        if (name === "description") {
            setDescription(value);
        }
        if (name === "status") {
            setStatus(value);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/tasks", {
                title,
                description,
                status,
            });
            setTitle("");
            setDescription("");
            setStatus("");
            setErrors({});
            fetchTasks();
            toast.success("Task added successfully");

        } catch (error) {
            console.error("Error adding task", error);
            toast.error("Failed to add task");
        }
    };
    const placeholderStyle = darkMode ? "placeholder-gray-300" : "placeholder-gray-500"
    return (
        <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg space-y-4'>
            <div>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={title}
                    onChange={handleChange}
                    className={`input mb-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : ""} text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900`}
                />
                {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
            </div>

            <div>
                <textarea
                    placeholder='Description'
                    name='description'
                    value={description}
                    onChange={handleChange}
                    className={`textarea mb-0 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${placeholderStyle} ${errors.description ? "border-red-500" : ""} text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-bg-gray-900`}
                />
                {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description}</p>}
            </div>

            <div className='relative w-full'>
                <select
                    value={status}
                    name='status'
                    onChange={handleChange}
                    className={`appearance-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 ${errors.status ? "border-red-500" : !status ? "text-gray-400" : "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900"}`}
                >
                    <option value="" disabled hidden>Choose status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                    <svg
                        className='w-4 h-4 text-gray-500'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                    </svg>
                </div>
            </div>
            <button type='submit' className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Add Task
            </button>
        </form>
    )
}

export default TaskForm
