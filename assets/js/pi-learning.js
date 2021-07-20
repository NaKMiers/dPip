const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// FUNCTION

// dropdown-click
var dropdown = document.getElementById('avatar')
dropdown.onclick = function() {
    dropdownClick('dropdown-content')
}

function dropdownClick(id) {
    var e = $('#' + id)
    e.classList.toggle('w3-show')  
}

// move tab
var tabs = document.getElementsByClassName('tab')
var tabContents = document.getElementsByClassName('tab-content')
for (var i=0; i<tabs.length; i++) {
    tabs[i].onclick = function() {
        moveTab(this, this.getAttribute('tab-content'))
    }
}

function moveTab(tabBtn, tabContentId) {
    for (tab of tabs) {
        tab.classList.remove('w3-border-red')
    }
    tabBtn.classList.add('w3-border-red')
    
    for (tabContent of tabContents) {
        tabContent.style.display = 'none'
    }
    $('#' + tabContentId).style.display = 'block'
}
moveTab($('#tab-bar .tab1'), 'quizzes') // show default tab

// For YES or NO
    // event
    var yesss = $('#yes-or-no #yesss')
    var noooo = $('#yes-or-no #noooo')
    var goYoN = $('#yes-or-no #go')
    
    goYoN.onclick = () =>{
        if (Math.ceil(Math.random()*2) === 1) {
            yesss.style.opacity = '1'
            noooo.style.opacity = '0'
        } else {
            noooo.style.opacity = '1'
            yesss.style.opacity = '0'
        }
        goYesOrNo()
    }

    // function
function goYesOrNo() {
    var ex = setInterval(() => {
        if (yesss.style.opacity == '0') {
            yesss.style.opacity = '1'
            noooo.style.opacity = '0'
        } else {
            noooo.style.opacity = '1'
            yesss.style.opacity = '0'
        }
    }, 500)
    
    setTimeout(() => {
        clearInterval(ex)
    }, 5000)
}

// For RANDOM
    // random
var addTagInput =$('#random input[name="add-tag-input"]')
var addTagBtn = $('#add-tag-btn')
var randomBtn = $('#random #random-btn')
var clearAllBtn = $('#random #clear-all-btn')
var setTimeInput = $('#random input[name="set-time"]')
var tagModal = $('#tag-modal')

addTagBtn.onclick = () => { // click add tag btn
    if (addTagInput.value.trim() != '') { addRandomTag() }
    addTagInput.value = ''
    addTagInput.placeholder = 'Add option'
}

addTagInput.onkeyup = (e) => { // type on add tag input
    if (e.keyCode === 13) {
        if (addTagInput.value.trim() != '') { addRandomTag() }
        addTagInput.value = ''
        addTagInput.placeholder = 'Add option'
    }
    if (e.keyCode === 27) {
        addTagInput.value = ''
        addTagInput.placeholder = 'Add option'
    }
}

randomBtn.onclick = () => { // click random btn
    if (setTimeInput.value) {
        validateSetTime()
    } else {
        randomTag()
    }
}

clearAllBtn.onclick = () => { // click clear all tag
    if (JSON.parse(localStorage.getItem('randomTags')).length !== 0) {
        var isConfirm = confirm('Are you sure?')
        isConfirm ? clearAll() : ''
    }
}

setTimeInput.onkeyup = (e) => { // type on set time input
    if (e.keyCode === 13) {
        validateSetTime()
    }

    if (e.keyCode === 27) {
        setTimeInput.value = ''
        setTimeInput.placeholder = 'Enter time(second)'
        setTimeInput.style.border = 'none'
    }
    
    if(e.keyCode !== 13) {
        setTimeInput.style.border = 'none'
    }
}

tagModal.onclick = () => { // click modal
    tagModal.style.display = 'none'
}

    // function
if (!JSON.parse(localStorage.getItem('randomTags'))) {
    localStorage.setItem('randomTags', JSON.stringify([]))
}

    // add random tag
function addRandomTag() {
    var randomTags = JSON.parse(localStorage.getItem('randomTags'))
    randomTags.push(addTagInput.value.trim().split('').join(' '))
    localStorage.setItem('randomTags', JSON.stringify(randomTags))
    renderRandomTag()
}

    // del random tag
