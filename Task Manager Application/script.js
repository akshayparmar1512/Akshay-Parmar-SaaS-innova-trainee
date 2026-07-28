
let userinput = document.getElementById("user-input")
let addbtn = document.getElementById("add-btn")
let tasklist = document.getElementById("task-list")
let completebtn = document.getElementById("complete-btn")
let incompletebtn = document.getElementById("incomplete-btn")
let allbtn = document.getElementById("all-btn")


let taskarr = [];
let status = "incomplete"
let id = null

let storedtask = localStorage.getItem("tasklist")
taskarr = storedtask ? JSON.parse(storedtask) : taskarr

// function to save recipe in localstorage
function saveTask() {
  localStorage.setItem("tasklist", JSON.stringify(taskarr))
}

addbtn.addEventListener("click", (e) => {
  let task = userinput.value.trim()

  if (id) {
    editTask(id, task)
    id = null
  } else {
    addTask(task)

  }

})


userinput.addEventListener("keydown", (e) => {
  let task = userinput.value.trim()
  if (e.key == "Enter") {

    if (id) {
      editTask(id, task)
      id = null
    } else {
      addTask(task)

    }
  }
})

function addTask(task) {
  if (task == "") {
    alert("Please Enter Task")
    return
  }

  let taskobj = {
    taskid: Date.now(),
    description: task,
    status: status
  }
  taskarr.push(taskobj)
  saveTask()
  showTask(taskarr)
  userinput.value = "";
}

function showTask(taskarr) {

  tasklist.innerHTML = "";

  taskarr.forEach((element) => {
    let checkboxinput = document.createElement("input");
    let span = document.createElement("span");
    let li = document.createElement("li");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");
    let iconelement1 = document.createElement("i")
    let iconelement2 = document.createElement("i")

    checkboxinput.setAttribute("type", "checkbox");
    li.setAttribute("id", `${element.taskid}`);
    iconelement1.setAttribute("class", "fa-solid fa-pen-to-square")
    iconelement2.setAttribute("class", "fa-solid fa-trash")

    editbtn.append(iconelement1)
    deletebtn.append(iconelement2)
    span.textContent = element.description;


    if (element.status === "completed") {
      checkboxinput.checked = true;
    }


    li.appendChild(checkboxinput);
    li.appendChild(span);
    li.append(editbtn, deletebtn);
    tasklist.appendChild(li);


    editbtn.addEventListener("click", () => {
      id = element.taskid
      userinput.value = element.description
    })

    deletebtn.addEventListener("click", () => {
      deleteTask(element.taskid)
    })

    checkboxinput.addEventListener("change", (event) => {
      if (event.target.checked) {
        status = "completed";
        element.status = status;
        saveTask()
        console.log(taskarr)
        console.log(`check box checked at ${element.taskid}`);
      } else {
        status = "incomplete";
        element.status = status;
        saveTask()
        console.log(taskarr)
        console.log(`check box unchecked at ${element.taskid}`);
      }
    });


  });
}
showTask(taskarr)

// function to edit task
function editTask(id, task) {

  let editelement = taskarr.find(element => element.taskid === id)
  console.log(editelement)
  editelement.description = task;

  saveTask()
  showTask(taskarr)
}

// function to delete task
function deleteTask(id) {
  taskarr = taskarr.filter((element) => {
    return id !== element.taskid
  })
  saveTask()
  showTask(taskarr)
}

completebtn.addEventListener("click", (e) => {
  toFiltertask(taskarr);
});


// to show completed task
function toFiltertask(taskarr) {
  let completedtask = taskarr.filter((element) => {
    return (element.status == "completed");
  });
  showTask(completedtask);
}

incompletebtn.addEventListener("click", () => {
  toIncompleteTask(taskarr);
});

// to show incomplete task
function toIncompleteTask(taskarr) {
  let incompletedtask = taskarr.filter((element) => {
    return element.status === "incomplete";
  });

  showTask(incompletedtask);
}

allbtn.addEventListener("click", () => {
  showTask(taskarr);
});


