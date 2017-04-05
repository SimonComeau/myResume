class StateConfig {
    constructor($stateProvider, $urlRouterProvider) {
        this.$stateProvider = $stateProvider;
        this.$urlRouterProvider = $urlRouterProvider;
        this.registerStates();
        this.$urlRouterProvider.otherwise(this.handleDefaultState);
    }

    registerStates() {
        this.buildState("/", "/app/home/home.view.html", "homeController").register("home");
        this.buildState("/portfolio", "/app/portfolio/portfolio.html", "portfolioController", 20, false).register("portfolio");
        this.buildState("/contact", "/app/message/contactMe.view.html", "messageController", 30).register("contact");
        this.buildState("/message/list", "/app/message/message.list.view.html", "messageListController", 40, undefined, true).register("messages");
        this.buildState(undefined, "/app/message/message.details.view.html", "messageController", 50, false, true).register("messageDetails");
        let loginState = this.buildState("/login", "/app/authentication/login.view.html", "authenticationController", 260);
        loginState.params = {redirectState: "home"};
        loginState.register("login");
        this.buildState("/logout", undefined, "authenticationController", 270, undefined, true).register("logout");
    }

    handleDefaultState($injector, $location) {
        let $state = $injector.get("$state");
        let $rootScope = $injector.get("$rootScope");
        $state.go("home");
        // $rootScope.emit("displayUrlNotFound", $location.absUrl());
    };

    buildState(url, templateUrl, controller, order, menuItem, requiresAuthentication) {
        let state = {};
        state.url = url;
        state.templateUrl = templateUrl;
        state.controller = controller;
        state.order = order;
        if (typeof menuItem != "undefined") {
            state.menuItem = menuItem;
        } else {
            state.menuItem = true
        }
        if (typeof requiresAuthentication != "undefined") {
            state.requiresAuthentication = requiresAuthentication;
        } else {
            state.requiresAuthentication = false
        }
        state.register = (name) => {
            this.$stateProvider.state(name, state);
        };
        return state;
    }
}
angular.module("simon").config(StateConfig);