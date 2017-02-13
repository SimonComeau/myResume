let menuDependencies = ["$scope", "$http", "$state"];
let menuController = function ($scope, $http, $state) {
    $scope.menuItems = $state.get().filter(m => m.menuItem == true);
};
menuController.$inject=menuDependencies;
angular.module("simon").controller("menuController", menuController);
