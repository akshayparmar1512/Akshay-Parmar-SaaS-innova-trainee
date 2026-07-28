let urls = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCsW10nAjoXFTDiXZW7Y-fPj9YPUX0aDKyIj-R9lhYw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3mXihsJu-wr0USs9qXsyKasT118R8RSXY_unYAyB9_3T2omHa6g6nuts&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitvluXqIqpncfboqj-Czi-7-fgxisqybf2IYjYLgrnhFsXsxOld3apnA&s=10"
]

let imagearea = document.getElementById("image-area")
let nextbtn = document.getElementById("next-btn")
let previousbtn = document.getElementById("previous-btn")
let carouselbox = document.getElementById("carousel-box")

let currentImage = 0
function showImage() {
    let image = urls[currentImage]
    imagearea.style.backgroundImage = `url(${image})`
}

showImage()

function nextImage() {
    currentImage++
    if (currentImage === urls.length) {
        currentImage = 0
    }
}

function prevImage() {
    if (currentImage == 0) {
        currentImage = urls.length - 1
    } else {
        currentImage--

    }
    console.log(currentImage)
    console.log(urls[currentImage])
}


let imageinterval;
function autoSlide() {
    imageinterval = setInterval(() => {
        nextImage()
        showImage()
    }, 3000)

}
autoSlide()

nextbtn.addEventListener("click", () => {
    nextImage()
    showImage()
})

previousbtn.addEventListener("click", () => {
    prevImage()
    showImage()
})

carouselbox.addEventListener("mouseenter",()=>{
    clearInterval(imageinterval)
})

carouselbox.addEventListener("mouseleave",()=>{
   autoSlide()
})