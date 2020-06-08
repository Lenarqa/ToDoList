//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-option')

//Event Listeners
todoButton.addEventListener('click', addToDo);

todoList.addEventListener('click', deleteFunction);

filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos);


// functions
function addToDo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList = "todo";
    
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    
    todoDiv.appendChild(completedButton);

    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    
    todoDiv.appendChild(trashButton);

    if(todoInput.value == ""){
        alert("Вы забыли ввести задание")
    }else{
        todoList.appendChild(todoDiv); //append to todoList
        saveLocalTodos(todoInput.value);
        todoInput.value = "";
    }
}

function deleteFunction(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalStorageTodo(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //chech
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList = "todo";
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
    
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn');
        
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv); //append to todoList
    });
}

function removeLocalStorageTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // console.log(todo.innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);

    localStorage.setItem('todos', JSON.stringify(todos));
}