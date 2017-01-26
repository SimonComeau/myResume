let contactDependencies = ["$scope", "$http"];
let contactController = function ($scope, $http) {
    $scope.contact = {};
    $scope.sendButton = function () {
        $http.post("http://localhost:3030/api/contact", $scope.contact);
    };
    $scope.clearButton = function () {
        $scope.contact = {};
        console.log("clear button clicked");
    };
};
contactController.$inject=contactDependencies;
angular.module("simon").controller("contactController", contactController);