console.log('wassup nigga');


const refreshPage = document.getElementById("logo");
refreshPage.addEventListener("click", function () {
    window.location.reload();
});

let currSong = new Audio();

function secondsToMinutes(seconds) {
    // Calculate minutes and seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Add leading zeros if necessary
    var minutesString = (minutes < 10 ? '0' : '') + minutes;
    var secondsString = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

    // Return formatted time
    return minutesString + ':' + secondsString;
}

async function getSongs() {
    // let a = await fetch("http://127.0.0.1:3000/songs/");
    let a = await fetch("/songs/")
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }

    }

    return (songs);

}
const pausedButton = document.getElementById("play_n_pause");
const playMusic = (songs, pause = true) => {
    currSong.src = "/songs/" + songs;
    if (pause) {
        currSong.play();
        pausedButton.classList.remove("fa-play");
        pausedButton.classList.add("fa-pause");
    }
    // for dynamically updating the song and artist
    document.querySelector(".song_box > span:first-child").innerHTML = decodeURI(songs);
    document.querySelector(".song_box > span:last-child").innerHTML = "wespy";
    //     var audio = new Audio("/songs/" + songs);
    //     audio.play();
}

async function main() {

    // to get the list of all songs
    let songs = await getSongs();
    // console.log(songs);
    playMusic(songs[0], false);

    // lets display our songs here 
    let songsUl = document.querySelector(".songs").getElementsByTagName("ul")[0]
    for (const song of songs) {
        let songName = songsUl.innerHTML = songsUl.innerHTML + `<li>
            <i class="fa-solid fa-music"></i>
            <div class="songInfo">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>wespy</div>
            </div>
        </li>`;
    }


    // to play the first song after user interacts with the page 
    // https://stackoverflow.com/questions/9419263/how-to-play-audio
    // var audio = new Audio(songs[0]);
    // audio.play(); 


    // commented everything because i only need the duration here
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    // let volume = audio.volume;
    // let src = audio.src;
    // let currentTime = audio.currentTime;
    // console.log(duration)
    // console.log(src)
    // console.log(volume)
    // console.log(currentTime)
    // });

    // lets attach an event listener to each of my song 
    let mySongsArray = document.querySelector(".songs").getElementsByTagName("li");
    Array.from(mySongsArray).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songInfo").firstElementChild.innerHTML);
            playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML)
        })
    });


    // event listerner for the player buttons
    const playButton = document.getElementById("play_n_pause");

    playButton.addEventListener("click", () => {
        if (currSong.paused) {
            currSong.play();
            playButton.classList.remove("fa-play");
            playButton.classList.add("fa-pause");
        } else {
            currSong.pause();
            playButton.classList.remove("fa-pause");
            playButton.classList.add("fa-play");
        }
    });

    // fellas lets update the the song time now

    function secondsToMinutes(seconds) {
        // Calculate minutes and seconds
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.floor(seconds % 60);

        // Add leading zeros if necessary
        var minutesString = (minutes < 10 ? '0' : '') + minutes;
        var secondsString = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

        // Return formatted time
        return minutesString + ':' + secondsString;
    }


    currSong.addEventListener("timeupdate", () => {
        // console.log(currSong.currentTime, currSong.duration);
        document.querySelector(".track_and_ball > span:first-child").innerHTML = `${secondsToMinutes(currSong.currentTime)}`;
        document.querySelector(".track_and_ball > span:last-child").innerHTML = `${secondsToMinutes(currSong.duration)}`;
        document.querySelector(".tracker_ball").style.left = (currSong.currentTime / currSong.duration) * 99 + "%";



    })
    // tracker path banaya jaye taaki click krte hi  gaana aage badh jaye  
    document.querySelector(".tracker_path").addEventListener("click", e => {
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 99;
    document.querySelector(".tracker_ball").style.left = percent + "%";
    currSong.currentTime = ((currSong.duration) * percent) / 99;
    });

    // hambugirrr se side menu nikala jaye
    document.querySelector(".fa-bars").addEventListener("click", e=>{
        document.querySelector(".side_menu").style.left = "0%";
    })
    
    // hambugirrr se side menu wapas bheja jaye
    document.querySelector(".fa-xmark").addEventListener("click", e=>{
        document.querySelector(".side_menu").style.left = "-100%";
    })
    
}

main()

