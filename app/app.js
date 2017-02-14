// TODO: toast handle errors, email failure, that kind of things...
let mymodule = angular.module("simon", ["ui.router", "ui.bootstrap", "ngMaterial", "ngAnimate", "ngAria"]);
mymodule.config(function ($locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode(true);
});
angular.element(() => angular.bootstrap(document, ["simon"]));