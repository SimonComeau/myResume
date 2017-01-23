let contactDependencies = ["$scope"];
let contactController = function ($scope) {
    $scope.contact = {};
    $scope.sendButton = function () {
        console.log("send button clicked by " + $scope.contact.name);
    };
    $scope.clearButton = function () {
        $scope.contact = {};
        console.log("clear button clicked");
    };
};
contactController.$inject=contactDependencies;
angular.module("simon").controller("contactController", contactController);