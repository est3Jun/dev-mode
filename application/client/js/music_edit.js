var app = angular.module('editApp', []);

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller('EditCtrl', function($scope, $http) {
    var urlParams = new URLSearchParams(window.location.search);
    var songId = urlParams.get('songId');
    var userId = urlParams.get('userId');

    // songId로 음원 정보 로드
    if (songId) {
        $http.get('/getSong?songId=' + songId)
            .then(function(response) {
                $scope.song = response.data;
                $scope.song.audioFile = '/uploads/' + response.data.audioFile.split('/').pop();
                $scope.song.imageFile = '/uploads/' + response.data.imageFile.split('/').pop();
            })
            .catch(function(error) {
                console.error('Error fetching song data:', error);
            });
    }

    $scope.submitForm = function() {
        var formData = new FormData();
        formData.append('songId', $scope.song._id);
        formData.append('songName', $scope.song.songName);
        formData.append('genre', $scope.song.genre);
        formData.append('songInfo', $scope.song.songInfo);
        formData.append('lyrics', $scope.song.lyrics);
        formData.append('price', $scope.song.price);

        if ($scope.audioFile) {
            formData.append('audioFile', $scope.audioFile);
        }
        if ($scope.imageFile) {
            formData.append('imageFile', $scope.imageFile);
        }

        $http.post('/editMusic', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .then(function(response) {
            Swal.fire({
                title: '수정 완료',
                text: '음원 수정이 성공적으로 완료되었습니다.',
                icon: 'success'
            }).then(() => {
                window.location.href = 'mypage.html?userId=' + userId;
            });
        })
        .catch(function(error) {
            console.error('Error updating song:', error);
        });
    };
});
