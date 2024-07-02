var app = angular.module('application', []);

app.controller('TransferCtrl', function($scope, $http) {
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');

    if (userId) {
        $scope.user = {
            _id: userId
        };
    } else {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html'; // 로그인 페이지로 리디렉션
        return;
    }

    $scope.goToMypage = function() {
        window.location.href = 'mypage.html?userId=' + $scope.user._id;
    };

    $scope.goToTransfer = function() {
        window.location.href = 'transfer.html?userId=' + $scope.user._id;
    };

    $scope.goToMusic_search = function() {
        window.location.href = 'music_search.html?userId=' + $scope.user._id;
    };

    $scope.goToMainpage = function() {
        window.location.href = 'mainpage.html?userId=' + $scope.user._id;
    };

    $scope.goToRegisterMusic = function() {
        window.location.href = 'music_register.html?userId=' + $scope.user._id;
    };

    $scope.transferData = {
        sender: '',
        receiver: '',
        songName: ''
    };

    $scope.submitTransfer = function() {
        $http.post('/transfer', $scope.transferData)
            .then(function(response) {
                alert('거래가 성공적으로 완료되었습니다.');
            })
            .catch(function(error) {
                alert('거래 중 오류가 발생했습니다.');
            });
    };
});
