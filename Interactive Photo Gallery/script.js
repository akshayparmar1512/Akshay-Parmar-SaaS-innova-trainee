let urlinput = document.getElementById("url-input")
let addbtn = document.getElementById("add-btn")
let imagecontainer = document.getElementById("image-gallery")
let modal = document.getElementById("modal")
let modalimage = document.getElementById("modal-img")
let closebtn = document.getElementById("close-btn")

let urlsarr = [];

let storedurl = localStorage.getItem("urllist")
urlsarr = storedurl ? JSON.parse(storedurl) : urlsarr

// function to save url in local storage
function saveUrl() {
    localStorage.setItem("urllist", JSON.stringify(urlsarr))
}

addbtn.addEventListener("click", (e) => {
    let url = urlinput.value
    console.log(url)
    addImage(url)
    urlinput.value = "";

})

function addImage(url) {
    if (url == "") {
        alert("Please Enter URL")
        return
    }

    let urlobj = {
        urlid: Date.now(),
        url: url,
    }
    urlsarr.push(urlobj)
    saveUrl()
    showImage(urlsarr)
   
}

function showImage(urlsarr) {

    imagecontainer.innerHTML = "";

    urlsarr.forEach((url) => {
        let imagediv = document.createElement("div");
        let image = document.createElement("img");
        let deletebtn = document.createElement("button");

        imagediv.setAttribute("id", `${url.urlid}`);
        image.setAttribute("src", `${url.url}`)
        imagediv.setAttribute("class", `image-box`);
        deletebtn.textContent = "Delete"

        imagediv.appendChild(image);
        imagediv.appendChild(deletebtn);

        imagecontainer.appendChild(imagediv);



        image.addEventListener("click", (e) => {
            modalimage.setAttribute("src", `${url.url}`)
            modal.style.display = "flex"
        })
        closebtn.addEventListener("click", (e) => {
            modal.style.display = "none"
        })

        deletebtn.addEventListener("click", (e) => {
            deleteImage(url.urlid)
        })



    });
}
showImage(urlsarr)


// function to delete image
function deleteImage(id) {
    urlsarr = urlsarr.filter((url) => {
        return id !== url.urlid
    })
    saveUrl()
    showImage(urlsarr)
}
