angular.module("simon").run(($rootScope, $state, authenticationService, $location, $mdToast , $mdDialog) => {
    let displayUrlNotFound = (url) => {
        $mdToast.show($mdToast.simple().textContent("This URL: " + url + " is not recognized, redirecting to Home."));
        // TODO: toast for otherwise, url not found
    };
    let displayToastForUnauthorizedAccess = (url) => {
        $mdToast.show($mdToast.simple().textContent("This URL: " + url + " requires authentication. Please login to continue."));
    };
    let handlesStateChangeStart = (event, toState) => {
        if (toState.name == "logout") {
            let confirm = $mdDialog.confirm()
                .title("Logout confirmation")
                .content("Are you sure you want to logout?")
                .ok("Yes")
                .cancel("Cancel");
            $mdDialog.show(confirm).then(authenticationService.logout, event.preventDefault);
        }
        let preventStateChangeAndRedirectToLogin = () => {
            event.preventDefault();
            $state.go("login", {redirectState: toState.name});
            displayToastForUnauthorizedAccess($location.absUrl());
        };
        let checkStateRequiresAuthentication = (response) => {
            let isLoggedIn = response.data;
            let requiresAuthenticationDefined = typeof toState.requiresAuthentication != "undefined";
            let stateDoesNotRequireAuthentication = requiresAuthenticationDefined && !toState.requiresAuthentication;
            if (stateDoesNotRequireAuthentication || isLoggedIn)
                return;
            preventStateChangeAndRedirectToLogin();
        };
        $rootScope.$emit("UpdateActiveMenuItem", toState);
        authenticationService.isLoggedIn().then(checkStateRequiresAuthentication, preventStateChangeAndRedirectToLogin);
    };
    let handleStateChangeSuccess = (event, toState) => {
        $rootScope.$emit("UpdateActiveMenuItem", toState);
    };
    $rootScope.$on("$stateChangeStart", handlesStateChangeStart);
    $rootScope.$on("$stateChangeSuccess", handleStateChangeSuccess);
});