function delTag(index) {
    var randomTags = JSON.parse(localStorage.getItem('randomTags'))
    randomTags.splice(index, 1)
    localStorage.setItem('randomTags', JSON.stringify(randomTags))
    renderRandomTag()
}

    // clear all tags
function clearAll() {
    localStorage.setItem('randomTags', JSON.stringify([]))
    renderRandomTag()
}

    // validate set time input
function validateSetTime() {
    if (setTimeInput.value.length > 2) {
        setTimeInput.value = ''
        setTimeInput.placeholder = 'Only max length 2 character'
        setTimeInput.style.border = 'solid 3px #f44336'
    }
    else if (setTimeInput.value <= 0) {
        setTimeInput.value = ''
        setTimeInput.placeholder = 'cannot be less than 1'
        setTimeInput.style.border = 'solid 3px #f44336'
    }
    else {
        randomTag(setTimeInput.value)
        setTimeInput.value = ''
        setTimeInput.placeholder = 'Enter time(second)'
        setTimeInput.style.border = 'none'
    }
}

    // run random
function randomTag(timeSet=5000) {
    if (arguments.length >= 1) { timeSet = Number(timeSet)*1000 } 
    var randomTags = JSON.parse(localStorage.getItem('randomTags'))
    var curTag = undefined
    var interval = setInterval(() => {
        var random = Math.floor(Math.random() * randomTags.length)
        curTag = $(`.tag-random[idx="${random}"]`)
        curTag.classList.add('w3-black')

        setTimeout(() => {
            curTag.classList.remove('w3-black')
        }, 250)
    }, 350)

    setTimeout(() => {
        clearInterval(interval)
        var tagRandomContent = curTag.querySelector('.tag-random-content')
        $('#random #tag-modal #tag-modal-content').innerHTML =`
            <div class="tag-random w3-black w3-round-large">
                <div class="tag-random-content tag-random-content ${tagRandomContent.getAttribute('random-color')} w3-center">${tagRandomContent.innerText}</div>
            </div>
        `
        $('#random #tag-modal').style.display = 'block'
    }, timeSet)
}

    // render random tag
function renderRandomTag() {
    var randomTags = JSON.parse(localStorage.getItem('randomTags'))
    var randomColorAr = ['w3-red', 'w3-blue', 'w3-green', 'w3-yellow', 'w3-lime', 'w3-pale-green', 'w3-amber', 'w3-blue-gray', 'w3-brown', 'w3-teal', 'w3-cyan', 'w3-light-green', 'w3-purple', 'w3-indigo', 'w3-pale-red', 'w3-pale-blue']
    data = randomTags.map((tag, index) => {
        var randomColor = randomColorAr[Math.floor(Math.random() * randomColorAr.length)]
        return `
            <div class="tag-random w3-white w3-bar-item w3-col s3 m1-7 l1-2" idx="${index}" onclick="delTag(${index})">
                <div class="tag-random-content ${randomColor} w3-center" random-color="${randomColor}" title="double click to delete">${tag}</div>
            </div>
        `
    })

    $('#random-content-bar').innerHTML = data.join('')
}
renderRandomTag()

// For Remember Game
    // remember game
var rememberArea = $('#remember-area')
var rememberPad = Array.from($$('#remember-area .rem-item'))
var rememberItems = Array.from($$('#remember-area .rem-item .rem-cell'))
var setRemAreaColor = Array.from($$('#menu-color .background-color .cell-cell'))
var setItemsColor = Array.from($$('#menu-color .item-color .cell-cell'))
var colorAr = ['#fff', '#000', '#f44336', '#2196F3', '#4CAF50', '#ffeb3b']
var rememberGo = $('#remember-cover #go')
    
    // set color item
setItemsColor.forEach((element, index) => {
    element.onclick = () => {
        isSelectedAreaColor = index + 1
        for (var y of rememberItems) {
            y.style.backgroundColor = element.getAttribute('color')
        }
    }
})
    
    // set background color item
var isSelectedItemColor = false
var isSelectedAreaColor = false
setRemAreaColor.forEach((element, index) => {
    element.onclick = () => {
        isSelectedItemColor = index + 1
        for (var x of rememberPad) {
            x.style.backgroundColor = element.getAttribute('color')
            rememberArea.style.backgroundColor = element.getAttribute('color')
        }
    }
})
        
    // show - hide history
var historyBtn = $('#remember-history .show-hide-btn')
var historyModal = $('#remember-history')

