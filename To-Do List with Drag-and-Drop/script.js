let userinput = document.getElementById("user-input");
let addbtn = document.getElementById("add-btn");
let todolist = document.getElementById("task-list");
let completebtn = document.getElementById("complete-btn");
let incompletebtn = document.getElementById("incomplete-btn");

let todosarr = [];
let status = "incomplete";
let id = null;
let draggedId;

let storedtodo = localStorage.getItem("todosdata");
todosarr = storedtodo ? JSON.parse(storedtodo) : todosarr;


function saveTodo() {
  localStorage.setItem("todosdata", JSON.stringify(todosarr));
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
  todosarr.push(todoobj);
  saveTodo();
  renderTodo(todosarr);
}

function renderTodo(todosarr) {
  todolist.innerHTML = "";

  todosarr.forEach((element) => {
    let checkboxinput = document.createElement("input");
    let span = document.createElement("span");
    let li = document.createElement("li");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");
    let iconelement1 = document.createElement("i");
    let iconelement2 = document.createElement("i");

    checkboxinput.setAttribute("type", "checkbox");
    li.setAttribute("id", `${element.todoid}`);

    // make draggable all li
    li.setAttribute("draggable", "true");



    iconelement1.setAttribute("class", "fa-solid fa-pen-to-square");
    iconelement2.setAttribute("class", "fa-solid fa-trash");

    editbtn.append(iconelement1);
    deletebtn.append(iconelement2);
    span.textContent = element.description;

    li.appendChild(checkboxinput);
    li.appendChild(span);
    li.append(editbtn, deletebtn);
    todolist.appendChild(li);


    // dragstart event 
    li.addEventListener("dragstart",()=>{
        console.log("drag started")
        draggedId = element.todoid
        console.log(draggedId)
    })

    // dragover event
    li.addEventListener("dragover",(e)=>{
        console.log("dragover fired")
        e.preventDefault()
    })

    // drop event
    li.addEventListener("drop",()=>{
        console.log("drop event fired")
        let targetId = element.todoid
        console.log(targetId)

        let dragedIndex = todosarr.findIndex((idx)=>{
            return idx.todoid==draggedId
        })
        console.log( "draged id ", dragedIndex)

         let targetIndex = todosarr.findIndex((idx)=>{
            return idx.todoid==targetId
        })
        console.log( "target id " , targetIndex)

        let arrangedTodo = todosarr.splice(dragedIndex,1)
        console.log(arrangedTodo)

        todosarr.splice(targetIndex,0,arrangedTodo[0])

        saveTodo()
        renderTodo(todosarr)

    })

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
        console.log(todosarr);
        console.log(`check box checked at ${element.todoid}`);
      } else {
        element.status = "incomplete";
        span.style.textDecoration = "none";
        saveTodo();
        console.log(todosarr);
        console.log(`check box unchecked at ${element.todoid}`);
      }
    });

    if (element.status === "completed") {
      checkboxinput.checked = true;
      span.style.textDecoration = "line-through";
    }
  });
}
renderTodo(todosarr);

// function to edit task
function editTodo(id, todo) {
  let editelement = todosarr.find((element) => {
    return element.todoid === id;
  });

  editelement.description = todo;

  saveTodo();
  renderTodo(todosarr);
}

// function to delete task
function deleteTodo(id) {
  todosarr = todosarr.filter((element) => {
    return id !== element.todoid;
  });
  saveTodo();
  renderTodo(todosarr);
}