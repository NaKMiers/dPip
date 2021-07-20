const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// dropdown-click
function dropdownClick(dropdownBtn, dropdownContent) {
    function handleDropdown(id) {
        var e = $('#' + id)
        e.classList.toggle('w3-show')  
    }
    
    var dropdown = $('#' + dropdownBtn)
    dropdown.onclick = function() {
        handleDropdown(dropdownContent)
    }    
}

export default dropdownClick