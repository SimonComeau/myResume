// TODO: toast handle errors, email failure, that kind of things...
class Settings {
    constructor($locationProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $locationProvider.html5Mode(true);
    }
}
let mymodule = angular.module("simon", ["ui.router", "ui.bootstrap", "ngMaterial", "ngAnimate", "ngAria"]);
mymodule.config(Settings);
angular.element(() => angular.bootstrap(document, ["simon"]));