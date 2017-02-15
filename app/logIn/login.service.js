// TODO: rename to authentication service
// TODO: redirect toState if state is invalid instead of just home screen
let loginService = function ($http, $rootScope, $state, $log) {
    var login = {};
    login.authenticateUser = function (username, password) {
        $log.log(password);
        scrypt_module_factory(function (scrypt) {
            var hashedPassword = scrypt.crypto_scrypt(scrypt.encode_utf8(password),
                scrypt.encode_utf8(username),
                16384, 8, 3, 128);
            $log.log(hashedPassword);
            var hashedUsername = scrypt.crypto_scrypt(scrypt.encode_utf8(username),
                scrypt.encode_utf8("RandomNumber"),
                16384, 8, 3, 128);
            $log.log(hashedUsername);
            return $http.post("/api/authentication/login", {
                username: hashedUsername,
                password: hashedPassword
            }).then(() => {
                $rootScope.$emit("RefreshMenu");
                $state.go("home");
                //TODO: toast for login success
            }, () => {
                $rootScope.$emit("RefreshMenu");
                //TODO: toast saying login failed
            });
        });
    };
    if (sessionStorage.getItem("sessionId")) {
        login.sessionId = sessionStorage.getItem("sessionId");
    } else {
        login.sessionId = Math.floor(Math.random() * 1000000);
        sessionStorage.setItem("sessionId", login.sessionId);
    }
    $http.get("/api/authentication/getauthtoken/" + login.sessionId).then((response) => {
        login.authToken = response.data;
        $log.log(login.authToken);
    });
    login.isLoggedIn = function () {
        return $http.get("/api/authentication/isloggedin");
    };
    login.logoff = function () {
        return $http.post("/api/authentication/logoff").then(() => {
            $rootScope.$emit("RefreshMenu");
            $state.go("home");
            //TODO: toast saying logoff success
        });
    };
    return login;
};
angular.module("simon").factory("loginService", loginService);
