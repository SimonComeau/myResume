//TODO: hide login button if already logged in
//TODO: build a list of menuItems without requiresAuthentication routes, only add IF logged in, reverse current logic, BAD BAD at the moment
//TODO: have order property for menuItems, with default values to organize order of lineup OR filter function with and without auth
let menuController = function ($scope, $http, $state, loginService, $rootScope) {
    $scope.refreshMenu = function () {
        $scope.menuItems = $state.get().filter(m => m.menuItem == true);
        loginService.isLoggedIn().then(response => {
            if (response.data == false) {
                $scope.menuItems = $scope.menuItems.filter(m => typeof m.requiresAuthentication == 'undefined' || m.requiresAuthentication != true);
            }
        });
    };
    $scope.refreshMenu();
    $rootScope.$on("RefreshMenu", $scope.refreshMenu);
};
angular.module("simon").controller("menuController", menuController);
