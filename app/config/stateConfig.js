angular.module("simon").config(($stateProvider, $urlRouterProvider) => {
    let displayUrlNotFoundToast = (url) => {
        // TODO: toast for otherwise, url not found
    };
    let handleDefaultState = ($injector, $location) => {
        let $state = $injector.get("$state");
        $state.go("home");
        displayUrlNotFoundToast($location.absUrl());
    };
    let homeState = {
        url: "/",
        templateUrl: "/app/home/home.html",
        controller: "homeController",
        requiresAuthentication: false,
        menuItem: true,
        order: 0
    };
    let portfolioState = {
        url: "/portfolio",
        templateUrl: "/app/portfolio/portfolio.html",
        controller: "portfolioController",
        requiresAuthentication: false,
        // menuItem:true,
        order: 20
    };
    let contactState = {
        url: "/contact",
        templateUrl: "/app/contact/contact.html",
        controller: "contactController",
        requiresAuthentication: false,
        menuItem: true,
        order: 30
    };
    let messagesState = {
        url: "/contact/messages",
        templateUrl: "/app/contact/messageList.html",
        controller: "contactController",
        requiresAuthentication: true,
        menuItem: true,
        order: 40
    };
    let messageDetailsState = {
        templateUrl: "/app/contact/messageDetails.html",
        controller: "contactController",
        requiresAuthentication: true,
        order: 50
    };
    let loginState = {
        url: "/login",
        templateUrl: "/app/authentication/login.html",
        controller: "authenticationController",
        requiresAuthentication: false,
        menuItem: true,
        params: {redirectState: "home"},
        order: 260
    };
    let logoutState = {
        url: "/logout",
        controller: "authenticationController",
        requiresAuthentication: true,
        menuItem: true,
        order: 270
    };
    $stateProvider.state("home", homeState);
    $stateProvider.state("portfolio", portfolioState);
    $stateProvider.state("contact", contactState);
    $stateProvider.state("messages", messagesState);
    $stateProvider.state("messageDetails", messageDetailsState);
    $stateProvider.state("login", loginState);
    $stateProvider.state("logout", logoutState);
    $urlRouterProvider.otherwise(handleDefaultState);
});
angular.module("simon").run(($rootScope, $state, authenticationService, $location, $mdToast ,$mdDialog) => {
    let displayToastForUnauthorizedAccess = (url) => {
        $mdToast.show($mdToast.simple().textContent("This URL: " + url + "requires authentication. Please login to continue."));
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