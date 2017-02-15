// TODO: toast for successful email delivery
// TODO: after submit of an email set form to untouched and grey out submit button until clear is clicked or form it touched
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
angular.module("simon").controller("contactController", contactController);