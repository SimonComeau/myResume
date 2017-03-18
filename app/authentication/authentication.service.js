let authenticationService = function ($http, $rootScope, $state, $mdToast) {
    this.getSessionId = () => {
        if (sessionStorage.getItem("sessionId")) {
            return sessionStorage.getItem("sessionId");
        }
        let sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", sessionId);
        return sessionId;
    };
    // TODO: use formatted strings template
    let loginUrl = "/api/authentication/login/" + this.getSessionId();
    let logoutUrl = "/api/authentication/logout/" + this.getSessionId();
    let isLoggedInUrl = "/api/authentication/isloggedin/" + this.getSessionId();
    let getAuthTokenUrl = "/api/authentication/getauthtoken/" + this.getSessionId();
    this.redirectAfterLoginStateChange = (redirectStateName) => {
        $rootScope.$emit("RefreshMenu");
        if ($state.$current.name == redirectStateName) {
            $rootScope.$emit("UpdateActiveMenuItem", $state.$current);
        }
        $state.go(redirectStateName);
    };
    this.refreshMenuAfterLoginFailure = () => {
        $rootScope.$emit("RefreshMenu");
    };
    this.authenticateUser = (username, password, redirectState) => {
        let hashedUsername = sha512(username + this.authToken);
        let hashedPassword = sha512(password + this.authToken);
        let user = {username: hashedUsername, password: hashedPassword};

        return $http.post(loginUrl, user).then(() => {
            this.redirectAfterLoginStateChange(redirectState);
            $mdToast.show($mdToast.simple().textContent("Login successful."));
        }, () => {
            this.refreshMenuAfterLoginFailure();
            $mdToast.show($mdToast.simple().textContent("Login failed."));
        });
    };
    this.setAuthToken = (response) => {
        this.authToken = response.data;
    };
    $http.get(getAuthTokenUrl).then(this.setAuthToken);
    this.isLoggedIn = () => $http.get(isLoggedInUrl);
    this.logout = () => {
        $http.post(logoutUrl).then(() => this.redirectAfterLoginStateChange("home"));
        $mdToast.show($mdToast.simple().textContent("Logout successful."));
    };
};
angular.module("simon").service("authenticationService", authenticationService);
