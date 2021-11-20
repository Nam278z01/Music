var appMusic = angular.module("AppMusic", ['angularUtils.directives.dirPagination', 'ngRoute']);

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
            controller: "CollectionController"
        })
        .when("/top-100", {
            templateUrl: "N_top100.html",
            controller: "Top100Controller"
        })
        .when("/my-playlist", {
            templateUrl: "T_myplaylist.html",
            controller: "MyPlaylistController"
        })
        .when("/nguoi-dung", {
            templateUrl: "T_user.html",
            controller: "UserController"
        })
        .when("/da-thich/bai-hat", {
            templateUrl: "T_liked.html",
            controller: "SongLikedController"
        })
        .when("/da-thich/playlist", {
            templateUrl: "liked_playlist.html",
            controller: "PlaylistLikedController"
        })
        .when("/da-thich/album", {
            templateUrl: "liked_album.html",
            controller: "AlbumLikedController"
        })
        .when("/da-nghe/bai-hat", {
            templateUrl: "T_listened.html",
            controller: "SongListenedController"
        })
        .when("/da-nghe/playlist", {
            templateUrl: "listened_playlist.html",
            controller: "PlaylistListenedController"
        })
        .when("/da-nghe/album", {
            templateUrl: "listened_album.html",
            controller: "AlbumListenedController"
        })
        .when("/bang-xep-hang", {
            templateUrl: "rank.html",
            controller: "RankController"
        })
        .when("/chi-tiet/bai-hat", {
            templateUrl: "detail_song.html",
            controller: "SongDetailsController"
        })
        .when("/chi-tiet/playlist", {
            templateUrl: "detail_playlist.html",
            controller: "PlaylistDetailsController"
        })
        .when("/chi-tiet/album", {
            templateUrl: "detail_album.html",
            controller: "AlbumDetailsController"
        })
        .when("/chi-tiet/nghe-si", {
            templateUrl: "detail_artist.html",
            controller: "ArtistDetailsController"
        })
        .when("/nang-cap", {
            templateUrl: "upgrade.html",
            controller: "UpgradeController"
        })
        .otherwise({
            redirect: '/'
        })
});

appMusic.run(function ($rootScope, $http) {
    $rootScope.title = 'Tìm kiếm bài hát, playlist, album và nghệ sĩ'
    $rootScope.User = {}
    $rootScope.currentIndex = 1
    $rootScope.currentSubIndex = -1
    $rootScope.songIsPlayed = {}
    $rootScope.logged = false

    $http({
        method: 'get',
        url: './assets/js/dataLogin.json'
    }).then(function (res) {
        if (res.data.Login) {
            $rootScope.User = res.data
            $rootScope.logged = true
            document.querySelector('#modal-login-singup').remove()
            document.querySelector('.signin-singup').remove()
        }
    }, function (err) {
        alert('Failed to get Account!')
    })

    window.onload = function () {
        document.querySelector('.loading').classList.add('hidden')
    }

    let btnLogin = document.querySelector('#showlogin')
    let btnSignUp = document.querySelector('#showsignup')
    let modalLoginSignUp = document.querySelector('#modal-login-singup')
    let loginForm = document.querySelector('#loginForm')
    let SignUpForm = document.querySelector('#registerForm')
    let body = document.body
    let scrollTop
    let isLogin = true
    btnLogin.onclick = () => {
        modalLoginSignUp.style.display = 'block'
        loginForm.style.display = 'block'
        // Ẩn thanh cuộn và giữ vị trí
        scrollTop = document.querySelector('html').scrollTop
        body.classList.add('no-scroll')
        body.style.top = -scrollTop + 'px'
        isLogin = true
    }
    btnSignUp.onclick = () => {
        modalLoginSignUp.style.display = 'block'
        SignUpForm.style.display = 'block'
        // Ẩn thanh cuộn và giữ vị trí
        scrollTop = document.querySelector('html').scrollTop
        body.classList.add('no-scroll')
        body.style.top = -scrollTop + 'px'
        isLogin = false
    }
    body.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal__body') || e.target.closest('.auth-form__controls-back')) {
            document.body.classList.remove('no-scroll')
            document.querySelector('html').scrollTop = scrollTop
            body.style.top = '0px'
            modalLoginSignUp.style.display = 'none'
            SignUpForm.style.display = 'none'
            loginForm.style.display = 'none'
        }
        if (e.target.closest('.auth-form__switch-btn')) {
            if (isLogin) {
                loginForm.style.display = 'none'
                SignUpForm.style.display = 'block'
            } else {
                loginForm.style.display = 'block'
                SignUpForm.style.display = 'none'
            }
            isLogin = !isLogin
        }
    })
})