const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }   

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")   
    }
}

function filterTodo(e) {
    const todo = todoList.childNodes;
    todo.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                case "all":
                    todo.style.display = "flex";
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
        }
    });
}

function saveLocalTodos(todo) {

    let todo;
    if (localStorage.getItem("todo") === null) {
        todo = [];
    } else {
        todo = JSON.parse(localStorage.getItem("todo"));
    }

    todo.push(todo);
    localStorage.setItem("todo", JSON.stringify(todo));

}

function getTodo() {

    let todo;
    if (localStorage.getItem("todo") === null) {
        todo = [];
    } else {
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    todo.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    let todo;
    if (localStorage.getItem("todo") === null) {
        todo = [];
    } else {
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todo.indexOf(todoIndex), 1);
    localStorage.setItem('todo', JSON.stringify(todo));
}