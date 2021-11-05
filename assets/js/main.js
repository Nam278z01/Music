var appMusic = angular.module("AppMusic", ["ngRoute"]);
appMusic.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "N_home.html",
        })
        .when("/discovery/song", {
            templateUrl: "A_discovery_song.html",
        })
        .when("/discovery/playlist", {
            templateUrl: "A_discovery_playlist.html",
        })
        .when("/discovery/album", {
            templateUrl: "A_discovery_album.html",
        })
        .when("/discovery/artist", {
            templateUrl: "A_discovery_artist.html",
        })
        .when("/search", {
            templateUrl: "N_search.html",
        })
        .when("/collection", {
            templateUrl: "N_collection.html",
        })
        .when("/top100", {
            templateUrl: "N_top100.html",
        })
        .when("/myplaylist", {
            templateUrl: "T_myplaylist.html",
        })
        .when("/user", {
            templateUrl: "T_user.html",
        })
        .when("/liked", {
            templateUrl: "T_liked.html",
        })
        .when("/listened", {
            templateUrl: "T_listened.html",
        })
        .when("/rank", {
            templateUrl: "rank.html",
        })
        .otherwise({
            redirect: '/'
        })
});