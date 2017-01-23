let dependencies = ["$scope"];
let contactController = function ($scope) {
    $scope.myname = "simon";
};
contactController.$inject=dependencies;
angular.module("simon").controller("contactController", contactController);