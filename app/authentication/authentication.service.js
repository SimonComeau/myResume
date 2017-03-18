class AuthenticationService {
    constructor($http, $rootScope, $state, $mdToast) {
        let setAuthToken = (response) => {
            this.authToken = response.data;
        };
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.loginUrl = `/api/authentication/login/${ this.getSessionId() }`;
        this.logoutUrl = `/api/authentication/logout/${ this.getSessionId() }`;
        this.isLoggedInUrl = `/api/authentication/isloggedin/${ this.getSessionId() }`;
        this.getAuthTokenUrl = `api/authentication/getauthtoken/${ this.getSessionId() }`;
        this.$http.get(this.getAuthTokenUrl).then(setAuthToken);
    }

    getSessionId() {
        if (sessionStorage.getItem("sessionId")) {
            return sessionStorage.getItem("sessionId");
        }
        let sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", sessionId);
        return sessionId;
    };

    redirectAfterLoginStateChange(redirectStateName) {
        this.$rootScope.$emit("RefreshMenu");
        if (this.$state.$current.name == redirectStateName) {
            this.$rootScope.$emit("UpdateActiveMenuItem", this.$state.$current);
        }
        this.$state.go(redirectStateName);
    };

    refreshMenuAfterLoginFailure() {
        this.$rootScope.$emit("RefreshMenu");
    };

    authenticateUser(username, password, redirectState) {
        let hashedUsername = sha512(username + this.authToken);
        let hashedPassword = sha512(password + this.authToken);
        let user = {username: hashedUsername, password: hashedPassword};

        return this.$http.post(this.loginUrl, user).then(() => {
            this.redirectAfterLoginStateChange(redirectState);
            this.$mdToast.show(this.$mdToast.simple().textContent("Login successful."));
        }, () => {
            this.refreshMenuAfterLoginFailure();
            this.$mdToast.show(this.$mdToast.simple().textContent("Login failed."));
        });
    };

    isLoggedIn() {
        return this.$http.get(this.isLoggedInUrl);
    };

    logout() {
        this.$http.post(this.logoutUrl).then(() => this.redirectAfterLoginStateChange("home"));
        this.$mdToast.show(this.$mdToast.simple().textContent("Logout successful."));
    };
}
angular.module("simon").service("authenticationService", AuthenticationService);