historyBtn.onclick = () => { // click down/up history
    showOrHideHistory()
}

    // clear remember history
var clearHistoryBtn = $('#remember-history .title')
clearHistoryBtn.onclick = () => {
    if (JSON.parse(localStorage.getItem('remHistory')).length !== 0) {
        var isConfirm = confirm('Do you wanna clear history?')
        if (isConfirm) {
            localStorage.setItem('remHistory', JSON.stringify([]))
            renderHistory()
        }
    }
}
    
    // not choose color error
var notChooseColor = $('#remember-cover #not-choose-color')
var closeErrorBtn = $('#remember-cover #not-choose-color .close')

closeErrorBtn.onclick = () => {
    notChooseColor.style.display = 'none'
}

    // click GO
var rememberCover = $('#remember-cover')
var startTime = []
rememberGo.onclick = () => {
    if (isSelectedItemColor && isSelectedAreaColor) {
        if (isSelectedItemColor !== isSelectedAreaColor) {
            rememberCover.style.opacity = 0
            setTimeout(() => {
                rememberCover.style.display = 'none'
                rememberAr.push(Math.floor(Math.random() * 9))
                startTime[0] = new Date().getHours()
                startTime[1] = new Date().getMinutes()
                startTime[2] = new Date().getSeconds()
                runGame()
            }, 1000)
            if (historyModal.className.includes('show-history-card')) {
                showOrHideHistory()
            }
        } else {
            notChooseColor.style.display = 'block'
            notChooseColor.style.opacity = 1
        }
    } else {
        notChooseColor.style.display = 'block'
        notChooseColor.style.opacity = 1
    }
}
    

    // function
var count = 0
var count2 = -1
var levelCount = 0
var rememberAr = []
var rememberLevel = $('#remember #rem-level')

function runGame() {
    var interval = setInterval(() => {
        console.log(count)
        rememberItems[rememberAr[count]].style.opacity = 0.5
        setTimeout(() => {
            rememberItems[rememberAr[count]].style.opacity = 1
            count ++
            if (count == rememberAr.length) {
                clearInterval(interval)
                count = 0
                handlePlay()
            }
        }, 300)
    }, 350)
}

    // handle when player played
function handlePlay() {
    rememberItems.forEach((item, index) => {
        item.onclick = () => {
            item.style.opacity = 0.5
            setTimeout(() => {
                item.style.opacity = 1
                compareData(index)
            }, 150);
        }
    })
}

    // compare index item clicked with rememberAr
function compareData(index) {
    console.log('index item vua click: ', index)
    count2++
    if (index === rememberAr[count2]) {
        console.log('count2: ', count2)
        if (count2 == rememberAr.length - 1) {
            levelCount ++
            rememberLevel.innerHTML = `Level: ${levelCount}`
            count2 = -1
            rememberAr.push(Math.floor(Math.random() * 9))
            runGame()
        }
    } else { // you lose
        var failRemGame = $('#remember #fail-rem-game')
        failRemGame.style.display = 'block'
        setTimeout(() => {
            failRemGame.style.display = 'none'
        }, 1200)
        setTimeout(() => {
            rememberCover.style.display = 'block'
        }, 1000);
        setTimeout(() => {
            rememberCover.style.opacity = 1
        }, 1200)
        count2 = -1
        
        var historyData = `
            <li class="history-row w3-red">
                <span class="level w3-col s3 w3-white">${rememberLevel.innerText}</span>
                <span>${startTime[0]}:${startTime[1]}:${startTime[2]}</span>
                <span>-</span>
                <span>${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}</span>
            </li>
        `
        var historyItems = JSON.parse(localStorage.getItem('remHistory'))
        historyItems.unshift(historyData)
        localStorage.setItem('remHistory', JSON.stringify(historyItems))
        renderHistory()

        levelCount = 0
        rememberLevel.innerHTML = `Level: 0`
        rememberAr = []
        
        // var rememberAr = []
        showOrHideHistory()
    }
}


if (!JSON.parse(localStorage.getItem('remHistory'))) {
    localStorage.setItem('remHistory', JSON.stringify([]))
}

    // render remember history
var historyArea = $('#remember-history #history-area')
function renderHistory() {
    var historyItems = JSON.parse(localStorage.getItem('remHistory'))
    historyArea.innerHTML = historyItems.join('')
}
renderHistory()

    // show or hide history area
