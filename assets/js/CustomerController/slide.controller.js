
appMusic.controller('SlideController', function ($scope) {
    let imgArtist = document.querySelectorAll('.released__artist-img')
    let countArtist = imgArtist.length
    imgArtist.forEach(item => {
        item.style.zIndex = `${countArtist}`
        countArtist--
    })

    let slideContain = document.querySelector('.home-main__slide')
    let slide = slideContain.querySelector('.home-main__slide-list')
    let slideItem = slide.querySelectorAll('.home-main__slide-item')
    let lengthSlideItem = slideItem.length
    slide.append(slideItem[0].cloneNode(true))
    slide.prepend(slideItem[lengthSlideItem - 1].cloneNode(true))
    let btnSlidePick = slideContain.querySelectorAll('.home-main__slide-pick-item')

    const app = {
        currentIdx: 1,
        walk: 0,
        startX: 0,
        isDown: false,
        isRun: false,
        time1: new Date,
        time2: new Date,
        // Xử lý sự kiện
        handleEvent() {
            const _this = this

            // Click để chuyển slide
            btnSlidePick.forEach((ele, idx) => {
                ele.onclick = function () {
                    if (!this.classList.contains('picked')) {
                        _this.currentIdx = idx + 1
                        _this.moveSlide(_this.currentIdx)
                    }
                }
            })

            // Tự động chạy slide sau 5s
            let mySetInterval = setInterval(() => {
                if (this.currentIdx == lengthSlideItem + 1) { //Bé transitionend ko chạy nên phải làm cái này ...
                    this.currentIdx = 1
                }
                _this.moveSlide(_this.currentIdx + 1)
            }, 3000)

            // Dừng slide khi mouseover lên toàn bộ silde
            'mouseover touchstart'.split(' ').forEach(ele => {
                slideContain.addEventListener(ele, () => {
                    clearInterval(mySetInterval)
                    mySetInterval = undefined
                })
            })

            // Kích hoạt auto chạy slide khi mouseleave lên toàn bộ silde
            'mouseleave touchend'.split(' ').forEach(ele => {
                slideContain.addEventListener(ele, () => {
                    if (mySetInterval == undefined) {
                        mySetInterval = setInterval(() => {
                            if (this.currentIdx == lengthSlideItem + 1) {
                                this.currentIdx = 1
                            }
                            _this.moveSlide(_this.currentIdx + 1)
                        }, 3000)
                    }
                })
            })

            // Kéo slide
            'mousedown touchstart'.split(' ').forEach(ele => {
                slide.addEventListener(ele, e => {
                    if (!_this.isRun) {
                        _this.isDown = true
                        _this.time1 = new Date()
                        _this.walk = 0
                        _this.startX = (e.clientX || e.changedTouches[0].clientX) - slide.offsetLeft
                        slide.classList.remove('animation')
                        slideItem.forEach(ele => {
                            ele.removeEventListener('click', preventEvent)
                        })
                    }
                    // slide.classList.remove('animation') Bật lên để bỏ độ trễ khi drag thì khi click transition đang chạy sẽ mất event transtionend (Đã xử lý bằng isRun)
                })
            })
            'mouseup touchend'.split(' ').forEach(ele => {
                slide.addEventListener(ele, () => {
                    _this.isDown = false
                    _this.time2 = new Date()
                    _this.moveSlideWhenDrag(_this.walk)
                    _this.moveSlide(_this.currentIdx)
                })
            })
            let preventEvent = function (e) {
                e.preventDefault()
            }
            'mousemove touchmove'.split(' ').forEach(ele => {
                slide.addEventListener(ele, e => {
                    if (!_this.isDown) {
                        return
                    } else {
                        e.preventDefault()
                        _this.walk = (_this.startX - ((e.clientX || e.changedTouches[0].clientX) - slide.offsetLeft)) / slide.offsetWidth * 100
                        slide.style.transform = 'translateX(' + (-(100 * _this.currentIdx + _this.walk)) + '%)'
                        slideItem.forEach(ele => {
                            ele.addEventListener('click', preventEvent)
                        })
                    }
                })
            })
            'mouseleave touchcancel'.split(' ').forEach(ele => {
                slide.addEventListener(ele, () => {
                    if (_this.isDown) {
                        time2 = new Date()
                        _this.moveSlideWhenDrag(_this.walk)
                        _this.moveSlide(_this.currentIdx)
                    }
                    _this.isDown = false
                })
            })

            //Loop slide (Hình như transitionend ko hoạt động khi click vào cửa sổ khác (ko trong cửa sổ nó đang chạy))
            slide.ontransitionend = () => {
                if (_this.currentIdx == lengthSlideItem + 1) {
                    _this.currentIdx = 1
                    slide.classList.remove('animation')
                    slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
                }
                if (_this.currentIdx == 0) {
                    _this.currentIdx = lengthSlideItem
                    slide.classList.remove('animation')
                    slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
                }
                _this.removeClassOfBtnSlide()
                _this.isRun = false
            }
        },
        moveSlideWhenDrag(distance) {
            if ((distance > 40 && this.currentIdx < lengthSlideItem + 1) || (distance > 1 && this.timeSpan(this.time1, this.time2) < 250)) {
                this.currentIdx++
                this.isRun = true
            }
            if ((distance < -40 && this.currentIdx > 0) || (distance < -1 && this.timeSpan(this.time1, this.time2) < 250)) {
                this.currentIdx--
                this.isRun = true
            }
        },
        moveSlide(num) {
            this.currentIdx = num
            slide.classList.add('animation')
            slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
        },
        // xóa class piked ở nút chọn chuyển slide
        removeClassOfBtnSlide() {
            btnSlidePick.forEach(ele => {
                ele.classList.remove('picked')
            })
            btnSlidePick[this.currentIdx - 1].classList.add('picked')
        },
        timeSpan(time1, time2) {
            return time2.getTime() - time1.getTime()
        },
        start() {
            // Xử lý sự kiện
            this.handleEvent()
        }
    }

    app.start()
})

appMusic.controller('SlideClickController', function ($scope) {
    function Slide(options) {
        let btnNext = options.selector.querySelector('.list-playlist__btn-next')
        let btnPrev = options.selector.querySelector('.list-playlist__btn-prev')
        let slide = options.selector.querySelector('.list-playlist__slide > .grid')

        let currentIdx = 0
        let eleInViewOfThisSlide = 6
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

    let slideOne = document.querySelector('#slide-one')
    let slideSecond = document.querySelector('#slide-second')
    let slideThird = document.querySelector('#slide-third')
    let slideTop = document.querySelector('#slide-top')

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

    Slide({
        selector: slideTop,
        duration: 400,
        padding: 6
    })
})