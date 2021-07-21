// FUNCTION
// hide show search-bar and tab-bar
function toggleSearchBar() {
    var searchBar = document.getElementById('search-bar')
    var tabBar = document.getElementById('tab-bar')

    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block'
        tabBar.style.display = 'none'
    } else {
        searchBar.style.display = 'none'
        tabBar.style.display = 'table'
    }
}

// move tab
var discoverContain = new buildContentForTabs('#discover', '#discover-area', 'urlsDiscover', 'discoverContain')
var homeContain = new buildContentForTabs('#home', '#home-area', 'urlsHome', 'homeContain')
var mySelfContain = new buildContentForTabs('#my-self', '#my-self-area', 'urlsMySelf', 'mySelfContain')
var moodContain = new buildContentForTabs('#mood', '#mood-area', 'urlsMood', 'moodContain')
var funnyContain = new buildContentForTabs('#funny', '#funny-area', 'urlsFunny', 'funnyContain')

function moveTab(tabBtn, tabContentId) {
    for (tab of tabs) {
        tab.classList.remove('w3-border-red')
    }
    tabBtn.classList.add('w3-border-red')
    
    for (tabContent of tabContents) {
        tabContent.style.display = 'none'
    }
    document.getElementById(tabContentId).style.display = 'block'
}

// dropdown avatar
function dropdownClick(id) {
    var e = document.getElementById(id)
    if (e.className.includes('table') && !e.className.includes('show-table')) {
        e.classList.add('show-table')
    } else if (e.className.includes('table show-table')) {
        e.classList.remove('show-table')
    } else {
        e.classList.toggle('w3-show')
    }   
}

// admin access
function adminAccess() {
    const $$ = document.querySelectorAll.bind(document)
    var addImages = Array.from($$(`#add-image`))
    addImages.forEach(e => e.style.display = 'table')

    function showAll(elements) {
        elements.forEach(element => {
            element.onmouseenter = function() {
                for (var x of element.querySelectorAll('span')) {
                    x.style.display = 'block'
                }
            }
            element.onmouseleave = function() {
                for (var x of element.querySelectorAll('span')) {
                    x.style.display = 'none'
                }
            }
        })
    }
    
    showAll(Array.from($$('.image-column .image-item')))
}    

// for Slide show
var curImg = 0;
showSlide(curImg); // chay ham showSlide de hien thi view ban dau

function nextStage(value) { // chuyen anh khi an nut
    showSlide(curImg += value);
}

function curStage(value) {
    curImg = value
    showSlide(curImg)
}

setInterval(() => { // tu dong chuyen anh
    showSlide(curImg += 1)
}, 3000)

