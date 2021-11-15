var appMusic = angular.module("AppMusic", ['angularUtils.directives.dirPagination', 'ngRoute']);

appMusic.controller('SearchController', function ($scope, $rootScope, $location, $routeParams, $http) {
    $rootScope.title = 'Tìm kiếm bài hát, playlist, album và nghệ sĩ'
    $rootScope.currentIndex = 0
    $rootScope.currentSubIndex = -1
    $scope.searchValue = $routeParams.q || ''
    $scope.name = {
        song: 'bai-hat',
        playlist: 'playlist',
        album: 'album',
        artist: 'nghe-si'
    }
    if ($scope.searchValue) {
        $scope.isChange = true
    } else {
        $scope.isChange = false
    }

    $scope.searchInput = function (name) {
        if ($scope.searchValue && $scope.isChange) {
            $location.path('/tim-kiem/' + name).search({ q: $scope.searchValue, page: 1 })
        }
    }

    $scope.changeInput = function () {
        if ($scope.searchValue) {
            $scope.isChange = true
        } else {
            $scope.isChange = false
        }
    }

    $scope.deleteInput = function () {
        $location.path('/tim-kiem')
        $location.search({ q: null, page: null })
        $scope.searchValue = ''
        $scope.isChange = false
    }
})

appMusic.controller('SongSearchController', function ($scope, $rootScope, $location, $routeParams, $http) {
    $rootScope.title = $routeParams.q + " | Bài hát hay nhất " + $routeParams.q
    $rootScope.currentSubIndex = 1

    $scope.songs = []
    $scope.totalCount = 0
    $scope.pageSize = 5
    $scope.maxSize = 5
    $scope.pageIndex = $routeParams.page || 1

    getResultsPage($scope.pageIndex)

    $scope.pageChanged = function (newPage) {
        $location.path('/tim-kiem/bai-hat').search("page", newPage)
        getResultsPage(newPage);
    };

    function getResultsPage(index) {
        $scope.pageIndex = index
        $http({
            method: 'get',
            url: './assets/js/dataSong.json'
        }).then(function (res) {
            $scope.songs = res.data.songs
            $scope.totalCount = res.data.totalCount
        }, function (err) {
            alert("Failed to get collections!")
        })
    }
})

appMusic.controller('ListenedController', function ($scope, $rootScope, $location, $routeParams, $http) {
    $rootScope.currentIndex = 7
    // $rootScope.currentSubIndex = 1
    $scope.isActiveNav = function (name) {
        if ($routeParams.l == name) {
            return true
        } else {
            return false
        }
    }
})

appMusic.controller('HomeController', function ($scope, $rootScope, $location, $routeParams, $http) {
    $rootScope.title = 'My Music - Nghe nhạc Mới, tải nhạc Hot chất lượng cao'
})

appMusic.controller('DiscoveryController', function ($scope, $rootScope, $routeParams, $location) {
    $rootScope.currentIndex = 2
    // $rootScope.currentSubIndex = 1
    $scope.isActiveNav = function (name) {
        if ($routeParams.n == name) {
            return true
        } else {
            return false
        }
    }
    $scope.isActiveCollection = function (colId) {
        if ($routeParams.col == colId) {
            return true
        } else {
            return false
        }
    }

    $scope.isGenderorisBand = function (g) {
        if ($routeParams.g == g) {
            return true
        } else {
            return false
        }
    }
    $scope.changeGenderorisBand = function (g) {
        $location.search('g', g)
    }
})

appMusic.controller('CollectionController', function ($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.currentIndex = 3
    $rootScope.currentSubIndex = 5

    $http({
        method: 'get',
        url: './assets/js/dataCollection.json'
    }).then(function (res) {
        $scope.collections = res.data
        $scope.genres = $scope.collections.filter(collection => collection.KindofCollection == 1)
        $scope.moods = $scope.collections.filter(collection => collection.KindofCollection == 2)
        $scope.scenes = $scope.collections.filter(collection => collection.KindofCollection == 3)
        $scope.topics = $scope.collections.filter(collection => collection.KindofCollection == 4)
        $scope.pickedCollections = []
        $scope.pickedCollections = $scope.collections.filter(collection => collection.CollectionID == $routeParams.tl || collection.CollectionID == $routeParams.tt || collection.CollectionID == $routeParams.kc || collection.CollectionID == $routeParams.cd)
    }, function (err) {
        alert("Failed to get collections!")
    })

    $scope.indexofCollection = 0
    $scope.showCollection = function (index) {
        $scope.indexofCollection = index
    }
    $scope.isShowCollection = function (index) {
        return $scope.indexofCollection == index
    }

    $scope.pickedCollection2 = function (col) {
        return $scope.pickedCollections.indexOf(col) != -1
    }

    $scope.pickedCollection = function (col, kindofCollection) {
        if (kindofCollection == 'tl') {
            $location.search("tl", col.CollectionID)
        } else if (kindofCollection == 'tt') {
            $location.search("tt", col.CollectionID)
        } else if (kindofCollection == 'kc') {
            $location.search("kc", col.CollectionID)
        } else {
            $location.search("cd", col.CollectionID)
        }
    }

    $scope.removeCollection = function (col) {
        if (col.KindofCollection == 1) {
            $location.search("tl", null)
        } else if (col.KindofCollection == 2) {
            $location.search("tt", null)
        } else if (col.KindofCollection == 3) {
            $location.search("kc", null)
        } else {
            $location.search("cd", null)
        }
    }
})

