let userinput = document.getElementById("second-input");
let showtime = document.getElementById("show-time");
let showmessage = document.getElementById("show-message");
let deadtime = 0;

userinput.addEventListener("change", (e) => {
  let time = Number(e.target.value);
  showmessage.textContent = "";
  countDown(time);
});

function countDown(time) {
  let mytimer = setInterval(() => {
    // console.log(`time remianing ${time--}`);
    showtime.textContent = `Time Remaining ${time--}`;

    if (time < deadtime) {
      clearInterval(mytimer);
      //   console.log("time up");
      showmessage.textContent = `Your Time Up`;
    }
  }, 1000);
}
