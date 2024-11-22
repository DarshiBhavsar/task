import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaArrowLeft } from 'react-icons/fa';
const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const darkMode = location.state?.darkMode
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
    })

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/tasks/${id}`);
                setTask(data.task)
            } catch (error) {
                console.error("Error fetching task details", error)
            }
        };
        fetchTasks();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
            toast.success("Task updated successfully");
            navigate("/")
        } catch (error) {
            console.error("Error updating task", error);
            toast.error("Error updating task");
        }
    }
    return (
        <div className={`h-screen sm:h-screen xl:h-screen ipad-pro:h-auto nest-hub:h-auto bg-gray-100 py-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <div className='absolute top-6 left-6'>
                <button onClick={() => navigate("/")} className={`flex items-center text-blue-600 ${darkMode ? "bg-gray-900 text-white hover:text-white" : "bg-gray-100 text-blue hover:text-blue-800"}`}>
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit} className={`bg-white p-8 m-auto mx-4 sm:mx-6 lg:mx-auto lg:max-w-2xl space-y-6 mt-16 ipad-pro:mt-44 lg:mt-28 xl:mt-20`}>

                <h2 className={`text-2xl ${darkMode ? "text-black" : "text-black"} font-semibold text-center text-gray-800 `}>Edit Task</h2>

                <div className='mb-4'>
                    <label className='block text-gray-600 font-medium mb-2'>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={task.title}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900'
                    />

                    <div className='mb-4 mt-4'>
                        <label className='block text-gray-600 font-medium mb-2'>Description</label>
                        <textarea
                            name='description'
                            value={task.description}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-600 font-medium mb-2'>Status</label>
                        <select
                            name='status'
                            value={task.status}
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900'
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:ng-blue-700 transition duration-200'>
                    Update Task
                </button>
            </form>
        </div>
    )
}

export default EditTask
