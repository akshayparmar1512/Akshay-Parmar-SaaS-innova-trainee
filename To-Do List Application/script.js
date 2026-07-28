let userinput = document.getElementById("user-input");
let addbtn = document.getElementById("add-btn");
let todolist = document.getElementById("task-list");

let todos = [];
let status = "incomplete";
let id = null;
let draggedId;

let storedtodo = localStorage.getItem("todoslist");
todos = storedtodo ? JSON.parse(storedtodo) : todos;


function saveTodo() {
    localStorage.setItem("todoslist", JSON.stringify(todos));
}

addbtn.addEventListener("click", (e) => {
    let todo = userinput.value.trim();

    if (id) {
        editTodo(id, todo);
        id = null;
    } else {
        addTodo(todo);
    }
});

userinput.addEventListener("keydown", (e) => {
    let todo = userinput.value.trim();
    if (e.key == "Enter") {
        if (id) {
            editTodo(id, todo);
            id = null;
        } else {
            addTodo(todo);
        }
    }
});

function addTodo(todo) {
    if (todo == "") {
        alert("Please Enter Todo");
        return;
    }

    let todoobj = {
        todoid: Date.now(),
        description: todo,
        status: status,
    };
    todos.push(todoobj);
    saveTodo();
    renderTodo(todos);
    userinput.value = "";
}

function renderTodo(todos) {
    todolist.innerHTML = "";

    todos.forEach((element) => {
        let checkboxinput = document.createElement("input");
        let span = document.createElement("span");
        let li = document.createElement("li");
        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");
        let iconelement1 = document.createElement("i");
        let iconelement2 = document.createElement("i");

        checkboxinput.setAttribute("type", "checkbox");
        li.setAttribute("id", `${element.todoid}`);

        iconelement1.setAttribute("class", "fa-solid fa-pen-to-square");
        iconelement2.setAttribute("class", "fa-solid fa-trash");

        editbtn.append(iconelement1);
        deletebtn.append(iconelement2);
        span.textContent = element.description;

        li.appendChild(checkboxinput);
        li.appendChild(span);
        li.append(editbtn, deletebtn);
        todolist.appendChild(li);

        editbtn.addEventListener("click", () => {
            id = element.todoid;
            userinput.value = element.description;
        });

        deletebtn.addEventListener("click", () => {
            deleteTodo(element.todoid);
        });

        checkboxinput.addEventListener("change", (event) => {
            if (event.target.checked) {
                element.status = "completed";
                span.style.textDecoration = "line-through";
                saveTodo();
                console.log(todos);
                console.log(`check box checked at ${element.todoid}`);
            } else {
                element.status = "incomplete";
                span.style.textDecoration = "none";
                saveTodo();
                console.log(todos);
                console.log(`check box unchecked at ${element.todoid}`);
            }
        });

        if (element.status === "completed") {
            checkboxinput.checked = true;
            span.style.textDecoration = "line-through";
        }
    });
}
renderTodo(todos);

// function to edit task
function editTodo(id, todo) {
    let editelement = todos.find((element) => {
        return element.todoid === id;
    });

    editelement.description = todo;

    saveTodo();
    renderTodo(todos);
}

// function to delete task
function deleteTodo(id) {
    todos = todos.filter((element) => {
        return id !== element.todoid;
    });
    saveTodo();
    renderTodo(todos);
}