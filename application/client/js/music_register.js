// AngularJS 모듈 정의
var app = angular.module('musicApp', []);

// AngularJS 컨트롤러 정의
app.controller('MusicRegisterCtrl', function($scope) {
    // userId를 URL 파라미터에서 추출
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');
    
    // userId가 없는 경우 로그인 페이지로 리디렉션
    if (!userId) {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html'; // 로그인 페이지로 리디렉션
        return;
    }
    
     // $scope.user 객체 초기화
     $scope.user = {
        _id: userId
    };

    // 홈 버튼 클릭 시 mainpage로 리디렉션
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

    // 폼 제출 이벤트 핸들러
    var form = document.getElementById('registerForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음

        var formData = new FormData(form);
        formData.append('userID', userId); // 사용자 ID를 추가

        // 폼 데이터를 서버로 전송
        fetch(form.action, {
            method: 'POST',
            body: formData
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('등록 성공:', data);
            Swal.fire({
                title: '등록 완료',
                text: '음원이 성공적으로 등록되었습니다.',
                icon: 'success'
            }).then(() => {
                window.location.href = 'mainpage.html?userId=' + userId; // 마이페이지로 리디렉션
            });
        }).catch(function(error) {
            console.error('등록 실패:', error);
            Swal.fire({
                title: '등록 실패',
                text: '음원 등록에 실패했습니다.',
                icon: 'error'
            });
        });
    });
});
