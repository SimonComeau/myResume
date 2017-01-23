let portfolioDependencies = ["$scope"];
let portfolioController = function ($scope) {
    $scope.myname = "simon";
};
portfolioController.$inject=portfolioDependencies;
angular.module("simon").controller("portfolioController", portfolioController);
