angular.module("simon").config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
        url: "/",
        templateUrl: "/app/home/home.html",
        controller: "homeController",
        menuItem: true
    });
    $stateProvider.state("portfolio", {
        url: "/portfolio",
        templateUrl: "/app/portfolio/portfolio.html",
        controller: "portfolioController",
        // menuItem:true
    });
    $stateProvider.state("contact", {
        url: "/contact",
        templateUrl: "/app/contact/contact.html",
        controller: "contactController",
        menuItem: true
    });
    $stateProvider.state("messages", {
        url: "/contact/messages",
        templateUrl: "/app/contact/messageList.html",
        controller: "contactController",
        menuItem: true,
        requiresAuthentication: true
    });
    $stateProvider.state("messageDetails", {
        templateUrl: "/app/contact/messageDetails.html",
        controller: "contactController",
        requiresAuthentication: true
    });
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "/app/login/login.html",
        controller: "loginController",
        menuItem: true
    });
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go("home");
    })
});
angular.module("simon").run(function ($rootScope, $state, loginService) {
    $rootScope.$on("$stateChangeStart", function (event, toState) {
        if (typeof toState.requiresAuthentication != "undefined" && toState.requiresAuthentication && !loginService.isLoggedIn) {
            event.preventDefault();
            $state.go("login");
        }
    });
});