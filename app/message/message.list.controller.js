class MessageListController {
    constructor($http, $mdToast, authenticationService) {
        this.$http = $http;
        this.$mdToast = $mdToast;
        this.messageList = [];
        this.updateMessageList = this.updateMessageList.bind(this);
        $http.get(`/api/message/list/${ authenticationService.getSessionId() }`).then(this.updateMessageList);
    }

    updateMessageList(response) {
        this.messageList = response.data;
    }
}
angular.module("simon").controller("messageListController", MessageListController);