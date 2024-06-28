 /*global $, document, window, setTimeout, navigator, console, location*/
 $(document).ready(function () {
    var usernameError = true,
        emailError = true,
        passwordError = true,
        passConfirm = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {
        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {
        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Please type your full name').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else if ($(this).val().length > 1 && $(this).val().length <= 6) {
                $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                usernameError = false;
            }
        }
        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('Please type your email address').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                emailError = false;
            }
        }

        // PassWord
        if ($(this).hasClass('pass')) {
            if ($(this).val().length < 8) {
                $(this).siblings('span.error').text('Please type at least 8 charcters').fadeIn().parent('.form-group').addClass('hasError');
                passwordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                passwordError = false;
            }
        }

        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
            passConfirm = false;
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            passConfirm = false;
        }

        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });

    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }

        // Toggle active class to show/hide forms
        $('.form-peice').toggleClass('active');
    });

    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();

        if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
            $('.name, .email, .pass, .passConfirm').blur();
        } else {
            $('.signup, .login').addClass('switched');

            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
        }
    });

    // Reload page
    $('a.profile').on('click', function () {
        location.reload(true);
    });
});

var app = angular.module('application', []);

app.controller('AppCtrl', function ($scope, $timeout, appFactory) {
    $("#success_login").hide();
    $("#success_register").hide();

    $scope.loginAB = function () {
        appFactory.loginAB($scope.login, function (data) {
            if (data == "Login successful") {
                // 로그인 성공 시 mypage.html로 리디렉션
                window.location.href = `mypage.html?userId=${$scope.login.userId}`;
            }
            $scope.login_ab = "login success";
            $("#success_login").show();
        });
    };

    $scope.registerAB = function () {
        appFactory.registerAB($scope.abstore, function (data) {
            if (data == "Register successful") {
                // 회원가입 성공 시 메시지 표시
                $scope.register_ab = "register success";
                $("#success_register").show();
                // 내부 필드값 초기화
                $timeout(function() {
                    $scope.abstore.name = '';
                    $scope.abstore.id = '';
                    $scope.abstore.phone_number = '';
                    $scope.abstore.pw = '';
                    $scope.abstore.account_number = '';
                    $scope.abstore.account_money = '';
                }, 0);
            }
        });
    };
});

app.factory('appFactory', function ($http) {
    var factory = {};

    factory.loginAB = function (data, callback) {
        $http.get('/login?userId=' + data.userId + '&userPw=' + data.userPw).success(function (output) {
            callback(output);
        });
    };

    factory.registerAB = function (data, callback) {
        $http.get('/register?name=' + data.name + '&id=' + data.id + '&pw=' + data.pw + '&phone_number=' + data.phone_number + '&account_number=' + data.account_number + '&account_money=' + data.account_money).success(function (output) {
            callback(output);
        });
    };

    return factory;
});