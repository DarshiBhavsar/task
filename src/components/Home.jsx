import React, { useEffect, useState } from 'react'
import axios from "axios"
import SearchBar from './SearchBar';
import TaskForm from './TaskForm';
import FilterDropdown from './FilterDropdown';
import TaskList from './TaskList';
const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(2);


    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/tasks?search=${search}&status=${filter}&page=${page}&limit=${limit}`
            );
            setTasks(data.tasks);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching tasks", error)
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search, filter, page, limit]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    const handlePreviousPage = () => {
        if (page < totalPages) {
            setPage(page - 1);
        }
    }

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen h-full p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100w-full bg-white dark:bg-gray-800 p-6 rounded text-gray-900"}`}>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>Task Manager</h1>
                <button onClick={toggleTheme} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Toggle Theme</button>
            </div>
            <TaskForm fetchTasks={fetchTasks} />
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 mt-10'>
                <div className='flex-1'>
                    <SearchBar setSearch={handleSearchChange} />
                </div>
                <div className='flex-1 sm:text-right'>
                    <FilterDropdown setFilter={handleFilterChange} />
                </div>
            </div>
            <TaskList tasks={tasks} fetchTasks={fetchTasks} darkMode={darkMode} />
            <div className='flex justify-between items-center mt-4'>
                <button onClick={handlePreviousPage} disabled={page === 1} className='btn-secondary'>Previous</button>
                <p>Page {page} of {totalPages}</p>
                <button onClick={handleNextPage} disabled={page === totalPages} className='btn-secondary'>Next</button>
            </div>
        </div>
    )
}

export default Home
