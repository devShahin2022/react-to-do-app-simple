import React from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

const TodoItem = ({deleteItem,updateItem,data,index,totalDataLen}) => {
    return (
        <div>
            <div className='bg-blue-200 py-2 mt-5 my-5 flex justify-between align-middle px-2'>
                <p className='w-10/12 text-gray-800 text-start'>{totalDataLen - index}. {data}</p>
                <p onClick={()=>updateItem(index)} className='w-1/12 flex justify-end align-middle'><PencilSquareIcon className='h-5 w-5 hover:cursor-pointer hover:text-green-900'></PencilSquareIcon></p>
                <p onClick={()=>deleteItem(index)} className='w-1/12 flex justify-end align-middle'>
                <TrashIcon className="h-5 w-5 text-red-500 hover:cursor-pointer hover:text-red-900"/>
                </p>
            </div>
        </div>
    );
};

export default TodoItem;