let form = document.getElementById("recipe-form")
let recipeinput = document.getElementById("recipe")
let ingredientsinput = document.getElementById("ingredient")
let categoryinput = document.getElementById("category")
let searchinput = document.getElementById("search-input")
let categoryfilter = document.getElementById("category-filter")
let tbody = document.getElementById("tbody")

let editid = null;

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let recipe = recipeinput.value

    let ingredients = ingredientsinput.value
    let category = categoryinput.value


    if (editid) {
        editRecipe(editid, recipe, ingredients, category)
        editid = null
    } else {
        addRecipe(recipe, ingredients, category)
    }

    form.reset()
})



let recipearr = [];

let storedrecipe = localStorage.getItem("recipes")
recipearr = storedrecipe ? JSON.parse(storedrecipe) : recipearr

// function to save recipe in localstorage
function saveRecipe() {
    localStorage.setItem("recipes", JSON.stringify(recipearr))
}


// function to add recipe
function addRecipe(recipe, ingredients, category) {


    if (recipe === "" || ingredients === "" || category === "") {
        alert("Please Enter All Fields")
        return
    }

    let recipeobj = {
        recipeid: Date.now(),
        recipe: recipe,
        ingredients: ingredients.split(","),
        category: category
    }

    recipearr.push(recipeobj)
    saveRecipe()
    renderRecipe(recipearr)
}

function renderRecipe(recipearr) {
    tbody.innerHTML = ""


    recipearr.forEach(element => {

        let row = document.createElement("tr")
        let recipecell = document.createElement("td")
        let ingredientscell = document.createElement("td")
        let categorycell = document.createElement("td")
        let actioncell = document.createElement("td")
        let editbtn = document.createElement("button")
        let deletebtn = document.createElement("button")

        row.setAttribute("id", `${element.recipeid}`)
        recipecell.textContent = element.recipe
        ingredientscell.textContent = element.ingredients
        categorycell.textContent = element.category
        editbtn.textContent = "Edit"
        deletebtn.textContent = "Delete"

        actioncell.append(editbtn, deletebtn)
        row.append(recipecell, ingredientscell, categorycell, actioncell)

        tbody.append(row)

        editbtn.addEventListener("click", () => {
            editid = element.recipeid
            recipeinput.value = element.recipe;
            ingredientsinput.value = element.ingredients;
            categoryinput.value = element.category;

        })

        deletebtn.addEventListener("click", () => {
            deleteRecipe(element.recipeid)
        })
    });


}
renderRecipe(recipearr)

//  function to edit recipe
function editRecipe(editid, recipe, ingredients, category) {


    let editindex = recipearr.findIndex(element => element.recipeid === editid)
    recipearr[editindex] = {
        recipe: recipe,
        ingredients: ingredients.split(","),
        category: category
    }

    console.log(recipearr[editindex])
    saveRecipe()
    renderRecipe(recipearr)
}

// function to delete recipe
function deleteRecipe(deleteid) {
    recipearr = recipearr.filter((element) => {
        return deleteid !== element.recipeid
    })
    saveRecipe()
    renderRecipe(recipearr)
}



searchinput.addEventListener("input", (e) => {

    let value = e.target.value.toLowerCase().trim();

    if (value === "") {
        renderRecipe(recipearr);
        return;
    }


    Searchrecipe(value)

}
);

function Searchrecipe(srchval) {
    let filteredResult = recipearr.filter((element) => {
        return (
            element.recipe.toLowerCase().includes(srchval) ||
            element.ingredients.join().toLowerCase().includes(srchval) ||
            element.category.toLowerCase().includes(srchval)
        );
    });

    renderRecipe(filteredResult);
}


categoryfilter.addEventListener("change", (e) => {
    let filtervalue = e.target.value;
    if (filtervalue === "All") {
        renderRecipe(recipearr);
        return;
    }
    toFilter(filtervalue)


});

function toFilter(catval) {

    let filter = recipearr.filter((element) => {
        return element.category.includes(catval);
    });

    renderRecipe(filter);
}

