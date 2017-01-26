let mymodule=angular.module("simon", ["ui.router", "ui.bootstrap"]);
mymodule.config(["$stateProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain=true;
    $locationProvider.html5Mode(true);
    $stateProvider.state("contact", {
        url: "/contact",
        templateUrl:"/app/contact/contact.html",
        controller: "contactController"
    });
    $stateProvider.state("portfolio", {
        url: "/portfolio",
        templateUrl:"/app/portfolio/portfolio.html",
        controller: "portfolioController"
    });
}]);

angular.element(() => angular.bootstrap(document, ["simon"]));