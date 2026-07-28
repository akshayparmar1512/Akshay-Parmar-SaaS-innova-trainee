let inputtext = document.getElementById("inputtext");
let analyzebtn = document.getElementById("analysis-btn")

analyzebtn.addEventListener("click", () => {

    let usertext = inputtext.value.trim();
    console.log(usertext);

    if (usertext === "") {
        alert("Please enter some text.");
        return;
    }

    usertext = usertext.toLowerCase();
    console.log(usertext);

    usertext = usertext.replace(/[^\w\s]/g, "");
    console.log(usertext);

    toCharacterCount(usertext);
    toWordCount(usertext);
    toCountWordFrequency(usertext);
    averageCount(usertext);
    mostCommonWord(usertext);
});


function toCharacterCount(text) {
    let result = text.replace(/\s+/g, "");
    let charactercount = document.getElementById("character-count-result");
    charactercount.textContent = result.length;
}

function toWordCount(text) {
    let wordcount = document.getElementById("word-count-result");
    if (text.includes(" ")) {
        let arr = text.split(" ");
        let newarr = arr.filter((element) => {
            return element !== "";
        });
        wordcount.textContent = newarr.length;
    } else {
        wordcount.textContent = 1;
    }
}

    let freqobj = {};

function toCountWordFrequency(text) {
    let wordfrequency = document.getElementById("word-frequency-result");

    console.log(wordfrequency);
    let words = text.split(/\s+/);
    for (let element of words) {
        if (freqobj[element] == undefined) {
            freqobj[element] = 1;
        } else {
            freqobj[element] = freqobj[element] + 1;
        }
    }
    console.log(freqobj)
    wordfrequency.innerHTML = "";

    for (let key in freqobj) {
        wordfrequency.innerHTML += `${key} : ${freqobj[key]} <br>`;
    }
}

function mostCommonWord(text) {
    let mostCommon = document.getElementById("most-common");

    let words = text.split(/\s+/);

    let maximum = 0;
    let mostCommonWord = "";

    for (let element of words) {
        if (freqobj[element] == undefined) {
            freqobj[element] = 1;
        } else {
            freqobj[element] = freqobj[element] + 1;
        }
    }
    console.log(freqobj)
   

    for (let key in freqobj) {
    if (freqobj[key] > maximum) {
        maximum = freqobj[key];
        mostCommonWord = key;
    }
    mostCommon.textContent = mostCommonWord;
}
}

function averageCount(text) {
    let avgwordcount = document.getElementById("average-count-result");
    console.log(text);
    let txtarr = text.split(/\s+/);
    console.log(txtarr);

    let finalarr = txtarr.filter((element) => {
        return element !== "";
    });
    console.log(finalarr);

    let countarr = finalarr.map((word) => {
        return word.length;
    });
    console.log(countarr);

    let sum = 0;

    for (let i = 0; i < countarr.length; i++) {
        sum += countarr[i];
    }
    console.log(sum);

    let avg = sum / countarr.length;
    console.log(avg);

    avgwordcount.textContent = avg;
}