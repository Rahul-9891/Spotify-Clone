console.log("Welcome to Spotify");
let Songs = [
    { SongName: "People", FilePath: "Songs/1.mp3", CoverPath: "cover photo/1.jpg", fav: false },
    { SongName: "Unstoppable", FilePath: "Songs/2.mp3", CoverPath: "cover photo/2.jpg", fav: false },
    { SongName: "Perfect", FilePath: "Songs/3.mp3", CoverPath: "cover photo/3.jpg", fav: false },
    { SongName: "52 Bars", FilePath: "Songs/4.mp3", CoverPath: "cover photo/4.jpg", fav: false },
    { SongName: "Daayre", FilePath: "Songs/5.mp3", CoverPath: "cover photo/5.jpg", fav: false },
    { SongName: "Love the Way you Lie", FilePath: "Songs/6.mp3", CoverPath: "cover photo/6.jpg", fav: false },
    { SongName: "Shape of you", FilePath: "Songs/7.mp3", CoverPath: "cover photo/7.jpg", fav: false },
    { SongName: "Believer", FilePath: "Songs/8.mp3", CoverPath: "cover photo/8.jpg", fav: false },
    { SongName: "kahani Suno", FilePath: "Songs/9.mp3", CoverPath: "cover photo/9.jpg", fav: false },
    { SongName: "Safar", FilePath: "Songs/10.mp3", CoverPath: "cover photo/10.jpg", fav: false },
]



let SongIndex = 0;
let audioElement = new Audio("./Songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let songitems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

//Fav List -------------------

let fu = () => {
    console.log(Songs)
    let favlist = [];
    Songs.forEach((song) => {
        if (song.fav === true) {
            favlist.push(song);
        }
    })
    // let favlist = Songs.filter((song) => {   //// if song.fav is true then retrun and filter function always returns an array because it can only be applied on array.  
    //     return song.fav===true
    // });

    const boxes = Array.from(document.getElementsByClassName('FavContainer'));

    boxes.forEach(box => {
        box.remove();
    });



    for (let i = 0; i < favlist.length; i++) {
        var elementcreate = document.getElementById("containe")
        var divcreation = document.createElement("div");
        divcreation.classList.add("FavContainer");
        elementcreate.appendChild(divcreation);
        divcreation.innerHTML = `<img class="imgage" src="${favlist[i].CoverPath}"/>
        <span>${favlist[i].SongName}</span>
        <span>
        <img src="Photos/favheart.png" class="photofav" onClick="removeFav('${favlist[i].SongName}')"/>
        <i class="far fa-play-circle songItemPlay"   onClick="play('${favlist[i].FilePath}' , event)"></i>
        <span>`

    }
};

const play = (plays, event) => {
    makeAllPlays();
    if (!audioElement.src.includes(plays)) {
        audioElement.src = plays
    }

    if (!audioElement.paused) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        event.target.classList.remove('fa-pause-circle');
        event.target.classList.add('fa-play-circle');
    }
    else {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        audioElement.currentTime = 0;
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');


    }
}


songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].CoverPath;
    element.getElementsByClassName('songName')[0].innerHTML = Songs[i].SongName;
    element.getElementsByClassName("AddFav")[0].id = Songs[i].SongName;
    document.getElementById(Songs[i].SongName).addEventListener("click", (e) => {
        Songs.forEach((song) => {
            if (song.SongName === e.target.id) {
                if (song.fav === false) {
                    song.fav = true;
                    e.target.setAttribute("src", "Photos/favheart.png");
                }
                else {
                    song.fav = false;
                    e.target.setAttribute("src", "Photos/herat blank icon.png")
                }
            }
        })

        fu();

    });

});

function removeFav(id) {
    Songs.forEach((song) => {
        if (song.SongName === id) {
            song.fav = false
            document.getElementById(song.SongName).setAttribute("src", "Photos/herat blank icon.png")
        }
    })
    fu();
}


masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else if (audioElement.play) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})




const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {

    element.addEventListener('click', (e) => {
        makeAllPlays();
        console.log(e)
        if (audioElement.paused) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            SongIndex = parseInt(e.target.id);
            audioElement.src = `songs/${SongIndex + 1}.mp3`;
            masterSongName.innerText = Songs[SongIndex].SongName;
            audioElement.currentTime = 0;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.play();

        }
        else if (audioElement.play) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');

        }
    })

});


document.getElementById('next').addEventListener('click', () => {
    if (SongIndex >= 9) {
        SongIndex = 0
    }

    else {
        SongIndex += 1;
    }
    audioElement.src = `songs/${SongIndex + 1}.mp3`;
    masterSongName.innerText = Songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0
    }

    else {
        SongIndex -= 1;
    }
    audioElement.src = `songs/${SongIndex + 1}.mp3`;
    masterSongName.innerText = Songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


