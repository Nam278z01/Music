const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let navParent = $$('div.sidebar__navigation-link')
navParent.forEach((item) => {
    item.onclick = function () {
        let listSubLink = this.nextElementSibling
        let SubLink = listSubLink.querySelectorAll('.sidebar__navigation-subitem')
        let active_height = SubLink[0].clientHeight * SubLink.length;
        this.classList.toggle('show')
        listSubLink.style.height = this.classList.contains('show') ? active_height + 'px' : 0
    }
})
