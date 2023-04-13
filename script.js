console.log("Music Player");
// Initialize the Variables

let songIndex = 0;
let audioElement = new Audio('clone res/mysong/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cachecol - kamaitachi, Sanza", filePath: "clone res/mysong/1.mp3", coverPath: "clone res/song_img/1.jfif"},
    {songName: "Bury Me Low - 8 Graves", filePath: "clone res/mysong/2.mp3", coverPath: "clone res/song_img/2.jfif"},
    {songName: "Elephant In The Room - Rowan Drake", filePath: "clone res/mysong/3.mp3", coverPath: "clone res/song_img/3.jfif"},
    {songName: "Sab Dhuan - Mohan Kannan, Nilotpal Bora", filePath: "clone res/mysong/4.mp3", coverPath: "clone res/song_img/4.jfif"},
    {songName: "Change My Clothes - Alec Benjamin", filePath: "clone res/mysong/5.mp3", coverPath: "clone res/song_img/5.jfif"},
    {songName: "The Otherside - Jake Daniels", filePath: "clone res/mysong/6.mp3", coverPath: "clone res/song_img/6.jfif"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{ 
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-solid fa-play');
        masterPlay.classList.add('fa-solid fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove(' fa-solid fa-pause');
        masterPlay.classList.add(' fa-solid fa-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-solid fa-pause');
        element.classList.add('fa-solid fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-solid fa-play');
        e.target.classList.add('fa-solid fa-pause');
        audioElement.src = 'clone res/mysong/${songIndex+1}.mp3';
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-solid fa-play');
        masterPlay.classList.add('fa-solid fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'clone res/mysong/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid fa-play');
    masterPlay.classList.add('fa-solid fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'clone res/mysong/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid fa-play');
    masterPlay.classList.add('fa-solid fa-pause');
})