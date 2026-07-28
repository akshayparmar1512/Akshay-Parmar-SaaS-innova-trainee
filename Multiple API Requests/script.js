let tbody = document.getElementById("tbody");

const urlsarr = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/todos",
  "https://jsonplaceholder.typicode.com/comments",
];

function callMultiple(urlsarr) {
  let fetchUrls = urlsarr.map((url) => {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error");
      }
      return response.json();
      // console.log(response.json());
    });
  });

  Promise.all(fetchUrls)
    .then((responses) => {
      let [users, todos, posts] = responses;
      let alldata = { users, todos, posts };
      console.log(alldata)
      renderData(alldata);
    })
    .catch((error) => {
      console.log(error);
    });
}
callMultiple(urlsarr);

function renderData(alldata) {
  tbody.innerHTML = "";
  console.log(alldata.users);
  console.log(alldata.todos);
  console.log(alldata.posts);

  const users = alldata.users.slice(0, 10);
  const todos = alldata.todos.slice(0, 10);
  const posts = alldata.posts.slice(0, 10);

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const todoTd = document.createElement("td");
    const postTd = document.createElement("td");

    nameTd.textContent = users[i].name;
    emailTd.textContent = users[i].email;
    todoTd.textContent = todos[i].title;
    postTd.textContent = posts[i].body;

    row.append(nameTd, emailTd, postTd, todoTd);
    tbody.append(row);

  }

  // alldata.users.forEach((user) => {
  // let row = null;
  // let namecell = null;
  // let emailcell = null;
  // let postcell = null;
  // let todocell = null;
  //   row = document.createElement("tr");
  //   namecell = document.createElement("td");
  //   emailcell = document.createElement("td");
  //   postcell = document.createElement("td");
  //   todocell = document.createElement("td");
  //   namecell.textContent = user.name;
  //   emailcell.textContent = user.email;

  //   row.append(namecell, emailcell, postcell, todocell);
  //   tbody.append(row);
  // });

  // alldata.todos.forEach((todo) => {
  //   todocell.textContent = todo.title;
  // });

  // alldata.posts.forEach((post) => {
  //   postcell.textContent = post.name;
  // });
}