function showOrHideHistory() {
    historyModal.classList.toggle('show-history-card')
    if (historyModal.className.includes('show-history-card')) {
        historyBtn.innerHTML = '<i class="fas fa-chevron-down w3-xlarge">'
    } else {
        historyBtn.innerHTML = '<i class="fas fa-chevron-up w3-xlarge">'
    }
}








// For Quizzes
    // set local storage dictionary
if (!JSON.parse(localStorage.getItem('dictionary'))) {
    localStorage.setItem('dictionary', JSON.stringify([]))
}

var addWordBtn = $('#quizzes #add-word-btn')
var addWordInput = $('#quizzes input[name="add-vocabulary-input"]')
var addMeanInput = $('#quizzes input[name="add-mean-input"]')

addWordBtn.onclick = () => {
    checkWordInput()
}

addWordInput.onkeyup = (e) => {
    addWordInput.classList.remove('invalid-word-input')
    if (e.keyCode === 13) {
        checkWordInput()
    }
    if (e.keyCode === 27) {
        addWordInput.value = ''
        addWordInput.placeholder = 'Enter new vocabulary...'
    }
}

addMeanInput.onkeyup = (e) => {
    addMeanInput.classList.remove('invalid-word-input')
    if (e.keyCode === 13) {
        checkWordInput()
    }
    if (e.keyCode === 27) {
        addMeanInput.value = ''
        addMeanInput.placeholder = 'Enter new vocabulary...'
    }
}

// function 
function checkWordInput() {
    if (addWordInput.value.trim() && addMeanInput.value.trim()) {
        addVocabulary()   
    } else if (!addWordInput.value.trim() && !addMeanInput.value.trim()) {
        addMeanInput.value = ''
        addMeanInput.placeholder = 'Please enter mean to continue!'
        addMeanInput.classList.add('invalid-word-input')

        addWordInput.value = ''
        addWordInput.placeholder = 'Please enter new vocabulary to continue!'
        addWordInput.classList.add('invalid-word-input')
    } else {
        if (addWordInput.value.trim()) {
            addMeanInput.value = ''
            addMeanInput.placeholder = 'Please enter mean to continue!'
            addMeanInput.classList.add('invalid-word-input')
        } else {
            addWordInput.value = ''
            addWordInput.placeholder = 'Please enter new vocabulary to continue!'
            addWordInput.classList.add('invalid-word-input')
        }
    }
}

var quizzesArea = $('#quizzes-area')
// set local storage "dictionary"
if (!JSON.parse(localStorage.getItem('dictionary'))) {
    localStorage.setItem('dictionary', JSON.stringify([]))
}

// add vocabulary
if (!JSON.parse(localStorage.getItem('idIndex'))) {
    localStorage.setItem('idIndex', JSON.stringify(0))
}
var idIndex = JSON.parse(localStorage.getItem('idIndex'))
function addVocabulary() {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    var vocabularies = words.map((word, index) => {
        return word.vocabulary
    })
    console.log(!vocabularies.includes(addWordInput.value.trim()[0].toUpperCase() + addWordInput.value.trim().slice(1, addWordInput.value.trim().length)))
    if (!vocabularies.includes(addWordInput.value.trim()[0].toUpperCase() + addWordInput.value.trim().slice(1, addWordInput.value.trim().length))) {
        words.unshift({
            id: idIndex,
            vocabulary: addWordInput.value.trim()[0].toUpperCase() + addWordInput.value.trim().slice(1, addWordInput.value.trim().length),
            mean: addMeanInput.value.trim()[0].toUpperCase() + addMeanInput.value.trim().slice(1, addMeanInput.value.trim().length),
            favorite: false,
        })
        localStorage.setItem('dictionary', JSON.stringify(words))
        idIndex++
        localStorage.setItem('idIndex', JSON.stringify(idIndex))
        renderDict()
        addWordInput.value = ''
        addWordInput.placeholder = 'Enter new vocabulary...'
        addMeanInput.value = ''
        addMeanInput.placeholder = 'Enter new vocabulary...'    
    } else {
        addWordInput.value = ''
        addWordInput.placeholder = 'The word is already available, please enter again!'
        addWordInput.classList.add('invalid-word-input')
    }
    
}

