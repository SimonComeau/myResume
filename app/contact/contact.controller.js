let contactDependencies = ["$scope", "$http"];
let contactController = function ($scope, $http) {
    $scope.contact = {};
    $scope.sendButton = function () {
        if ($scope.contactForm.$valid) {
            $http.post("/api/contact", $scope.contact);
        }
    };
    $scope.clearButton = function () {
        $scope.contact = {};
        $scope.contactForm.$submitted = false;
        $scope.contactForm.$setPristine();
        $scope.contactForm.$setUntouched();
    };
};
contactController.$inject = contactDependencies;
angular.module("simon").controller("contactController", contactController);