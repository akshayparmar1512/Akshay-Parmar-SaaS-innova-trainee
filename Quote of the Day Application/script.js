let quoteArr = [];
let quoteel = document.getElementById("quote");
let authorel = document.getElementById("author");
let btn = document.getElementById("get-quote");
btn.addEventListener("click", (e) => {
  getQuote();
});

// async function getQuote() {
//   try {
//     const response = await fetch("https://dummyjson.com/quotes/random");
//     console.log(response);
//     if (!response.ok) {
//       throw new Error("Something Went Wrong");
//     }
//     let data = await response.json();
//     console.log(data);
//     quoteArr = data;
//     console.log(quoteArr);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getQuote();

let getQuote = () => {
  let promise = fetch("https://dummyjson.com/quotes/random");
  console.log(promise);

  promise
    .then((response) => {
      if(!response.ok){
        throw new Error("HTTP Error")
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showQuote(data.quote, data.author);
    })
    .catch((error) => {
      console.log(error);
    });
};
getQuote();
function showQuote(quote, author) {
  quoteel.textContent = quote;
  authorel.textContent = author;
}