// add favorite 
function addFav(idx, status) {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    var ele = words.find((word, index) => {
        return word.id == idx
    })
    
    if (ele.favorite === true) {
        ele.favorite = false
        words[words.indexOf(ele)] = ele
        localStorage.setItem('dictionary', JSON.stringify(words))
    } else {
        ele.favorite = true
        words[words.indexOf(ele)] = ele
        localStorage.setItem('dictionary', JSON.stringify(words))
    }
    // if (words[index].favorite === true) {
    //     words[index].favorite = false
    //     localStorage.setItem('dictionary', JSON.stringify(words))
    // } else {
    //     words[index].favorite = true
    //     localStorage.setItem('dictionary', JSON.stringify(words))
    // }

    if (filterSelect.value === 'newest') {renderDict()}
    else if (filterSelect.value === 'alphabet') {renderAlphabet()}
    else {renderFavorites()}
}

// delete vocabulary
function delWord(idx) {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    var ele = words.find((word, index) => {
        return word.id == idx
    })
    words.splice(words.indexOf(ele), 1)
    localStorage.setItem('dictionary', JSON.stringify(words))
    
    if (filterSelect.value === 'newest') { renderDict() }
    else if (filterSelect.value === 'alphabet') {
        renderDict()
        // renderAlphabet()
    }
    else {
        renderDict()
        renderFavorites()
    }
}

// edit vocabulary
function editWord(index, idx, curValue) {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    var wordContains = $$('#quizzes-area #quizzes-list li .word')
    var editWordInputs = $$('#quizzes-area #quizzes-list li input')

    var ele = words.find((word, index) => {
        return word.id == idx
    })

    wordContains[index].style.display = 'none'
    editWordInputs[index].style.display = 'block'
    editWordInputs[index].value = curValue

    editWordInputs.forEach((input, index) => {
        input.onkeyup = e => {
            if (e.keyCode === 13 && e.target.value.trim() !== '') {
                if (Math.floor(index % 2) === 0) {
                    words[words.indexOf(ele)].vocabulary = e.target.value.trim()[0].toUpperCase() + e.target.value.trim().slice(1, e.target.value.trim().length)
                    localStorage.setItem('dictionary', JSON.stringify(words))
                } else {
                    words[words.indexOf(ele)].mean = e.target.value.trim()[0].toUpperCase() + e.target.value.trim().slice(1, e.target.value.trim().length)
                    localStorage.setItem('dictionary', JSON.stringify(words))
                }
                wordContains[index].style.display = 'block'
                editWordInputs[index].style.display = 'none'
                
                if (filterSelect.value === 'newest') { renderDict() }
                else if (filterSelect.value === 'alphabet') {
                    renderDict()
                    // renderAlphabet()
                }
                else {
                    renderDict()
                    renderFavorites()
                }
            }
            if (e.keyCode === 27) {
                e.target.value = ''
                e.target.placeholder = 'Type some different...'
            }
        }
    })
}

// show favorite items 
function markFavItems(AllHeartItems) {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    words.forEach((word, index) => {
        if (word.favorite === true) {
            AllHeartItems[index].classList.add('w3-text-red')
            AllHeartItems[index].classList.add('w3-hover-text-red')
        } else {
            AllHeartItems[index].classList.remove('w3-text-red')
            AllHeartItems[index].classList.remove('w3-hover-text-red')
        }
    })
}

