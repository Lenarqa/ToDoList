//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener('click', addToDo);

todoList.addEventListener('click', deleteFunction);

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
        todoInput.value = "";
    }
}

function deleteFunction(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })

    }

    if(item.classList[0] === 'complete-btn'){
        console.log("hi");
        item.parentElement.classList.toggle('completed');
    }
}