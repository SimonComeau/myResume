angular.module("simon").config(($stateProvider, $urlRouterProvider) => {
    let displayUrlNotFoundToast = (url) => {
        // TODO: toast for otherwise, url not found
    };
    let handleDefaultState = ($injector, $location) => {
        console.log("hds", $location.absUrl());
        let $state = $injector.get("$state");
        $state.go("home");
        displayUrlNotFoundToast($location.absUrl());
    };
    let homeState = {
        url: "/",
        templateUrl: "/app/home/home.html",
        controller: "homeController",
        requiresAuthentication: false,
        menuItem: true
    };
    let portfolioState = {
        url: "/portfolio",
        templateUrl: "/app/portfolio/portfolio.html",
        controller: "portfolioController",
        requiresAuthentication: false,
        // menuItem:true
    };
    let contactState = {
        url: "/contact",
        templateUrl: "/app/contact/contact.html",
        controller: "contactController",
        requiresAuthentication: false,
        menuItem: true
    };
    let messagesState = {
        url: "/contact/messages",
        templateUrl: "/app/contact/messageList.html",
        controller: "contactController",
        menuItem: true,
        requiresAuthentication: true
    };
    let messageDetailsState = {
        templateUrl: "/app/contact/messageDetails.html",
        controller: "contactController",
        requiresAuthentication: true
    };
    let loginState = {
        url: "/login",
        templateUrl: "/app/authentication/authentication.html",
        controller: "loginController",
        requiresAuthentication: false,
        menuItem: true
    };
    let logoutState = {
        url: "/logout",
        controller: "loginController",
        requiresAuthentication: true,
        menuItem: true
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
angular.module("simon").run(($rootScope, $state, loginService, $location) => {
    let displayToastForUnauthorizedAccess = (url) => {
        // TODO: toast for unauthorized access, plz login
    };
    let handlesStateChangeStart = (event, toState) => {
        let preventStateChangeAndRedirectToLogin = () => {
            event.preventDefault();
            $state.go("login");
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
        loginService.isLoggedIn().then(checkStateRequiresAuthentication, preventStateChangeAndRedirectToLogin);
    };
    let handleStateChangeSuccess = (event, toState) => {
        $rootScope.$emit("UpdateActiveMenuItem", toState);
    };
    $rootScope.$on("$stateChangeStart", handlesStateChangeStart);
    $rootScope.$on("$stateChangeSuccess", handleStateChangeSuccess);
});