// render Dictionary (ul)
var dictUL = $('#quizzes-area #quizzes-list')
function renderDict(prevented) {
    JSON.parse(localStorage.getItem('dictionary')).length === 0 ? quizzesArea.style.display = 'none' : quizzesArea.style.display = 'block'
    
    var words = JSON.parse(localStorage.getItem('dictionary'))
    var data = words.map((word, index) => {
        return `
            <li class="w3-row w3-display-container w3-blue">
                <div class="word vocabulary w3-col s12 m5" idx="${word.id}">${word.vocabulary}</div>
                <input type="text" name="edit-vocabulary" class="w3-input w3-col s12 m5 w3-border" placeholder="Type some different...">
                <div class="word mean w3-col s12 m5" idx="${word.id}">${word.mean}</div>
                <input type="text" name="edit-mean" class="w3-input w3-col s12 m5 w3-border" placeholder="Type some different...">
                <div class="btn w3-row w3-display-topright w3-large">
                    <div class="del w3-cell w3-button w3-col l6 m6 s12 w3-hover-green" idx="${word.id}"><i class="fas fa-times"></i></div>
                    <div class="like w3-cell w3-button w3-col l6 m6 s12 w3-hover-green" idx="${word.id}"><i class="fas fa-heart"></i></div>
                </div>
            </li>
        `
    })

    dictUL.innerHTML = data.join('')

    // add favorite
    var heartsBtn = $$('#quizzes-area #quizzes-list .btn .like')
    heartsBtn.forEach((btn, index) => {
        btn.onclick = e => {
            addFav(e.target.parentElement.getAttribute('idx'))
        }
    })

    // delete word
    var deletesBtn = $$('#quizzes-area #quizzes-list .btn .del')
    deletesBtn.forEach((btn, index) => {
        btn.onclick = e => {
            delWord(e.target.parentElement.getAttribute('idx'))
        }
    })

    // edit word and mean
    var wordContains = $$('#quizzes-area #quizzes-list li .word')
    wordContains.forEach((wordContain, index) => {
        wordContain.onclick = (e) => {
            editWord(index, wordContain.getAttribute('idx'), e.target.innerText)
        }
    })

    // mark favorite item
    markFavItems(heartsBtn)
}   renderDict()

function renderFavorites() {
    JSON.parse(localStorage.getItem('dictionary')).length === 0 ? quizzesArea.style.display = 'none' : quizzesArea.style.display = 'block'

    var dictLIs = $$('#quizzes-area #quizzes-list li')
    dictLIs.forEach(e => e.style.display = 'none')

    var words = JSON.parse(localStorage.getItem('dictionary'))
    words.forEach((word, index) => {
        if (word.favorite === true) {
            dictLIs[index].style.display = 'block'
        }
    })
}

// var preventive = undefined
// function renderAlphabet() {
//     JSON.parse(localStorage.getItem('dictionary')).length === 0 ? quizzesArea.style.display = 'none' : quizzesArea.style.display = 'block'

//     var words = JSON.parse(localStorage.getItem('dictionary'))
//     var vocabularies = words.map((word, index) => {
//         return word.vocabulary
//     })
//     vocabularies.sort()
//     var wordsSorted = vocabularies.map((vocabulary, index) => {
//         var contain = words.find((word, index) => {
//             return word.vocabulary === vocabulary
//         })
//         return contain
//     })

//     if (filterSelect.value === 'alphabet') {
//         console.log(123123)
//         preventive = JSON.parse(localStorage.getItem('dictionary'))
//     }
//     localStorage.setItem('dictionary', JSON.stringify(wordsSorted))
//     renderDict(preventive)
// }

var filterSelect = $('#quizzes-area .filter-select')
filterSelect.onchange = () => {
    switch (filterSelect.value) {
        case 'newest':
            renderDict()
            break
        case 'alphabet':
            // renderAlphabet()
            break
        case 'favorites':
            renderFavorites()
            break
    }
}

// quizzes started
var startQuizzes = $('#quizzes #start-quizzes')
var quizzesModal = $('#quizzes #quizzes-modal')
startQuizzes.onclick = () => {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    if (words.length < 4) {
        alert('Not enough vocabularies to start, please add more!')
        return
    }
    quizzesModal.style.display = 'block'
    nextQuiz()
}

// quizzes finished
var finishQuizzes = $('#quizzes #quizzes-modal #finish')
var resultModal = $('#quizzes #quizzes-modal #result-modal')
finishQuizzes.onclick = () => {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    resultModal.style.display = 'block'
    $('#quizzes #quizzes-modal #result-modal .comOn').innerHTML = randomWordsAr.length - 1
    $('#quizzes #quizzes-modal #result-modal .comUnder').innerHTML = words.length
    $('#quizzes #quizzes-modal #result-modal .riOn').innerHTML = countRightAnswers
    $('#quizzes #quizzes-modal #result-modal .riUnder').innerHTML = randomWordsAr.length
    $('#quizzes #quizzes-modal #result-modal .wrOn').innerHTML = countWrongAnswers
    $('#quizzes #quizzes-modal #result-modal .wrUnder').innerHTML = randomWordsAr.length
    $('#quizzes #quizzes-modal #result-modal .corRatio').innerHTML = (countRightAnswers / randomWordsAr.length * 100).toFixed(2) + '%'
    countRightAnswers = 0
    countWrongAnswers = 0
    lastTime = true
    randomWordsAr = []
}

