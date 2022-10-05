import React from 'react';

const TodoForm = ({callMyfun}) => {
    return (
        <div className=' flex justify-between mb-5'>
            <input id='input' className='border-blue-500 border-2 border-r-0 w-8/12 py-2 px-2 bg-blue-100 text-blue-500 focus:outline-1' type="text" />
            <button onClick={callMyfun} className="w-4/12 py-2 px-2 bg-blue-500 text-white font-semibold text-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Add</button>
        </div>
    );
};

export default TodoForm;