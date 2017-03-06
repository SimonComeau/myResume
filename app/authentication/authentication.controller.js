let authenticationController = function ($scope, $http, $state, authenticationService, $stateParams) {
    $scope.user = {};
    $scope.loginButton = function () {
        if ($scope.loginForm.$valid) {
            authenticationService.authenticateUser($scope.user.name, $scope.user.password, $stateParams.redirectState);
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
