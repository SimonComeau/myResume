let menuController = function ($scope, $http, $state, authenticationService, $rootScope) {
    let thatDoNotRequireAuthentication = (state) => {
        let requiresAuthenticationIsDefined = typeof state.requiresAuthentication != "undefined";
        return requiresAuthenticationIsDefined && !state.requiresAuthentication;
    };
    let removeLoginMenuItem = (state) => state.name != "login";
    let getAllMenuItems = (state) => typeof state.menuItem != "undefined" && state.menuItem;
    let sortMenuItems = (menuItemA, menuItemB) => {
        if (typeof menuItemA.order == "undefined") {
            menuItemA.order = 1;
        }
        if (typeof menuItemB.order == "undefined") {
            menuItemB.order = 1;
        }
        if (menuItemA.order < menuItemB.order) {
            return -1;
        }
        if (menuItemA.order > menuItemB.order) {
            return 1;
        }
        return 0;
    };
    let buildMenu = (isLoggedIn) => {
        $scope.menuItems = $state.get().filter(getAllMenuItems);
        if (isLoggedIn == true) {
            $scope.menuItems = $scope.menuItems.filter(removeLoginMenuItem);
        } else {
            $scope.menuItems = $scope.menuItems.filter(thatDoNotRequireAuthentication);
        }
        $scope.menuItems.sort(sortMenuItems);
    };
    $scope.refreshMenu = () => authenticationService.isLoggedIn().then((response) => buildMenu(response.data), () => buildMenu(false));
    $scope.updateActiveMenuItem = (event, state) => $scope.currentNavItem = state.name;
    $scope.refreshMenu();
    $rootScope.$on("RefreshMenu", $scope.refreshMenu);
    $rootScope.$on("UpdateActiveMenuItem", $scope.updateActiveMenuItem);
};
angular.module("simon").controller("menuController", menuController);