var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, $filter) {

    $http({
      method: 'GET',
      url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js'
    }).then(function onSucess(res){
      $scope.title = res.data.pageTitle;
      $scope.subTitle = res.data.extraInfo;
      $scope.products = res.data.products;
    }, function onError(err){
      $log.error('There was a error and I got back ' + err);
    });


}]);
