let homeDependencies = ["$scope", "$http"];
let homeController = function ($scope, $http) {
};
homeController.$inject=homeDependencies;
angular.module("simon").controller("homeController", homeController);
