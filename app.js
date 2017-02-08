var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, $filter) {

    $scope.cart = [];
    $scope.subTotal = 0;
    $scope.cartShow = true;

    $scope.addCart = function(){
      var prodName = this.product.name;
      if ($scope.cart.indexOf(prodName) === -1){
        $scope.cart.push(prodName);
        $scope.subTotal += this.product.msrpInCents;
      }
      $log.info($scope.cart);
    };

    $scope.showCart = function(){
      $scope.cartShow = !$scope.cartShow;
    }

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
