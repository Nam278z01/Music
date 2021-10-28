function Slide(options) {
    let btnNext = options.selector.querySelector('.list-playlist__btn-next')
    let btnPrev = options.selector.querySelector('.list-playlist__btn-prev')
    let slide = options.selector.querySelector('.list-playlist__slide > .grid')

    let currentIdx = 0
    let eleInViewOfThisSlide = 4
    let countEleSlide = slide.children[0].childElementCount
    let jump = (countEleSlide % eleInViewOfThisSlide) / eleInViewOfThisSlide * 100
    
    // Next slide
    btnNext.onclick = () => {
        if (currentIdx * eleInViewOfThisSlide < countEleSlide - eleInViewOfThisSlide) {
            if (countEleSlide - currentIdx * eleInViewOfThisSlide < 2 * eleInViewOfThisSlide) {
                moveSlide(++currentIdx, jump - 100)
            }
            else {
                moveSlide(++currentIdx, 0)
            }
        }
        if (currentIdx * eleInViewOfThisSlide >= countEleSlide - eleInViewOfThisSlide) {
            btnNext.classList.add('disabled')
        }
        btnPrev.classList.remove('disabled')

    }

    // Prev slide
    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            moveSlide(--currentIdx, 0)
        }
        if (currentIdx <= 0) {
            btnPrev.classList.add('disabled')
        }
        btnNext.classList.remove('disabled')
    }

    // Move slide
    function moveSlide(index, percentJump) {
        slide.animate([
            { transform: `translateX(calc(${-100 * index - percentJump}% - ${options.padding * 2 * index}px))` }
        ], {
            duration: options.duration,
            fill: 'forwards'
        })
    }
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let slideOne = $('#slide-one')
let slideSecond = $('#slide-second')
let slideThird = $('#slide-third')

Slide({
    selector: slideOne,
    duration: 400,
    padding: 8
})

Slide({
    selector: slideSecond,
    duration: 400,
    padding: 8
})

Slide({
    selector: slideThird,
    duration: 400,
    padding: 8
})