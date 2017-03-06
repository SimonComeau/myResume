// TODO: rename to authentication service
// TODO: redirect toState if state is invalid instead of just home screen
let authenticationService = function ($http, $rootScope, $state) {
    let authentication = {};
    authentication.getSessionId = () => {
        if (sessionStorage.getItem("sessionId")) {
            return sessionStorage.getItem("sessionId");
        }
        let sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", sessionId);
        return sessionId;
    };
    let loginUrl = "/api/authentication/login/" + authentication.getSessionId();
    let logoutUrl = "/api/authentication/logout/" + authentication.getSessionId();
    let isLoggedInUrl = "/api/authentication/isloggedin/" + authentication.getSessionId();
    let getAuthTokenUrl = "/api/authentication/getauthtoken/" + authentication.getSessionId();
    authentication.goHomeAfterLoginStateChange = () => {
        $rootScope.$emit("RefreshMenu");
        $state.go("home");
        //TODO: toast for login state change
    };
    authentication.refreshMenuAfterLoginFailure = () => {
        $rootScope.$emit("RefreshMenu");
        //TODO: toast saying login failed
    };
    authentication.authenticateUser = (username, password) => {
        let hashedUsername = sha512(username + authentication.authToken);
        let hashedPassword = sha512(password + authentication.authToken);
        let user = {username: hashedUsername, password: hashedPassword};

        return $http.post(loginUrl, user).then(authentication.goHomeAfterLoginStateChange, authentication.refreshMenuAfterLoginFailure);
    };
    authentication.setAuthToken = (response) => {
        authentication.authToken = response.data;
    };
    $http.get(getAuthTokenUrl).then(authentication.setAuthToken);
    authentication.isLoggedIn = () => $http.get(isLoggedInUrl);
    authentication.logout = () => $http.post(logoutUrl).then(authentication.goHomeAfterLoginStateChange);
    return authentication;
};
angular.module("simon").factory("authenticationService", authenticationService);
