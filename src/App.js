import './App.css';
import TodoForm from './components/inputForm/TodoForm';
import TodoItem from './components/todoItem/TodoItem';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { deleteItemFromLocal, getTodoLocalStoData, todoSetLocalSto, updateLocalData } from './utilities/localStorageTodo';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-blue-500 bg-slate-200 py-5 mb-5">
        Simple to do app
      </h1>
      <TodoApp></TodoApp>
    </div>
  );
}

// to do app functionality
const TodoApp = () => {
  let initData = getTodoLocalStoData() || [];
  const [data, setData] = useState(initData);
  let dataLen = data.length;

  // Data save
  const callMyfun = () =>{
    const data = document.getElementById("input").value;
    // console.log(data.trim());
    if(data === ''){
      console.log("empty string call");
      Swal.fire({
        title: '<small class="text-red-400">Please fill up input field correctly</small>',
        icon: 'info',
        showCloseButton: true,
      })
    }else{
      // console.log(todoSetLocalSto(data));
      const res = todoSetLocalSto(data)
      if(res === 1001){
        const latestData = getTodoLocalStoData();
        setData(latestData);
        document.getElementById("input").value = '';
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Data added succesfully'
        })
      }else if(res === 1000){
        Swal.fire({
          title: '<small class="text-red-400">Data already exits</small>',
          icon: 'error',
          showCloseButton: true,
        })
      }else{
        Swal.fire({
          title: '<small class="text-red-400">Internal error ! try again</small>',
          icon: 'error',
          showCloseButton: true,
        })
      }
    }
  }
  // delete item
  const deleteItem = (index) =>{
    let deletedData = data[index];
    Swal.fire({
      title: 'Are you sure? ',
      html: `Delete <strong> ${deletedData} </strong>. You won't be able to revert !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // console.log(result);
      if(result.isConfirmed === true){
          // console.log("index ",index);
          deleteItemFromLocal(index);
          const getData = getTodoLocalStoData() || [];
          setData(getData);
          Swal.fire(
            'Deleted!',
            `<b>${deletedData}</b> has been deleted.`,
            'success'
          )
      }
    })
  }
// update item 
const updateItem = (index) => {
  const tarUpdateData = data[index];
  // console.log(index);
  Swal.fire({
    title: `<p>Update</b>`,
    html: `
        <input id='modal-update-value-id' class="p-2 bg-green-200 border-green-900 border-2" value="${tarUpdateData}" type="text">
    `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Update now!'
  }).then((result) => {
    let tarVal = document.getElementById("modal-update-value-id").value;
    if(tarVal === ''){
      Swal.fire(
        'Alert',
        'Input field not be empty!',
        'warning'
      )
    }else{
      if (result.isConfirmed) {
        const res = updateLocalData(tarVal,index);
        if(res === 1000){//data already exits
          Swal.fire(
            'Opps',
            `<b> ${tarVal}</b> already exits.</b>`,
            'error'
          )
        }else{
          // console.log("value fetch ",tarVal);
          const updatedData = getTodoLocalStoData();
          setData(updatedData);
          Swal.fire(
            'Updated!',
            `Your name has been updated from <b> ${tarUpdateData}</b> to <b>${tarVal}</b>`,
            'success'
          )
        }
      }
    }
  });
}

  return (
    <div className='bg-blue-100 p-5 rounded-md border-red-200 my-5 max-w-sm m-auto'>
      <TodoForm 
      callMyfun = {callMyfun}
      className="border-b-2">
      </TodoForm>

     {
      data.map( (data , inx) => <TodoItem totalDataLen={dataLen} index={inx} deleteItem = {deleteItem} updateItem = {updateItem} data = {data} key = {inx}> </TodoItem> )
     } 
    </div>
  );
}




export default App;