// out quizzes test
var exitBtn = $('#quizzes #quizzes-modal #result-modal .exit-btn')
exitBtn.onclick = () => {
    resultModal.style.display = 'none'
    quizzesModal.style.display = 'none'
}

// make random word
function makeRandomWord() {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    randomWord = words[Math.floor(Math.random() * words.length)].vocabulary
    return randomWord
}

// make random words array
var randomWordsAr = []
function makeRandomWordsAr() {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    while (randomWordsAr.length !== words.length) {
        var newRandomWord = makeRandomWord()
        if (!randomWordsAr.includes(newRandomWord)) {
            randomWordsAr.push(newRandomWord)
            break
        } else {
            continue
        }
    }
}

// start quizzes function
var countRightAnswers = 0
var countWrongAnswers = 0
function playQuizzes() {
    var words = JSON.parse(localStorage.getItem('dictionary'))

    var showWord = $('#quizzes #quizzes-modal #show-word span')
    var outputVo = randomWordsAr[randomWordsAr.length - 1]
    console.log('randomWordsAr: ', randomWordsAr)
    var outputMean = words.find((word, index) => {
        return word.vocabulary === outputVo
    }).mean

    showWord.innerHTML = outputVo

    var answers = $$('#quizzes #quizzes-modal #answer .answer')
    var answersContent = $$('#quizzes #quizzes-modal #answer .answer span')

    // Make sure the answers do not overlap!!!
    var answerCellAr = [0,1,2,3]
    var cellCorrect = Math.floor(Math.random() * 4)
    answerCellAr.splice(answerCellAr.indexOf(cellCorrect), 1)

    answersContent[cellCorrect].innerHTML = outputMean // cell-correct
    var placeCorrect = words.indexOf(words.find((word, index) => {
        return word.mean === outputMean
    }))
    words.splice(placeCorrect, 1)

    var x = words[Math.floor(Math.random() * words.length)].mean
    answersContent[answerCellAr[0]].innerHTML =  x // cell-rest
    var placeCorrect = words.indexOf(words.find((word, index) => {
        return word.mean === x
    }))
    words.splice(placeCorrect, 1)

    var y = words[Math.floor(Math.random() * words.length)].mean
    answersContent[answerCellAr[1]].innerHTML = y // cell-rest
    var placeCorrect = words.indexOf(words.find((word, index) => {
        return word.mean === y
    }))
    words.splice(placeCorrect, 1)

    answersContent[answerCellAr[2]].innerHTML = words[Math.floor(Math.random() * words.length)].mean // cell-rest

    answers.forEach((answer, index) => {
        answer.onclick = (e) => {
            e.target.getAttribute('idx') == cellCorrect ? countRightAnswers++ : countWrongAnswers++
            console.log(countRightAnswers, countWrongAnswers)
            nextQuiz()
        }
    })

}

var lastTime = true
function nextQuiz() {
    var words = JSON.parse(localStorage.getItem('dictionary'))
    if (words.length < 4) return
    makeRandomWordsAr()
    console.log(randomWordsAr.length, words.length)
    playQuizzes()
    if (randomWordsAr.length === words.length) {
        if (lastTime) {
            playQuizzes()
            lastTime = false
            return
        }
        if (!lastTime) {
            resultModal = $('#quizzes #quizzes-modal #result-modal')
            resultModal.style.display = 'block'
    
            $('#quizzes #quizzes-modal #result-modal .comOn').innerHTML = randomWordsAr.length
            $('#quizzes #quizzes-modal #result-modal .comUnder').innerHTML = words.length
            $('#quizzes #quizzes-modal #result-modal .riOn').innerHTML = countRightAnswers
            $('#quizzes #quizzes-modal #result-modal .riUnder').innerHTML = randomWordsAr.length
            $('#quizzes #quizzes-modal #result-modal .wrOn').innerHTML = countWrongAnswers
            $('#quizzes #quizzes-modal #result-modal .wrUnder').innerHTML = randomWordsAr.length
            $('#quizzes #quizzes-modal #result-modal .corRatio').innerHTML = (countRightAnswers / randomWordsAr.length * 100).toFixed(1) + '%'
            countRightAnswers = 0
            countWrongAnswers = 0
            randomWordsAr = []
            lastTime = true
            return
        }
    }
}