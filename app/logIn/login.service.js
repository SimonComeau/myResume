let loginServiceDependencies = ["$http", "$log"];
let loginService = function ($http, $log) {
    var login = {};
    login.isLoggedIn = false;
    return login;
};
loginService.$inject = loginServiceDependencies;
angular.module("simon").factory("loginService", loginService);
