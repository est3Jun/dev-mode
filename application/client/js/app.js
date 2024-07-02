'use strict';

var app = angular.module('application', []);

app.controller('AppCtrl', function($scope, $timeout, appFactory){
   $("#success_register").hide();
   $("#success_login").hide();
   $("#success_qurey").hide();
   $("#success_delete").hide();
   $("#success_transfer").hide();
   $("#success_searchadmin").hide();

   $scope.registerAB = function(){
       appFactory.registerAB($scope.abstore, function(data){
           if(data.success) {
               $scope.register_ab = "register success";
               $("#success_register").show();
               $timeout(function() {
                   $scope.abstore = {};  // 내부 필드값 초기화
               }, 0);
           } else {
               $scope.register_ab = "register failed";
               $("#success_register").show();
           }
       });
   };
   $scope.loginAB = function(){
    appFactory.loginAB($scope.login, function(data){
        if(data.success){
            window.location.href = `mainpage.html?userId=${$scope.login.userId}`;  // 로그인 성공 시 mainpage.html로 리디렉션
        } else {
            $scope.login_ab = "login failed";
            $("#success_login").show();
        }
    });
};
   $scope.queryAB = function(){
        appFactory.queryAB($scope.walletid, function(data){
           $scope.query_ab = data;
           $("#success_qurey").show();
       });
   };
   $scope.deleteAB = function(){
        appFactory.deleteAB($scope.abstore, function(data){
            if (data.success) {
                $scope.delete_ab = "delete success";
            } else {
                $scope.delete_ab = "delete failed";
            }
            $("#success_delete").show();
        });
    };
    $scope.transferAB = function(){
        appFactory.transferAB($scope.transfer, function(data){
            if (data.success) {
                $scope.transfer_ab = "transfer successful";
            } else {
                $scope.transfer_ab = "transfer failed";
            }
            $("#success_transfer").show();
        });
    };
    $scope.searchAdmin = function() {
        appFactory.queryAB("Admin", function(data){
            $scope.search_admin = data;
            $("#success_searchadmin").show();
        });
    };
});

app.factory('appFactory', function($http){
    var factory = {};

    factory.registerAB = function(data, callback){
        $http.post('/register', data).then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during registration:', error);
            callback({ success: false });
        });
    };

    factory.loginAB = function(data, callback) {
        $http.post('/login', data).then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during login:', error);
            callback({ success: false });
        });
    };
    
    factory.queryAB = function(name, callback){
        $http.get('/query?name='+name).then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during query:', error);
            callback({});
        });
    };

    factory.deleteAB = function(data, callback){
        $http.post('/deleteUser', data).then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during delete:', error);
            callback({ success: false });
        });
    };

    factory.transferAB = function(data, callback){
        $http.post('/transfer', data).then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during transfer:', error);
            callback({ success: false });
        });
    };

    factory.searchAdmin = function(callback){
        $http.get('/query?name=admin').then(function(response){
            callback(response.data);
        }).catch(function(error){
            console.error('Error during admin search:', error);
            callback({});
        });
    };

    return factory;
});
