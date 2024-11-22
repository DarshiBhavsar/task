import React, { useState } from 'react'
import axios from "axios"
import { FaTrash, FaEdit } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const TaskItem = ({ task, fetchTasks, darkMode }) => {

    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleStatus = async (e) => {
        try {
            const newStatus = e.target.checked ? "Completed" : "Pending";
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
                status: newStatus,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error)
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
            fetchTasks();
            setIsDialogOpen(false);
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task", error);
            toast.error("Failed to delete task")
        }
    }

    const editTask = () => {
        navigate(`/edit/${task._id}`, { state: { darkMode } });
    }
    return (
        <tr className='bg-gray-100 hover:bg-gray-200'>
            <td className='p-4 text-gray-600 truncate max-w-xs sm:max-w-sm md :max-w-md'>{task.title}</td>
            <td className='p-4 text-gray-600 truncate max-w-xs sm:max-w-sm md:max-w-md'>{task.description}</td>
            <td className='p-4'>
                <span className={`font-medium ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                    {task.status}
                </span>
            </td>
            <td className='p-4'>
                <div className='flex items-center space-x-4'>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type='checkbox'
                            checked={task.status === "Completed"}
                            onChange={toggleStatus}
                            className='hidden'
                        />
                        <div className='relative'>

                            <div className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${task.status === "Completed" ? "bg-green-500" : "bg-gray-300"}`}>
                            </div>

                            <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-1 left-1 transition-transform duration-300 ${task.status === "Completed" ? "transform translate-x-4" : ""}`}>

                            </div>

                        </div>
                    </label>

                    <button onClick={editTask} className='px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:outline-none transition-colors duration-300' aria-label='Edit task'>
                        <FaEdit />
                    </button>

                    <button onClick={() => setIsDialogOpen(true)} className='px-3 py-2 text-white bg-red-500  rounded-full focus:outline-none transition-colors duration-300' aria-label='Delete Task'>
                        <FaTrash />
                    </button>
                </div>
            </td>

            {isDialogOpen && (
                <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 md:-top-96 lg:-top-96 xl:top-0'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full'>
                        <h3 className='text-lg font-semibold text-gray-800'> Are you sure you want to delete this task?</h3>
                        <div className='mt-4 flex justify-around'>
                            <button onClick={deleteTask} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'>
                                Yes
                            </button>
                            <button onClick={() => setIsDialogOpen(false)} className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors'>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </tr>
    )
}

export default TaskItem
