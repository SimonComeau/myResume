// TODO: rename to authController
// TODO: logout needs a confirmation dialogue
// TODO: toast for logout event
let loginController = function ($scope, $http, $log, $state, loginService, $rootScope) {
    $scope.user = {};
    $scope.loginButton = function () {
        if ($scope.loginForm.$valid) {
            loginService.authenticateUser($scope.user.name, $scope.user.password);
        }
    };
    $scope.clearButton = function () {
        $scope.user = {};
        $scope.loginForm.$submitted = false;
        $scope.loginForm.$setPristine();
        $scope.loginForm.$setUntouched();
    };
    if ($state.$current.name == "logout") {
        loginService.logout();
    }
};
angular.module("simon").controller("loginController", loginController);
