class StateEvents {
    constructor($rootScope, $state, authenticationService, $location, $mdToast, $mdDialog) {
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.authenticationService = authenticationService;
        this.$location = $location;
        this.$mdToast = $mdToast;
        this.$mdDialog = $mdDialog;
        this.$rootScope.$on("$stateChangeStart", (event, toState) => this.handlesStateChangeStart(event, toState));
        this.$rootScope.$on("$stateChangeSuccess", (event, toState) => this.handleStateChangeSuccess(event, toState));
    }

    displayUrlNotFound(url) {
        this.$mdToast.show(this.$mdToast.simple().textContent(`This URL: ${url} is not recognized, redirecting to Home.`));
        // TODO: toast for otherwise, url not found
    };

    displayToastForUnauthorizedAccess(url) {
        this.$mdToast.show(this.$mdToast.simple().textContent(`This URL: ${url} requires authentication. Please login to continue.`));
    };

    preventStateChangeAndRedirectToLogin(event, toState) {
        event.preventDefault();
        this.$state.go("login", {redirectState: toState.name});
        this.displayToastForUnauthorizedAccess(this.$location.absUrl());
    };

    checkStateRequiresAuthentication(response, event, toState) {
        let isLoggedIn = response.data;
        let requiresAuthenticationDefined = typeof toState.requiresAuthentication != "undefined";
        let stateDoesNotRequireAuthentication = requiresAuthenticationDefined && !toState.requiresAuthentication;
        if (stateDoesNotRequireAuthentication || isLoggedIn)
            return;
        this.preventStateChangeAndRedirectToLogin(event, toState);
    };
    handleLogoutStateChange (event, toState) {
        let confirm = this.$mdDialog.confirm()
            .title("Logout confirmation")
            .content("Are you sure you want to logout?")
            .ok("Yes")
            .cancel("Cancel");
        this.$mdDialog.show(confirm).then(() => {
            this.authenticationService.logout()
        }, event.preventDefault);
    }
    handlesStateChangeStart(event, toState) {
        if (toState.name == "logout") {
            this.handleLogoutStateChange(event, toState);
        }
        this.$rootScope.$emit("UpdateActiveMenuItem", toState);
        this.authenticationService.isLoggedIn()
            .then((response) => this.checkStateRequiresAuthentication(response, event, toState),
                () => this.preventStateChangeAndRedirectToLogin(event, toState));
    };

    handleStateChangeSuccess(event, toState) {
        this.$rootScope.$emit("UpdateActiveMenuItem", toState);
    };
}
angular.module("simon").run(StateEvents);