let authenticationController = function ($scope, $http, $log, $state, authenticationService) {
    $scope.user = {};
    $scope.loginButton = function () {
        if ($scope.loginForm.$valid) {
            authenticationService.authenticateUser($scope.user.name, $scope.user.password);
        }
    };
    $scope.clearButton = function () {
        $scope.user = {};
        $scope.loginForm.$submitted = false;
        $scope.loginForm.$setPristine();
        $scope.loginForm.$setUntouched();
    };
    if ($state.$current.name == "logout") {
        authenticationService.logout();
    }
};
angular.module("simon").controller("authenticationController", authenticationController);
