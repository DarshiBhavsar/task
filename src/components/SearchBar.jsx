import React from 'react'

const SearchBar = ({ setSearch }) => {
    return (
        <div className='max-w-lg mx-auto bg-white rounded-lg'>
            <input
                type='text'
                placeholder='Search tasks...'
                onChange={setSearch}
                className={`input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-gray-900`}
            />
        </div>
    )
}

export default SearchBar
