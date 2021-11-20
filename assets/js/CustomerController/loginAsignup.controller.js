appMusic.controller('LoginController', function ($scope, $rootScope, $http, $window) {
    $scope.isLoginSubmit = true

    $scope.loginSubmit = function () {
        $http({
            method: 'get',
            url: './assets/js/dataLogin.json'
        }).then(function (res) {
            if (res.data.Login) {
                $window.location.reload();
            } else {
                $scope.isLoginSubmit = false
            }
        }, function (err) {
            alert('Failed to get Account!')
        })
    }
})