// data save localStorage
const getTodoLocalStoData = ()=>{
    const localDataStr = localStorage.getItem("simpleTodoApp");
    const localData = JSON.parse(localDataStr);
    return localData || false;
}
// is exits before
const isExitData =text => {
    const localData = getTodoLocalStoData();
    if(localData === false){
        return false;
    }else{
        const res = localData.find(str => str === text);
        if(res === undefined){
            return false;
        }else{
            return true;
        }
    }
} 
// save data into localstorage
const dataSaveLocalStor = (text) => {
    let dataArr = getTodoLocalStoData() || [];
    dataArr.unshift(text);
    localStorage.setItem("simpleTodoApp", JSON.stringify(dataArr));
    if(dataArr.length < getTodoLocalStoData().length){
        return true;
    }else{
        return false;
    }
}

// todo set data into local storage
const todoSetLocalSto = text =>{
    console.log("is exits or not : ",isExitData(text));
    if(isExitData(text)){
        return 1000 // data already exits
    }else{
        if(!dataSaveLocalStor(text)){
            return 1001 // data insert success 
        }else{
            return 1002 // data not insert internal error! try again
        }
    }
}

//  item delete 
const deleteItemFromLocal = idx =>{
    let localData = getTodoLocalStoData();
    localData.splice(idx,1);
    // clear local data
    localStorage.clear("simpleTodoApp");
    localStorage.setItem("simpleTodoApp", JSON.stringify(localData));
}

// update data...
const updateLocalData = (updatedText,idx) => {
    console.log("updated Data : ", updatedText);
    const res = isExitData(updatedText);
    console.log("is exits response : ",res);
    if(res){
        return 1000 // data already exits 
    }else{
        let localData = getTodoLocalStoData();
        localData[idx] = updatedText;
        localStorage.clear("simpleTodoApp");
        localStorage.setItem("simpleTodoApp", JSON.stringify(localData));
        return 1001 // data insert success
    }
}

export {todoSetLocalSto, getTodoLocalStoData,deleteItemFromLocal,updateLocalData};