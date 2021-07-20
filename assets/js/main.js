import Validator from './validator2.js'
import dropdownClick from './common.js'

var user = new Validator('#register-form')
user.onSubmit = function(data) {
    localStorage.setItem('loginConfirm', 'true')
    document.getElementById('modal').style.display = 'none'
    startView('header', 'main')
}

// FUNCTION

// show view
if (localStorage.getItem('loginConfirm') === 'true') {
    var subStartBtn = document.getElementById('sub-start')
    subStartBtn.classList.remove('w3-red')
    subStartBtn.classList.add('w3-green')
}

function startView(header, main) {
    if (localStorage.getItem('loginConfirm') === 'true') {
        var subStartBtn = document.getElementById('sub-start')
        localStorage.setItem('activeBtn', 'true')
        if (localStorage.getItem('activeBtn') === 'true') {
            subStartBtn.classList.remove('w3-red')
            subStartBtn.classList.add('w3-green')
        }

        var header = document.getElementById(header)
        header.classList.toggle('down-header')
        var main = document.getElementById(main)
        document.getElementById('dropdown-content').classList.remove('w3-show')
    
        if (!main.className.includes('w3-show') && !main.className.includes('show-main')) {
            main.classList.toggle('w3-show')
            setTimeout(() => {
                main.classList.toggle('show-main')
            }, 1000)
        } 
        else if (main.className.includes('w3-show') && main.className.includes('show-main')) {
            main.classList.toggle('show-main')
            setTimeout(() => {
                main.classList.toggle('w3-show')
            }, 1000)
        }
    
        setTimeout(() => {
            startBtn.classList.toggle('down-button')
            if (subStartBtn.innerText == 'CLOSE') {
                subStartBtn.innerHTML = 'START'
            } else {
                subStartBtn.innerHTML = 'CLOSE'
            }
        }, 1000)
    } else {
        document.getElementById('modal').style.display = 'block'
    }
}

// login

function login() {

}

// log out
function logOut(header, main) {
    // Remove local storage
    localStorage.setItem('loginConfirm', 'false')

    // Hide UI
    var subStartBtn = document.getElementById('sub-start')
    localStorage.setItem('activeBtn', 'false')
    if (localStorage.getItem('activeBtn') === 'false') {
        subStartBtn.classList.add('w3-red')
        subStartBtn.classList.remove('w3-green')
    }

    var header = document.getElementById(header)
    header.classList.toggle('down-header')
    var main = document.getElementById(main)
    document.getElementById('dropdown-content').classList.remove('w3-show')

    if (!main.className.includes('w3-show') && !main.className.includes('show-main')) {
        main.classList.toggle('w3-show')
        setTimeout(() => {
            main.classList.toggle('show-main')
        }, 1000)
    } 
    else if (main.className.includes('w3-show') && main.className.includes('show-main')) {
        main.classList.toggle('show-main')
        setTimeout(() => {
            main.classList.toggle('w3-show')
        }, 1000)
    }

    setTimeout(() => {
        startBtn.classList.toggle('down-button')
        if (subStartBtn.innerText == 'CLOSE') {
            subStartBtn.innerHTML = 'START'
        } else {
            subStartBtn.innerHTML = 'CLOSE'
        }
    }, 1000)
}


// EVENT
    // dropdown click
dropdownClick('avatar', 'dropdown-content')

    // login

    // log out
var LogOutBtn = document.getElementById('log-out')
LogOutBtn.onclick = () => {
    logOut('header', 'main')
}

console.log('holly shit')

    // Start everything
var startBtn = document.getElementById('start')
var subStartBtn = document.getElementById('sub-start')
startBtn.onclick = () => {
    startView('header', 'main')
}


console.log('just test')
console.log('what the fuck')
console.log('shit')