class MenuController {
    constructor($http, $state, authenticationService, $rootScope) {
        this.$http = $http;
        this.$state = $state;
        this.authenticationService = authenticationService;
        this.$rootScope = $rootScope;
        this.refreshMenu();
        $rootScope.$on("RefreshMenu", () => this.refreshMenu());
        $rootScope.$on("UpdateActiveMenuItem", (event, state) => this.updateActiveMenuItem(event, state));
    }

    thatDoNotRequireAuthentication(state) {
        let requiresAuthenticationIsDefined = typeof state.requiresAuthentication != "undefined";
        return requiresAuthenticationIsDefined && !state.requiresAuthentication;
    };

    removeLoginMenuItem(state) {
        return state.name != "login";
    }

    getAllMenuItems(state) {
        return typeof state.menuItem != "undefined" && state.menuItem;
    }

    sortMenuItems(menuItemA, menuItemB) {
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

    buildMenu(isLoggedIn) {
        this.menuItems = this.$state.get().filter(this.getAllMenuItems);
        if (isLoggedIn == true) {
            this.menuItems = this.menuItems.filter(this.removeLoginMenuItem);
        } else {
            this.menuItems = this.menuItems.filter(this.thatDoNotRequireAuthentication);
        }
        this.menuItems.sort(this.sortMenuItems);
    };

    refreshMenu() {
        this.authenticationService.isLoggedIn().then((response) => this.buildMenu(response.data), () => this.buildMenu(false));

    };

    updateActiveMenuItem(event, state) {
        this.currentNavItem = state.name;
    }
}

angular.module("simon").controller("menuController", MenuController);