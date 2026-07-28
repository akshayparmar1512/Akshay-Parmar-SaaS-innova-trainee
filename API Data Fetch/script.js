let tbody = document.getElementById("tbody");
let searchinput = document.getElementById("search-input")
let mydata = []

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("HTTP Error");
    }
    const data = await response.json();
    mydata = data

    renderData(mydata);
  } catch (error) {
    console.log(error);
  }
}
fetchData();

function renderData(mydata) {
  tbody.innerHTML = "";

  mydata.forEach((element) => {
    let row = document.createElement("tr");
    let namecell = document.createElement("td");
    let emailcell = document.createElement("td");
    let addresscell = document.createElement("td");
    let str = "";
    for (let key in element.address) {
      if (typeof element.address[key] == "object") {
        for (let key2 in element.address[key]) {
          str += element.address[key][key2]
        }
      } else {
        str += element.address[key]
      }
    }


    row.setAttribute("id", `${element.recipeid}`);
    namecell.textContent = element.name;
    emailcell.textContent = element.email;
    addresscell.textContent = str;
    row.append(namecell, emailcell, addresscell);

    tbody.append(row);
  });
}

searchinput.addEventListener("input", filterData);

function filterData(e) {
    let value = e.target.value.toLowerCase().trim();

    if (value === "") {
       renderData(mydata);
        return;
    }
    
    let filteredResult = mydata.filter((element) => {
        return (
            element.name.toLowerCase().includes(value)
        );
    });

    renderData(filteredResult);
}
