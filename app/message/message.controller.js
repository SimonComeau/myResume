class MessageController {
    constructor($http, $mdToast) {
        this.$http = $http;
        this.$mdToast = $mdToast;
        this.contact = {};
    }

    displayToastForSubmitSuccess() {
        this.$mdToast.show(this.$mdToast.simple().textContent("Email has been sent successfully."));
    };

    setFormToUntouchedAndGreyOutSubmitBtn() {
        this.contact = {};
        this.form.$setPristine();
        this.form.$setUntouched();
    };

    handleMessageSubmitSuccess() {
        this.displayToastForSubmitSuccess();
        this.setFormToUntouchedAndGreyOutSubmitBtn();
    };

    checkForInvalid (field) {
        let formIsTouchedOrSubmitted = this.form.$submitted || field.$touched;
        return formIsTouchedOrSubmitted && field.$invalid;
    };

    sendButton() {
        if (this.form.$valid) {
            this.$http.post("/api/contact", this.contact).then(() => this.handleMessageSubmitSuccess());
        }
    };

    clearButton() {
        this.setFormToUntouchedAndGreyOutSubmitBtn();
        this.form.$submitted = false;
    };
}
angular.module("simon").controller("messageController", MessageController);