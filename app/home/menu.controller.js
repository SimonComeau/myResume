//TODO: have order property for menuItems, with default values to organize order of lineup
let menuController = function ($scope, $http, $state, authenticationService, $rootScope) {
    let thatDoNotRequireAuthentication = (state) => {
        let requiresAuthenticationIsDefined = typeof state.requiresAuthentication != "undefined";
        return requiresAuthenticationIsDefined && !state.requiresAuthentication;
    };
    let removeLoginMenuItem = (state) => state.name != "login";
    let getAllMenuItems = (state) => typeof state.menuItem != "undefined" && state.menuItem;
    let buildMenuWithAllItems = (response) => {
        if (response.data == true) {
            $scope.menuItems = $state.get().filter(getAllMenuItems).filter(removeLoginMenuItem);
        } else {
            buildMenuWithItemsThatDoNotRequireAuthentication();
        }
    };
    let buildMenuWithItemsThatDoNotRequireAuthentication = () => {
        $scope.menuItems = $state.get().filter(getAllMenuItems).filter(thatDoNotRequireAuthentication);
    };
    $scope.refreshMenu = () => {
        authenticationService.isLoggedIn().then(buildMenuWithAllItems, buildMenuWithItemsThatDoNotRequireAuthentication);
    };
    $scope.updateActiveMenuItem = (event, state) => {
        $scope.currentNavItem = state.name;
    };
    $scope.refreshMenu();
    $rootScope.$on("RefreshMenu", $scope.refreshMenu);
    $rootScope.$on("UpdateActiveMenuItem", $scope.updateActiveMenuItem);
};
angular.module("simon").controller("menuController", menuController);