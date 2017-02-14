let loginDependencies = ["$scope", "$http", "$log", "$state","loginService", "$rootScope"];
let loginController = function ($scope, $http, $log, $state, loginService, $rootScope) {
    $scope.user = {};
    $scope.loginButton = function () {
        if ($scope.loginForm.$valid) {
            loginService.isLoggedIn = true;
            $rootScope.$emit("RefreshMenu");
            $state.go("home");
        }
    };
    $scope.clearButton = function () {
        $scope.user = {};
        $scope.loginForm.$submitted = false;
        $scope.loginForm.$setPristine();
        $scope.loginForm.$setUntouched();
    };
};
loginController.$inject = loginDependencies;
angular.module("simon").controller("loginController", loginController);
