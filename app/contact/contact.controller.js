let contactDependencies = ["$scope"];
let contactController = function ($scope) {
    $scope.contact = {};
    $scope.sendButton = function () {
        console.log("send button clicked by: " + $scope.contact.name +" email address is: "
            + $scope.contact.email +" phone number is: "+ $scope.contact.phoneNumber + " message left: " + $scope.contact.message);
    };
    $scope.clearButton = function () {
        $scope.contact = {};
        console.log("clear button clicked");
    };
};
contactController.$inject=contactDependencies;
angular.module("simon").controller("contactController", contactController);