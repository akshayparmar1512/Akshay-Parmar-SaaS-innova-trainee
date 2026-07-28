const playlist = document.getElementById("playlist");
const image = document.getElementById("song-image");
const songtitle = document.getElementById("song-title");
const songartist = document.getElementById("artist-name");
const playbtn = document.getElementById("play-btn");
const stopbtn = document.getElementById("stop-btn");
const previousbtn = document.getElementById("previous-btn");
const nextbtn = document.getElementById("next-btn");
const form = document.getElementById("addsong-form");
const shufflebtn = document.getElementById("shuffle-btn")
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const songfile = document.getElementById("song");
const imagefile = document.getElementById("image");

let currentIndex = 0;
const audio = new Audio();
let isPlaying = false;

let defaultPlaylist = [
  {
    id: 1,
    title: "Faded",
    artist: "Alan Walker",
    audioPath: "songs/song1.mp3",
    imagePath: "images/image1.png",
  },
  {
    id: 2,
    title: "Believer",
    artist: "Imagine Dragons",
    audioPath: "songs/song2.mp3",
    imagePath: "images/image2.png",
  },
  {
    id: 3,
    title: "Shape of You",
    artist: "Ed Sheeran",
    audioPath: "songs/song3.mp3",
    imagePath: "images/image3.png",
  },
];


function renderPlaylist(defaultPlaylist) {
  playlist.innerHTML = "";

  defaultPlaylist.forEach((song, index) => {
    let list = document.createElement("li");
    let titleel = document.createElement("span");
    let artistel = document.createElement("span");
    let playbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    list.setAttribute("id", `${song.id}`);
    titleel.textContent = song.title;
    artistel.textContent = song.artist;
    playbtn.textContent = "Play";
    deletebtn.textContent = "Delete";
    list.append(titleel, artistel, playbtn, deletebtn);
    playlist.append(list);

    list.addEventListener("click", (e) => {
      currentIndex = index;
      console.log(currentIndex);
      displayCurrentSong(defaultPlaylist);
    });
    playbtn.addEventListener("click", (e) => {
      e.stopPropagation();

      currentIndex = index;
      displayCurrentSong(defaultPlaylist);

      audio.play();
      isPlaying = true;
    });

    deletebtn.addEventListener("click", () => {
      deleteSong(song.id);
    });
  });
}

renderPlaylist(defaultPlaylist);

function displayCurrentSong(defaultPlaylist) {
  let currentSong = defaultPlaylist[currentIndex];

  image.src = currentSong.imagePath;
  songtitle.textContent = currentSong.title;
  songartist.textContent = currentSong.artist;

  audio.src = currentSong.audioPath;
  if (isPlaying) {
    audio.play();
  }
  console.log(audio.src);

  //   console.log(currentSong);
  //   console.log(currentSong.title);
  //   console.log(currentSong.artist);
}
displayCurrentSong(defaultPlaylist);

playbtn.addEventListener("click", () => {
  playPauseSong();
});

function playPauseSong() {
  if (!isPlaying) {
    console.log("music playing");
    audio.play();
    isPlaying = true;
  } else {
    console.log("music pause");
    audio.pause();
    isPlaying = false;
  }
}

stopbtn.addEventListener("click", () => {
  stopSong();
});

function stopSong() {
  console.log("music stop");
  audio.pause();
  isPlaying = false;
  audio.currentTime = 0;
}

function nextSong() {
  console.log("next song call");
  currentIndex++;
  if (currentIndex === defaultPlaylist.length) {
    currentIndex = 0;
  }
  displayCurrentSong(defaultPlaylist);
}

function previousSong() {
  console.log("prev song call");
  if (currentIndex === 0) {
    currentIndex = defaultPlaylist.length - 1;
  } else {
    currentIndex--;
  }
  displayCurrentSong(defaultPlaylist);
}

previousbtn.addEventListener("click", () => {
  console.log("prev button click");
  previousSong();
});

nextbtn.addEventListener("click", () => {
  console.log("next button click");
  nextSong();
});


shufflebtn.addEventListener("click", () => {
  shuffleSong();
});

function shuffleSong() {
  let randomIndex = Math.floor(Math.random() * defaultPlaylist.length);

  currentIndex = randomIndex;
  displayCurrentSong(defaultPlaylist);

  if (isPlaying) {
    audio.play();
  }
}

function addSong() {
  let titlevalue = title.value;
  let artistvalue = artist.value;
  let choosesongfile = songfile.files[0];
  let chooseimagefile = imagefile.files[0];

  if (!titlevalue || !artistvalue || !choosesongfile || !chooseimagefile) {
    alert("Please fill all fields");
    return;
  }

  let songurl = URL.createObjectURL(choosesongfile);
  let imageurl = URL.createObjectURL(chooseimagefile);

  let songobj = {
    id: Date.now(),
    title: titlevalue,
    artist: artistvalue,
    audioPath: songurl,
    imagePath: imageurl,
  };

  defaultPlaylist.push(songobj);
  console.log(defaultPlaylist);
  renderPlaylist(defaultPlaylist);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addSong();
});

function deleteSong(id) {
  defaultPlaylist = defaultPlaylist.filter((song) => {
    return song.id != id;
  });
  renderPlaylist(defaultPlaylist);
}

