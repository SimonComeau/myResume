// TODO: rename to authentication service
// TODO: redirect toState if state is invalid instead of just home screen
let loginService = function ($http, $rootScope, $state) {
    let login = {};
    login.getSessionId = () => {
        if (sessionStorage.getItem("sessionId")) {
            return sessionStorage.getItem("sessionId");
        }
        let sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", sessionId);
        return sessionId;
    };
    let loginUrl = "/api/authentication/login/" + login.getSessionId();
    let logoutUrl = "/api/authentication/logout/" + login.getSessionId();
    let isLoggedInUrl = "/api/authentication/isloggedin/" + login.getSessionId();
    let getAuthTokenUrl = "/api/authentication/getauthtoken/" + login.getSessionId();
    login.goHomeAfterLoginStateChange = () => {
        $rootScope.$emit("RefreshMenu");
        $state.go("home");
        //TODO: toast for login state change
    };
    login.refreshMenuAfterLoginFailure = () => {
        $rootScope.$emit("RefreshMenu");
        //TODO: toast saying login failed
    };
    login.authenticateUser = (username, password) => {
        let hashedUsername = sha512(username + login.authToken);
        let hashedPassword = sha512(password + login.authToken);
        let user = {username: hashedUsername, password: hashedPassword};

        return $http.post(loginUrl, user).then(login.goHomeAfterLoginStateChange, login.refreshMenuAfterLoginFailure);
    };
    login.setAuthToken = (response) => {
        login.authToken = response.data;
    };
    $http.get(getAuthTokenUrl).then(login.setAuthToken);
    login.isLoggedIn = () => $http.get(isLoggedInUrl);
    login.logout = () => $http.post(logoutUrl).then(login.goHomeAfterLoginStateChange);
    return login;
};
angular.module("simon").factory("loginService", loginService);
