let authenticationService = function ($http, $rootScope, $state, $mdToast) {
    let authentication = {};
    authentication.getSessionId = () => {
        if (sessionStorage.getItem("sessionId")) {
            return sessionStorage.getItem("sessionId");
        }
        let sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", sessionId);
        return sessionId;
    };
    // TODO: use formatted strings template
    let loginUrl = "/api/authentication/login/" + authentication.getSessionId();
    let logoutUrl = "/api/authentication/logout/" + authentication.getSessionId();
    let isLoggedInUrl = "/api/authentication/isloggedin/" + authentication.getSessionId();
    let getAuthTokenUrl = "/api/authentication/getauthtoken/" + authentication.getSessionId();
    authentication.redirectAfterLoginStateChange = (redirectStateName) => {
        $rootScope.$emit("RefreshMenu");
        if ($state.$current.name == redirectStateName) {
            $rootScope.$emit("UpdateActiveMenuItem", $state.$current);
        }
        $state.go(redirectStateName);
    };
    authentication.refreshMenuAfterLoginFailure = () => {
        $rootScope.$emit("RefreshMenu");
    };
    authentication.authenticateUser = (username, password, redirectState) => {
        let hashedUsername = sha512(username + authentication.authToken);
        let hashedPassword = sha512(password + authentication.authToken);
        let user = {username: hashedUsername, password: hashedPassword};

        return $http.post(loginUrl, user).then(function(){
            authentication.redirectAfterLoginStateChange(redirectState);
            $mdToast.show($mdToast.simple().textContent("Login successful."));
        }, function (){
            authentication.refreshMenuAfterLoginFailure;
            $mdToast.show($mdToast.simple().textContent("Login failed."));
        });
    };
    authentication.setAuthToken = (response) => {
        authentication.authToken = response.data;
    };
    $http.get(getAuthTokenUrl).then(authentication.setAuthToken);
    authentication.isLoggedIn = () => $http.get(isLoggedInUrl);
    authentication.logout = () => {
        $http.post(logoutUrl).then(() => authentication.redirectAfterLoginStateChange("home"));
        $mdToast.show($mdToast.simple().textContent("Logout successful."));
    };
    return authentication;
};
angular.module("simon").factory("authenticationService", authenticationService);
