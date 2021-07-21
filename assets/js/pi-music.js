/**
 * 1. Render songs.mp3
 * 2. Scroll top
 * 3. Play / Pause / Seek
 * 4. CD rotate
 * 5. Next / Prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
.mp3 * 9. Scroll active song .mp3into view
 * 10. Play song .mp3when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'A Drunken Night',
            singer: 'Thinh Suy',
            path: './assets/music/song1.mp3',
            image: './assets/img/Adrunkennight.jpg',
        },
        {
            name: '2002',
            singer: 'Anne Marie',
            path: './assets/music/song2.mp3',
            image: './assets/img/2002.jpg',
        },
        {
            name: 'All Fall Down',
            singer: 'Alan Walker',
            path: './assets/music/song3.mp3',
            image: './assets/img/allfalldown.jpg',
        },
        {
            name: 'That Girl',
            singer: 'Olly Murs',
            path: './assets/music/song4.mp3',
            image: './assets/img/thatgirl.jpg',
        },
        {
            name: 'Darkside',
            singer: 'Alan Walker',
            path: './assets/music/song5.mp3',
            image: './assets/img/darkside.jpg',
        },
        {
            name: 'Older',
            singer: 'Sasha Sloan',
            path: './assets/music/song6.mp3',
            image: './assets/img/older.jpg',
        },
        {
            name: 'Savage',
            singer: 'Bahari',
            path: './assets/music/song7.mp3',
            image: './assets/img/savage.jpg',
        },
        {
            name: 'Senorita',
            singer: 'Shawn Mendes',
            path: './assets/music/song8.mp3',
            image: './assets/img/senorita.jpg',
        },
        {
            name: 'So Am I',
            singer: 'Ava Max',
            path: './assets/music/song9.mp3',
            image: './assets/img/soami.jpg',
        },
        {
            name: 'Way Back Home',
            singer: 'Shaun',
            path: './assets/music/song10.mp3',
            image: './assets/img/waybackhome.jpg',
        },
    ],

    // setConfig: function(key, value) {
    //     this.config[key] = value;
    //     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    // },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xu li quay / dung
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 10s
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xu li phong to / thu nho CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop // window laf bien dai dien cho cua so trinh duyet(window.scrollY), nhug co the khong hoat dong tren mot so trinh duyet
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xu li click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }

        // Khi bai hat duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi bai hat bi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tien do bai hat thay doi
        audio.ontimeupdate = function () {
            const progressPercent = audio.currentTime / audio.duration * 100
            progress.value = progressPercent
        }
        
        // Xu li khi tua bai hat (bam vao thanh thoi luong)
        progress.onchange = function (e) {
            const seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime
        }

        // Xu li khi bam nut next bai hat
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            _this.render()
            audio.play()
            _this.scrollToActiveSong()
        }

        // Xu li khi bam nut prev bai hat
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            _this.render()
            audio.play()
            _this.scrollToActiveSong()
        }

        // Xu li khi an nut random
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        
        // Xu li khi an nut repeat
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xu li sau khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lang nghe hanh vi click vao playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            const songOption = e.target.closest('.option')
            if (songOption) {
                console.log('songOption')
            }
            else if(songNode) {
                // Xu li khi click vao song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xu li khi click vao song option
                if (songOption) {
                    console.log('khoa')
                }
            }
        }
    },

    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',

            })
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.background = `url('${this.currentSong.image}')`; cdThumb.style.backgroundSize = `cover`;
        audio.src = this.currentSong.path
    },

    // loadConfig: function() {
    //     this.isRandom = this.Config.isRandom
    //     this.isRepeat = this.Config.isRandom
    // },

    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length )
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()        
    },

    start: function() {
        // Gan cau hinh tu config vao ung dung
        // this.loadConfig()

        // Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        // Lang ngeh va su li cac su kien (DOM Events)
        this.handleEvents()

        // Tai thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()

        //Render playlist
        this.render()

        // Hien thi trang thai ban dau cua button repeat va random 
        // randomBtn.classList.toggle('active', _this.isRandom)
        // repeatBtn.classList.toggle('active', _this.isRepeat)
    }
}

app.start()


function dropdownClick(id) {
    var e = document.getElementById(id)
    e.classList.toggle('w3-show')  
}

var dropdownAvt = document.getElementById('avatar-btn')
dropdownAvt.onclick = function() {
    dropdownClick('dropdown-content-avt')
}