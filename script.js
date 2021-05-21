const musicContainer = document.querySelector('.music-container')
const playbtn = document.querySelector('#play')
const prevbtn = document.querySelector('#prev')
const nextbtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['Anser', 'Vals']

// Keep truck of the songs

let songIndex = 1 


// Initially load song into DOM
loadSong(songs[songIndex])

// Update song details

function loadSong (song) {
    title.innerText = song
    audio.src =  `music/${song}.mp3`
    cover.src =  `images/${song}.jpg`
}

function playSong () {
 musicContainer.classList.add('play')
 playbtn.querySelector('i.fas').classList.remove('fa-play')
 playbtn.querySelector('i.fas').classList.add('fa-pause')

 audio.play()

}

function pauseSong () {
    musicContainer.classList.remove('play')
    playbtn.querySelector('i.fas').classList.add('fa-play')
    playbtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong(){
 songIndex--

 if(songIndex < 0) {
     songIndex = songs.length - 1
 }

 loadSong(songs[songIndex])

 playSong()
}

function nextSong () {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
   
    loadSong(songs[songIndex])
    playSong()
}

function uddateProgress (e) {
   const {duration, currentTime} = e.srcElement
   const progressPercent = (currentTime / duration) * 100
    progress.style.width =  `${progressPercent}%` 
}

function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}


// Event listeners

playbtn.addEventListener('click', () => {
    const isPLaying = musicContainer.classList.contains('play')

    if(isPLaying){
        pauseSong()
    } else {
        playSong()
    }
})


// Change song Events

prevbtn.addEventListener('click', prevSong)
nextbtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', uddateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)