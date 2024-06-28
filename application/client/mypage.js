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
});

app.factory('appFactory', function($http){
    var factory = {};

    factory.queryAB = function(name, callback){
        $http.get('/query?name='+name).success(function(output){
            callback(output);
        });
    };

    return factory;
});