function showSlide(n) { // vua nay dat n trung voi curImg nen khi toi dong if gan lai curImg thi chi gan noi bo nen khong thay doi ben ngoai duoc
    var totalLives = document.getElementsByClassName("my-slide-show w3-center");
    var countIndexs = document.getElementsByClassName('countIndex')
    var countBarIndexs = document.getElementsByClassName('countBarIndex')

    // thanh pagination
    var currentIndexs = []
    for (var i=0; i<totalLives.length; i++) {
        currentIndexs.push(`<div class="countBarIndex w3-button w3-bar-item w3-hover-red" onclick="curStage(${i})">${i+1}</div>`)
    }
    currentIndexs.unshift(`<div class="w3-button w3-bar-item w3-hover-red" onclick="nextStage(-1)">&laquo;</div>`)
    currentIndexs.push(`<div class="w3-button w3-bar-item w3-hover-red" onclick="nextStage(1)">&raquo;</div>`)
    document.getElementById('pagination-index').innerHTML = currentIndexs.join('')

    // hide all show and remove w3-green class
    if (n >= totalLives.length) {curImg = 0}
    if (n < 0) {curImg = totalLives.length-1}
    for (var live=0; live<totalLives.length; live++) {
        totalLives[live].style.display = "none";
        countBarIndexs[live].classList.remove('w3-green')
    }

    // show neccessary show
    totalLives[curImg].style.display = "block";
    countIndexs[curImg].innerHTML = curImg + 1
    countBarIndexs[curImg].classList.add('w3-green')
}

    // set local storage (urlsMySelf)
    if (!JSON.parse(localStorage.getItem('urlsMySelf'))) { // set 5 localStorages
        var urls = [
            "https://images.pexels.com/photos/6185245/pexels-photo-6185245.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/4753879/pexels-photo-4753879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/5981925/pexels-photo-5981925.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/3992868/pexels-photo-3992868.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/4753887/pexels-photo-4753887.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/4761581/pexels-photo-4761581.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6185549/pexels-photo-6185549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6185449/pexels-photo-6185449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        ]
        localStorage.setItem('urlsMySelf', JSON.stringify(urls)) // set 5 localStorages
    }
    // set local storage (urlsHome)    
    if (!JSON.parse(localStorage.getItem('urlsHome'))) { // set 5 localStorages
        var urls = [
        "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/1294062/pexels-photo-1294062.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/6341405/pexels-photo-6341405.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4321123/pexels-photo-4321123.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4628391/pexels-photo-4628391.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4662950/pexels-photo-4662950.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/3396974/pexels-photo-3396974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/4997915/pexels-photo-4997915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        ]
        localStorage.setItem('urlsHome', JSON.stringify(urls)) // set 5 localStorages
    }
    // set local storage (urlsDiscover)
    if (!JSON.parse(localStorage.getItem('urlsDiscover'))) { // set 5 localStorages
        var urls = [
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500,",
            "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/4823588/pexels-photo-4823588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500,",
            "https://images.pexels.com/photos/7400278/pexels-photo-7400278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500,",
            "https://images.pexels.com/photos/1064838/pexels-photo-1064838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&,w=1260",
            "https://images.pexels.com/photos/2832432/pexels-photo-2832432.png?auto=compress&cs=tinysrgb&dpr=1&w=500,",
            "https://images.pexels.com/photos/897710/pexels-photo-897710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        ]
        localStorage.setItem('urlsDiscover', JSON.stringify(urls)) // set 5 localStorages
    }
    // set local storage (urlsMood)
    if (!JSON.parse(localStorage.getItem('urlsMood'))) { // set 5 localStorages
        var urls = [
            "https://images.pexels.com/photos/7169355/pexels-photo-7169355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/8196527/pexels-photo-8196527.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6758064/pexels-photo-6758064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/5976404/pexels-photo-5976404.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6461030/pexels-photo-6461030.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6383173/pexels-photo-6383173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/5430077/pexels-photo-5430077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6357189/pexels-photo-6357189.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6621189/pexels-photo-6621189.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/6908084/pexels-photo-6908084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        ]
        localStorage.setItem('urlsMood', JSON.stringify(urls)) // set 5 localStorages
    }
    // set local storage (urlsFunny)
    if (!JSON.parse(localStorage.getItem('urlsFunny'))) { // set 5 localStorages
        var urls = [
            "https://images.pexels.com/photos/2213575/pexels-photo-2213575.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/1670413/pexels-photo-1670413.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/7210605/pexels-photo-7210605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/2853422/pexels-photo-2853422.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/5257587/pexels-photo-5257587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/755834/pexels-photo-755834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://images.pexels.com/photos/3845492/pexels-photo-3845492.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"  
        ]
        localStorage.setItem('urlsFunny', JSON.stringify(urls)) // set 5 localStorages
    }

// ❤❤❤ Handle insert picture in tabContentArea
function buildContentForTabs(tabContentID, tabContentArea, localItem, instanceName) {
    // FUNCTIONS
        // get element
    var urlInput = document.querySelector(`${tabContentID} input[name=url-input]`) // #my-self --> tabContentID
    var addImageBtn = document.querySelector(`${tabContentID} #add-image-btn`) // #my-self --> tabContentID
    var changeInput = document.querySelector(`${tabContentID} input[name=change-input]`) // #my-self --> tabContentID
    var changeImageBtn = document.querySelector(`${tabContentID} #change-image-btn`) // #my-self --> tabContentID
    var modalChange = document.querySelector(`${tabContentID} #modal-change`) // #my-self --> tabContentID

        // is URL or not URL
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

        // clear URL
    this.clearUrl = function(index) {
        var urls = JSON.parse(localStorage.getItem(localItem)) // urlsMyself --> localItem
        urls.splice(index, 1)
        localStorage.setItem(localItem, JSON.stringify(urls)) // urlsMyself --> localItem
        render()
    }

    // show modal change image
    this.showChangeModal = function(index) {
        modalChange.style.display = 'block'

        changeImageBtn.onclick = function() {
            changeUrl(index)
        }

        changeInput.onkeyup = function(e) {
            if (e.keyCode === 13) {
                changeUrl(index)
            }

            if (e.keyCode === 27) {
                hideChangeModal()
            }
        }
    }

        // hide modal change image
    function hideChangeModal() {
        var modalContent = document.getElementById('change-image')
        if (modalContent.className.includes('w3-animate-zoom')) {
            modalContent.classList.remove('w3-animate-zoom')
            modalContent.classList.add('animatezoom-out')
            setTimeout(() => {
                modalChange.style.display = 'none'
                if (modalContent.className.includes('animatezoom-out')) {
                    modalContent.classList.remove('animatezoom-out')
                    modalContent.classList.add('w3-animate-zoom')
                }
            }, 300)
        }
    }

        // change URL
    function changeUrl(index) {
        var isUrl = validURL(changeInput.value.trim())
        if (isUrl) {
            var urls = JSON.parse(localStorage.getItem(localItem))
            urls.splice(index, 1, changeInput.value.trim())
            localStorage.setItem(localItem, JSON.stringify(urls))
            render()

            changeInput.value = ''
            changeInput.placeholder = 'Enter replace url...'

            hideChangeModal()
        }
    }

        // add URL
    function addUrl() {
        var isUrl = validURL(urlInput.value.trim()) 
        if (isUrl) {
            urls = JSON.parse(localStorage.getItem(localItem))
            urls.unshift(urlInput.value.trim())
            localStorage.setItem(localItem, JSON.stringify(urls))
            
            urlInput.value = ''
            urlInput.placeholder = 'Add image url...'
        }
        render()
    }

    function mainRender() {
        if (JSON.parse(localStorage.getItem(localItem))) {
            var urls = JSON.parse(localStorage.getItem(localItem)) // urlsMySelf --> localItem
            var imageColumns = document.querySelectorAll(`${tabContentID} .image-column`) // #my-self --> tabContentID
            var i = 0
            while (i < urls.length) {
                for (var j=0; j<imageColumns.length; j++) {
                    if (i >= urls.length) { break }
                    var imgsAr = Array.from(imageColumns[j].getElementsByTagName('img'))
                    if (imgsAr.length === 0) {
                        imageColumns[j].innerHTML = `
                            <div class="w3-display-container image-item" style="width: 100%;">
                                <img src="${urls[i]}" index="${i}">
                                <span class="w3-display-topright w3-button delete" onclick="${instanceName}.clearUrl(${i})"><i class="fas fa-trash"></i></span>
                                <span class="w3-display-topleft w3-button edit" onclick="${instanceName}.showChangeModal(${i})"><i class="fas fa-cut"></i></span>
                            </div>
                        `
                        i++
                    } else {
                        var imgs = imgsAr.map(img => {
                            return `
                                <div class="w3-display-container image-item" style="width: 100%;">
                                    <img src="${img.src}" index="${img.getAttribute('index')}">
                                    <span class="w3-display-topright w3-button delete" onclick="${instanceName}.clearUrl(${img.getAttribute('index')})"><i class="fas fa-trash"></i></span>
                                    <span class="w3-display-topleft w3-button edit" onclick="${instanceName}.showChangeModal(${img.getAttribute('index')})"><i class="fas fa-cut"></i></span>
                                </div>
                            `
                        })
                        imgs.push(`
                                <div class="w3-display-container image-item" style="width: 100%;">
                                    <img src="${urls[i]}" index="${i}">
                                    <span class="w3-display-topright w3-button delete" index="${i}" onclick="${instanceName}.clearUrl(${i})"><i class="fas fa-trash"></i></span>
                                    <span class="w3-display-topleft w3-button edit" onclick="${instanceName}.showChangeModal(${i})"><i class="fas fa-cut"></i></span>
                                </div>
                            `)
                        imageColumns[j].innerHTML = imgs.join('')
                        i++
                    }
                }
            }
        }  
    }

    function render() {
        var tabContent = document.querySelector(tabContentArea) // my-self-area --> tabContentArea
        if (window.innerWidth >= 993) {
            tabContent.innerHTML = `
                <div class="w3-col image-column image-column-1" style="width: 25%"></div>
                <div class="w3-col image-column image-column-2" style="width: 25%"></div>
                <div class="w3-col image-column image-column-3" style="width: 25%"></div>
                <div class="w3-col image-column image-column-4" style="width: 25%"></div>
            `
            mainRender()
        }

        else if (window.innerWidth <= 992 && window.innerWidth >= 601) {
            tabContent.innerHTML = `
                <div class="w3-col image-column image-column-1" style="width: 33.33333%"></div>
                <div class="w3-col image-column image-column-2" style="width: 33.33333%"></div>
                <div class="w3-col image-column image-column-3" style="width: 33.33333%"></div>
            `
            mainRender()
        }

        else {
            tabContent.innerHTML = `
                <div class="w3-col image-column image-column-1" style="width: 50%"></div>
                <div class="w3-col image-column image-column-2" style="width: 50%"></div>
            `
            mainRender()
        }
    }
    render()

    // EVENTS
        // add image
    addImageBtn.onclick = function() {
        addUrl()
    }

        // add image
    urlInput.onkeyup = function(e) {
        if (e.keyCode === 13) {
            addUrl()
        }
        else if (e.keyCode === 27) {
            urlInput.value = ''
            urlInput.placeholder = 'Add image url...'
        }
    }

        // change screen width
    window.onresize = function(event) {
        if (window.innerWidth <= 1000 && window.innerWidth >= 984) {
            render()
        }
        if (window.innerWidth <= 608 && window.innerWidth >= 592) {
            render()
        }
    }
}
    

// EVENT
    // show search-bar_hide tab-bar  and  hide search-bar_show tab-bar
var searchBtn = document.getElementById('search-btn')
searchBtn.onclick = () => {
    toggleSearchBar()
}

    // move tab
var tabs = document.getElementsByClassName('tab')
var tabContents = document.getElementsByClassName('tab-content')
for (var i=0; i<tabs.length; i++) {
    tabs[i].onclick = function() {
        moveTab(this, this.getAttribute('tab-content'))
    }
}

    // dropdown avatar
var dropdownAvt = document.getElementById('avatar-btn')
dropdownAvt.onclick = function() {
    dropdownClick('dropdown-content-avt')
}

    // dropdown menu
var dropdownMenu = document.getElementById('menu-btn')
dropdownMenu.onclick = function() {
    dropdownClick('dropdown-content-menu')
}

    // admin access
var secretInput = document.getElementById('admin-access')
secretInput.onkeyup = function(e) {
    if (e.keyCode === 13) {
        if (e.target.value === '321654') {
            adminAccess()
            e.target.value = ''
            e.target.placeholder = 'secret...'
        }
    }
    if (e.keyCode === 27) {
        e.target.value = ''
        e.target.placeholder = 'secret...'
    }
}






        

