let contactController = function ($scope, $http, $mdToast) {
    let displayToastForSubmitSuccess = () => {
        $mdToast.show($mdToast.simple().textContent("Email has been sent successfully."));
    };
    let setFormToUntouchedAndGreyOutSubmitBtn = () => {
        $scope.contact = {};
        $scope.contactForm.$setPristine();
        $scope.contactForm.$setUntouched();
    };
    let handleMessageSubmitSuccess = () => {
        displayToastForSubmitSuccess();
        setFormToUntouchedAndGreyOutSubmitBtn();
    };
    $scope.checkForInvalid = (field) => {
        let formIsTouchedOrSubmitted = $scope.contactForm.$submitted || field.$touched;
        return formIsTouchedOrSubmitted && field.$invalid;
    };
    $scope.contact = {};
    $scope.sendButton = () => {
        if ($scope.contactForm.$valid) {
            $http.post("/api/contact", $scope.contact).then(handleMessageSubmitSuccess);
        }
    };
    $scope.clearButton = () => {
        setFormToUntouchedAndGreyOutSubmitBtn();
        $scope.contactForm.$submitted = false;
    };
};
angular.module("simon").controller("contactController", contactController);