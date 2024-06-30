var app = angular.module('application', []);

app.controller('MypageCtrl', function($scope, appFactory){
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');

    // userId로 사용자 정보 로드
    if(userId){
        appFactory.queryAB(userId, function(data){
            $scope.user = JSON.parse(data);
            $scope.user.profilePicture = 'https://via.placeholder.com/150';
        });
    }
    
    // 충전하기
    $scope.charge = function() {
        var chargeAmount = $scope.chargeAmount;
    
        if (chargeAmount && chargeAmount > 0) {
            appFactory.chargeAB({ userId: $scope.user.id, amount: chargeAmount }, function(response) {
                if (response.status === 200) {
                    // 성공적으로 충전이 완료되었을 때, 사용자 정보를 다시 로드합니다.
                    appFactory.queryAB($scope.user.id, function(data){
                        $scope.user = JSON.parse(data);
                    });
                    Swal.fire({
                      title: '충전 완료',
                      text: '충전이 완료되었습니다.',
                      icon: 'success',
                    }).then(() => {
                        $('#chargeModal').modal('hide');
                    });
                } else {
                    alert('충전 실패: ' + response.data);
                }
            });
        } else {
            alert('올바른 금액을 입력하세요.');
        }
    };
    
    // 환전하기
    $scope.exchange = function() {
        var exchangeAmount = $scope.exchangeAmount;
    
        if (exchangeAmount && exchangeAmount > 0) {
            appFactory.exchangeAB({ userId: $scope.user.id, amount: exchangeAmount }, function(response) {
                if (response.status === 200) {
                    // 성공적으로 환전이 완료되었을 때, 사용자 정보를 다시 로드합니다.
                    appFactory.queryAB($scope.user.id, function(data){
                        $scope.user = JSON.parse(data);
                    });
                    Swal.fire({
                      title: '환전 완료',
                      text: '환전이 완료되었습니다.',
                      icon: 'success',
                    }).then(() => {
                        $('#exchangeModal').modal('hide');
                    });
                } else {
                    alert('환전 실패: ' + response.data);
                }
            });
        } else {
            alert('올바른 금액을 입력하세요.');
        }
    };
});

app.factory('appFactory', function($http){
    var factory = {};

    factory.queryAB = function(name, callback){
        $http.get('/query?name='+name).success(function(output){
            callback(output);
        });
    };

    factory.chargeAB = function(data, callback) {
        $http.get('/charge?userId=' + data.userId + '&amount=' + data.amount).then(function(response) {
            callback(response);
        });
    };

    factory.exchangeAB = function(data, callback) {
        $http.get('/exchange?userId=' + data.userId + '&amount=' + data.amount).then(function(response) {
            callback(response);
        });
    };

    return factory;
});

var messageBox = document.querySelector('.js-message');
var btn = document.querySelector('.js-message-btn');
var card = document.querySelector('.js-profile-card');
var closeBtn = document.querySelectorAll('.js-message-close');

btn.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.add('active');
});

closeBtn.forEach(function (element, index) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        card.classList.remove('active');
    });
});


