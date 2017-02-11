let contactDependencies = ["$scope", "$http"];
let contactController = function ($scope, $http) {
    $scope.contact = {};
    $scope.sendButton = function () {
        console.log("send button clicked", $scope.contactForm);
        if ($scope.contactForm.$valid) {
            $http.post("/api/contact", $scope.contact);
        }
    };
    $scope.clearButton = function () {
        $scope.contact = {};
        $scope.contactForm.$submitted = false;
        $scope.contactForm.$setPristine();
        $scope.contactForm.$setUntouched();
        console.log("clear button clicked");
    };
};
contactController.$inject = contactDependencies;
angular.module("simon").controller("contactController", contactController);