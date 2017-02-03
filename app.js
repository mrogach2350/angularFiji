var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$log', function($scope, $http, $log) {

  $scope.products;

    $http({
      method: 'GET',
      url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js'
    }).then(function onSucess(res){
      $log.info('There was a Success! and I got back ');
      $scope.products = res.data.products;
    }, function onError(err){
      $log.error('There was a error and I got back ' + err);
    });

}]);
