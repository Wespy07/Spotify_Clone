console.log('wassup nigga');


async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }

    }

    return (songs);

}

const playMusic = (songs)=>{
    var audio = new Audio("/songs/" + songs);
    audio.play(); 
}

async function main() {

    let currSong;

    // to get the list of all songs
    let songs = await getSongs();
    console.log(songs);

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
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".songInfo").firstElementChild.innerHTML);
            playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML)
        })
    });

    
}

main()