appMusic.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "N_home.html",
            controller: "HomeController"
        })
        .when("/kham-pha/bai-hat", {
            templateUrl: "A_discovery_song.html",
            controller: "DiscoveryController"
        })
        .when("/kham-pha/playlist", {
            templateUrl: "A_discovery_playlist.html",
            controller: "DiscoveryController"
        })
        .when("/kham-pha/album", {
            templateUrl: "A_discovery_album.html",
            controller: "DiscoveryController"
        })
        .when("/kham-pha/nghe-si", {
            templateUrl: "A_discovery_artist.html",
            controller: "DiscoveryController"
        })
        .when("/tim-kiem", {
            templateUrl: "N_search.html",
            controller: "SearchController"
        })
        .when("/tim-kiem/bai-hat", {
            templateUrl: "search_song.html",
            controller: "SearchController"
        })
        .when("/tim-kiem/playlist", {
            templateUrl: "search_playlist.html",
            controller: "SearchController"
        })
        .when("/tim-kiem/album", {
            templateUrl: "search_album.html",
            controller: "SearchController"
        })
        .when("/tim-kiem/nghe-si", {
            templateUrl: "search_artist.html",
            controller: "SearchController"
        })
        .when("/tuyen-tap", {
            templateUrl: "N_collection.html",
        })
        .when("/top-100", {
            templateUrl: "N_top100.html",
        })
        .when("/my-playlist", {
            templateUrl: "T_myplaylist.html",
        })
        .when("/nguoi-dung", {
            templateUrl: "T_user.html",
        })
        .when("/da-thich", {
            templateUrl: "T_liked.html",
        })
        .when("/da-nghe", {
            templateUrl: "T_listened.html",
            controller: "ListenedController"
        })
        .when("/da-nghe/playlist", {
            templateUrl: "listened_playlist.html",
            controller: "ListenedController"
        })
        .when("/da-nghe/album", {
            templateUrl: "listened_album.html",
            controller: "ListenedController"
        })
        .when("/bang-xep-hang", {
            templateUrl: "rank.html",
        })
        .when("/chi-tiet/bai-hat", {
            templateUrl: "detail_song.html",
        })
        .when("/chi-tiet/playlist", {
            templateUrl: "detail_playlist.html",
        })
        .when("/chi-tiet/album", {
            templateUrl: "detail_album.html",
        })
        .when("/chi-tiet/nghe-si", {
            templateUrl: "detail_artist.html",
        })
        .when("/nang-cap", {
            templateUrl: "upgrade.html",
        })
        .otherwise({
            redirect: '/'
        })
    // $locationProvider.html5Mode(true)
    // $locationProvider.hashPrefix('!')
});

appMusic.controller('SidebarController', function ($scope, $rootScope) {
    $rootScope.currentIndex = 1
    $scope.changePage = function (index) {
        $rootScope.currentIndex = index
        $rootScope.currentSubIndex = -1
    }
    $scope.isActive = function (index) {
        return index == $rootScope.currentIndex
    }
    $rootScope.currentSubIndex = -1
    $scope.changeSubPage = function (index) {
        $rootScope.currentSubIndex = index
    }
    $scope.isSubActive = function (index) {
        return index == $rootScope.currentSubIndex
    }

    let navParent = document.querySelectorAll('div.sidebar__navigation-link')
    navParent.forEach((item) => {
        let listSubLink = item.nextElementSibling
        let SubLink = listSubLink.querySelectorAll('.sidebar__navigation-subitem')
        let active_height = SubLink[0].clientHeight * SubLink.length;
        listSubLink.style.height = active_height + 'px'
        item.onclick = function () {
            this.classList.toggle('show')
            listSubLink.style.height = this.classList.contains('show') ? active_height + 'px' : 0
        }
    })
})

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