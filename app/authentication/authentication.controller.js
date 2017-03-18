class AuthenticationController {
    constructor($http, $state, authenticationService, $stateParams) {
        this.$http = $http;
        this.$state = $state;
        this.authenticationService = authenticationService;
        this.$stateParams = $stateParams;
        this.user = {};
    }

    loginButton() {
        if (this.form.$valid) {
            this.authenticationService.authenticateUser(this.user.name, this.user.password, this.$stateParams.redirectState);
        }
    };

    clearButton() {
        this.user = {};
        this.form.$submitted = false;
        this.form.$setPristine();
        this.form.$setUntouched();
    }
}
angular.module("simon").controller("authenticationController", AuthenticationController);
