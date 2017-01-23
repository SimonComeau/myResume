let dependencies = ["$scope"];
let portfolioController = function ($scope) {
    $scope.myname = "simon";
};
portfolioController.$inject=dependencies;
angular.module("simon").controller("portfolioController", portfolioController);
