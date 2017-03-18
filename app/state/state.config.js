angular.module("simon").config(($stateProvider, $urlRouterProvider) => {
    let handleDefaultState = ($injector, $location) => {
        let $state = $injector.get("$state");
        let $rootScope = $injector.get("$rootScope");
        $state.go("home");
        $rootScope.emit("displayUrlNotFound", $location.absUrl());
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