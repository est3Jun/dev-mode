var app = angular.module('application', []);

app.controller('AppCtrl', function($scope, $http) {
    // URL에서 userId 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');

    if (userId) {
        $http.get('/query?name=' + userId)
            .then(function(response) {
                $scope.user = JSON.parse(response.data);
                $scope.user.profilePicture = 'https://filmshotfreezer.files.wordpress.com/2011/07/untitled-1.jpg';
            })
            .catch(function(error) {
                console.error('Error fetching user data:', error);
            });
    } else {
        $scope.user = {
            profilePicture: 'https://filmshotfreezer.files.wordpress.com/2011/07/untitled-1.jpg',
            id: 'Guest',
            point: 0
        };
    }

    $scope.albums = [];

    $http.get('/albums')
        .then(function(response) {
            $scope.albums = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching albums:', error);
        });

    $scope.goToMypage = function() {
        window.location.href = 'mypage.html?userId=' + $scope.user.id;
    };
});
