class AuthenticationController {
    constructor($http, $scope, $state, authenticationService, $stateParams) {
        this.$http = $http;
        this.$scope = $scope;
        this.$state = $state;
        this.authenticationService = authenticationService;
        this.$stateParams = $stateParams;
        this.$scope.user = {};
    }

    loginButton() {
        if (this.$scope.loginForm.$valid) {
            this.authenticationService.authenticateUser(this.$scope.user.name, this.$scope.user.password, this.$stateParams.redirectState);
        }
    };

    clearButton() {
        this.$scope.user = {};
        this.$scope.loginForm.$submitted = false;
        this.$scope.loginForm.$setPristine();
        this.$scope.loginForm.$setUntouched();
    }
}
angular.module("simon").controller("authenticationController", AuthenticationController);
