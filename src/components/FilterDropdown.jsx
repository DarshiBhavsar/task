import React from 'react'

const FilterDropdown = ({ setFilter }) => {
    return (
        <div className='max-w-xs mx-auto bg-white rounded-lg'>
            <select
                onChange={setFilter}
                className={`input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900`}
            >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    )
}

export default FilterDropdown
