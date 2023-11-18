let mainTaskContainerEl = document.getElementById("main-task-container");
let userInputElement = document.getElementById("userInput");
let errMsgElement = document.getElementById("errMsg");

let todoList = [
    {
        text:"Think English sentence all the time",
        uniqueId: 1,
        isChecked:false
    },
    {
        text:"Learn Driving",
        uniqueId: 2,
        isChecked:false
    },
    {
        text:"Start preparing for the Interview",
        uniqueId: 3,
        isChecked:false
    }
];
// localStorage.removeItem("todoList");
function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return [];
    }else{
        return parsedTodoList;
    }
}

function saveTodoToList(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

todoList = getTodoListFromLocalStorage();
let uniqueNo = todoList.length;

function addTodoToList(){
    if(userInputElement.value === ""){
        // alert("Enter Valid Input");
        errMsgElement.textContent = "Enter Some Input*";
        return;
    }else{
        errMsgElement.textContent = "";
    }
    uniqueNo++;
    let newTodoList = {
        text : userInputElement.value,
        uniqueId : uniqueNo,
        isChecked:false
    }
    todoList.push(newTodoList);
    createAndAppendTodo(newTodoList);
    userInputElement.value = "";
}

function onTodoStatusChange(checkboxId, labelId, todoId){
    let checkboxInputElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    
    // console.log(checkboxInputElement.checked);
    // if(checkboxInputElement.checked){
    //     labelElement.className = "strike";
    // }else{
    //     labelElement.classList.remove("strike");
    // }
    labelElement.classList.toggle("strike");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "myTodo" + eachTodo.uniqueId;
        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];

    if(todoObject.isChecked===false){
        todoObject.isChecked = true;
    }else{
        todoObject.isChecked = false;
    }
}


function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    mainTaskContainerEl.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "myTodo" + eachTodo.uniqueId;
        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}


function createAndAppendTodo(todo){
    let checkboxId = "myCheckbox" + todo.uniqueId;
    let labelId = "myLabel" + todo.uniqueId;
    let todoId = "myTodo" + todo.uniqueId;


    let tasksContainerEl = document.createElement("li");
    tasksContainerEl.classList.add("tasks-container", "d-flex", "flex-row");
    tasksContainerEl.id = todoId;
    mainTaskContainerEl.appendChild(tasksContainerEl);
    

    let inputCheckBoxEl = document.createElement("input");
    inputCheckBoxEl.type = "checkbox";
    inputCheckBoxEl.id = checkboxId;
    inputCheckBoxEl.className = "my-checkbox";
    inputCheckBoxEl.checked = todo.isChecked;
    inputCheckBoxEl.onclick = function(){
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    tasksContainerEl.appendChild(inputCheckBoxEl);
    

    let labelIconContainerEl = document.createElement("div");
    labelIconContainerEl.classList.add("shadow", "label-icon-container", "d-flex", "flex-row");
    tasksContainerEl.appendChild(labelIconContainerEl);
    

    let checkBoxLabelContainerEl = document.createElement("div");
    checkBoxLabelContainerEl.className = "checkbox-label-container";
    labelIconContainerEl.appendChild(checkBoxLabelContainerEl);
    

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    if(todo.isChecked===true)[
        labelEl.classList.add("strike")
    ]
    checkBoxLabelContainerEl.appendChild(labelEl);
    

    let deleteIconContainerEl = document.createElement("div");
    deleteIconContainerEl.className = "delete-icon-container";
    labelIconContainerEl.appendChild(deleteIconContainerEl);
    

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("delete-icon", "fa-solid", "fa-trash");
    deleteIconEl.onclick = function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainerEl.appendChild(deleteIconEl);
}


for(let todo of todoList){
    createAndAppendTodo(todo);
}


