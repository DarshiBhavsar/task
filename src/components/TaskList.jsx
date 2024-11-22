import React from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, fetchTasks, darkMode }) => {
    return (
        <div className='overflow-x-auto bg-white p-6 rounded-lg shadow-md'>
            <table className='min-w-full table-auto'>
                <thead>
                    <tr className='bg-gray-200 text-left'>
                        <th className='px-4 py-2 text-sm font-semibold text-gray-700'>Title</th>
                        <th className='px-4 py-2 text-sm font-semibold text-gray-700'>Description</th>
                        <th className='px-4 py-2 text-sm font-semibold text-gray-700'>Status</th>
                        <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} darkMode={darkMode} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList
