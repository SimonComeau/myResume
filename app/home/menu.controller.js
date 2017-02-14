let menuDependencies = ["$scope", "$http", "$state", "loginService", "$rootScope"];
let menuController = function ($scope, $http, $state, loginService, $rootScope) {
    $scope.refreshMenu = function () {
        $scope.menuItems = $state.get().filter(m => m.menuItem == true);
        console.log("fuck it");
        if (!loginService.isLoggedIn) {
            $scope.menuItems = $scope.menuItems.filter(m => typeof m.requiresAuthentication == 'undefined' || m.requiresAuthentication != true);
        }
    };
    $scope.refreshMenu();
    $rootScope.$on("RefreshMenu", $scope.refreshMenu);
};
menuController.$inject = menuDependencies;
angular.module("simon").controller("menuController", menuController);
