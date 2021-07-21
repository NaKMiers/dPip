const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// FUNCTION
    // dropdown avatar
function dropdownClick(id) {
    var e = document.getElementById(id)
    e.classList.toggle('w3-show')  
}

// EVENT
    // dropdown avatar
var dropdownAvt = document.getElementById('avatar-btn')
dropdownAvt.onclick = function() {
    dropdownClick('dropdown-content-avt')
}




// set local storage for blog
if (!JSON.parse(localStorage.getItem('blogs'))) {
    localStorage.setItem('blogs', JSON.stringify([]))
}

// click add blog button
var addBlogBtn = $('#blog #add-blog-btn')
var blogModal = $('#blog-modal')
addBlogBtn.onclick = () => {
    console.log(123123)
    blogModal.style.display = 'block'
    blogModal.style.opacity = 1
    blogTitle.value = ''
    blogContent.value = ''
    blogDesc.value = ''
    blogModalContent.style.background = `url("${backgroundList[0]}")`
    blogTitle.style.color = textColorList[0]
    blogContent.style.color = textColorList[0]
    blogDesc.style.color = textColorList[0]
}

// show/hide button list 
var btnList = $('#blog-modal .btn')
var btnShow = $('#blog-modal .btn .show')
btnShow.onclick = () => {
    btnList.classList.toggle('show-btn-list')
    btnList.className.includes('show-btn-list') ? btnShow.innerHTML = '<i class="fas fa-chevron-right"></i>' : btnShow.innerHTML = '<i class="fas fa-chevron-left"></i>'
}

// exit blog modal
var exitBtn = $('#blog-modal .btn .exit')
exitBtn.onclick = () => {
    btnList.classList.remove('show-btn-list')
    btnList.className.includes('show-btn-list') ? btnShow.innerHTML = '<i class="fas fa-chevron-right"></i>' : btnShow.innerHTML = '<i class="fas fa-chevron-left"></i>'
    
    blogModal.style.opacity = 0
    setTimeout(() => {
        blogModal.style.display = 'none'
    }, 600)

    BgPanel.style.display = 'none'
}

var BgPanel = $('#blog-modal #set-background')
var TCPanel = $('#blog-modal #set-text-color')
// show background setting
var setBgBtn = $('#blog-modal .btn .select-background')
setBgBtn.onclick = () => {
    BgPanel.style.display = 'block'
    TCPanel.style.display = 'none'
}

// show text color setting
var setTCBtn = $('#blog-modal .btn .select-text-color')
setTCBtn.onclick = () => {
    TCPanel.style.display = 'block'
    BgPanel.style.display = 'none'
}

// click ok on set background panel
var okBtnBGPanel = $('#set-background .ok-btn')
okBtnBGPanel.onclick = () => {
    BgPanel.style.display = 'none'
}

// save button
var idxForEdit = undefined
var saveBtn = $('#blog-modal .btn .save')
saveBtn.onclick = () => {
    idxForEdit ? saveBlog(idxForEdit) : saveBlog()
}

var blogTitle = $('#blog-modal .enter-title textarea')
var blogContent = $('#blog-modal .enter-content textarea')
var blogDesc = $('#blog-modal .enter-desc textarea')
var blogModalContent = $('#blog-modal #blog-modal-content')
var backgroundList = [
'./assets/img/background/0.jpg',
'./assets/img/background/1.jpg',
'./assets/img/background/2.jpg',
'./assets/img/background/3.jpg',
'./assets/img/background/4.jpg',
'./assets/img/background/5.jpg',
'./assets/img/background/6.jpg',
'./assets/img/background/7.jpg',
'./assets/img/background/8.jpg',
'./assets/img/background/9.jpg',
'./assets/img/background/10.jpg',
'./assets/img/background/11.jpg',
'./assets/img/background/12.jpg',
'./assets/img/background/13.jpg',
'./assets/img/background/14.jpg',
'./assets/img/background/15.jpg',
'./assets/img/background/16.jpg',
'./assets/img/background/17.jpg',
'./assets/img/background/18.jpg',
'./assets/img/background/19.jpg',
'./assets/img/background/20.jpg',
'./assets/img/background/21.jpg',
'./assets/img/background/22.jpg',
'./assets/img/background/23.jpg',
'./assets/img/background/24.jpg',
'./assets/img/background/25.jpg',
'./assets/img/background/26.jpg',
'./assets/img/background/27.jpg',
'./assets/img/background/28.jpg',
'./assets/img/background/29.jpg',
'./assets/img/background/30.jpg',
'./assets/img/background/31.jpg',
'./assets/img/background/32.jpg',
'./assets/img/background/33.jpg',
'./assets/img/background/34.jpg',
'./assets/img/background/35.jpg',
]
var textColorList = ['#000', '#fff', '#795548', '#f44336', '#4CAF50', '#2196F3', '#ffeb3b']
var chooseBGIndex = 0
var chooseTCIndex = 0


// load background selection in set background panel
// onclick all image in set background panel
function loadBGSelection() {
    var backgrounds = $$('#set-background .bg-item .image')
    backgrounds.forEach((background, index) => {
        background.style.background = `url("${backgroundList[index]}")`
        background.onclick = () => {
            chooseBGIndex = index
            blogModalContent.style.background = `url("${backgroundList[index]}")`
            blogModalContent.style.backgroundSize = 'cover'
            blogModalContent.style.backgroundPosition = 'center'
        }
    })
}
loadBGSelection()

// onclick all color cell in set text color panel
var tcColors = $$('#set-text-color .color-item')
tcColors.forEach((tcColor, index) => {
    tcColor.onclick = () => {
        chooseTCIndex = index
        TCPanel.style.display = 'none'
        blogTitle.style.color = `${textColorList[index]}`
        blogContent.style.color = `${textColorList[index]}`
        blogDesc.style.color = `${textColorList[index]}`
    }
})

function loadBGBlogCard(blogCard, idx) {
    console.log(idx)
    var blogs = JSON.parse(localStorage.getItem('blogs'))
    var place = blogs.indexOf(blogs.find((blog, index) => {
        return blog.id == idx
    }))
    blogCard.style.background = `url("${blogs[place].background}")`
    blogCard.style.backgroundPosition = 'center'
}

// save blog
if (!JSON.parse(localStorage.getItem('countID'))) {
    localStorage.setItem('countID', JSON.stringify(0))
}
function saveBlog(idx) {
    var blogs = JSON.parse(localStorage.getItem('blogs'))
    var countID = JSON.parse(localStorage.getItem('countID'))

    if (idx) {
        var place = blogs.indexOf(blogs.find((blog, index) => {
            return blog.id == idx
        }))

        blogs[place].title = blogTitle.value.trim()
        blogs[place].content = blogContent.value
        blogs[place].description = blogDesc.value.trim()
        blogs[place].background = backgroundList[chooseBGIndex]
        blogs[place].textColor = textColorList[chooseTCIndex]
        localStorage.setItem('blogs', JSON.stringify(blogs))

        idxForEdit = undefined
        renderBlog()

    }   else {
        var title = blogTitle.value.trim()
        var content = blogContent.value
        var description = blogDesc.value.trim()
        title !== '' ? title : title = 'untitled...'
        content !== '' ? content : content = ''
        description !== '' ? description : description = 'empty description...'

        var object = {
            id: countID,
            title:  title,
            content: content,
            description: description,
            background: backgroundList[chooseBGIndex],
            textColor: textColorList[chooseTCIndex],
        }

        countID++
        localStorage.setItem('countID', JSON.stringify(countID))
        
        blogs.unshift(object)
        localStorage.setItem('blogs', JSON.stringify(blogs))

        chooseBGIndex = 0
        chooseTCIndex = 0
        idxForEdit = undefined
        renderBlog()
    }

    btnList.classList.remove('show-btn-list')
    btnList.className.includes('show-btn-list') ? btnShow.innerHTML = '<i class="fas fa-chevron-right"></i>' : btnShow.innerHTML = '<i class="fas fa-chevron-left"></i>'
    
    blogModal.style.opacity = 0
    setTimeout(() => {
        blogModal.style.display = 'none'
    }, 600)

    BgPanel.style.display = 'none'
}

// delete blog
function deleteBlog(idx) {
    var blogs = JSON.parse(localStorage.getItem('blogs'))
    var place = blogs.indexOf(blogs.find((blog, index) => {
        return blog.id == idx
    }))
    
    blogs.splice(place, 1)
    
    localStorage.setItem('blogs', JSON.stringify(blogs))
    renderBlog()
}

function editBlog(idx) {
    var blogs = JSON.parse(localStorage.getItem('blogs'))
    var place = blogs.indexOf(blogs.find((blog, index) => {
        return blog.id == idx
    }))
    
    blogModal.style.display = 'block'
    blogModal.style.opacity = 1

    blogTitle.value = blogs[place].title
    blogContent.value = blogs[place].content
    blogDesc.value = blogs[place].description
    blogModalContent.style.background = `url("${blogs[place].background}")`
    blogModalContent.style.backgroundPosition = 'center'
    blogTitle.style.color = `${blogs[place].textColor}`
    blogContent.style.color = `${blogs[place].textColor}`
    blogDesc.style.color = `${blogs[place].textColor}`

    chooseTCIndex = textColorList.indexOf(blogs[place].textColor)
    chooseBGIndex = backgroundList.indexOf(blogs[place].background)

    idxForEdit = idx
}

var blogArea = $('#blog-area')
function renderBlog() {
    var blogs = JSON.parse(localStorage.getItem('blogs'))
    data = blogs.map((blog, index) => {
        return `
            <div id="blog-card" class="w3-card-4 w3-display-container w3-khaki" idx="${blog.id}">
                <h1 class="blog-title">${blog.title}</h1>
                <p class="blog-description">${blog.description}</p>
                <div class="btn w3-display-topright w3-bar-block">
                    <span class="del w3-button w3-bar-item" idx="${blog.id}">&times;</span>
                </div>
            </div>
        `
    }) 
    blogArea.innerHTML = data.join('')

    var blogCards = $$('#blog-area #blog-card')
    blogCards.forEach((blogCard, index) => {
        loadBGBlogCard(blogCard, blogCard.getAttribute('idx'))
    })

    // click on delete button
    var deletesBtn = $$('#blog-area #blog-card .btn .del')
    deletesBtn.forEach((deleteBtn, index) => {
        deleteBtn.onclick = (e) => {
            deleteBlog(e.target.getAttribute('idx'))
        }
    })

    // click on title blog
    var blogCardTitles = $$('#blog-area #blog-card .blog-title')
    blogCardTitles.forEach((blogCardTitle , index) => {
        blogCardTitle.onclick = (e) => {
            editBlog(e.target.parentElement.getAttribute('idx'))
        }
    })
}
renderBlog()