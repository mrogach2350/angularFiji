var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, $filter) {

    // Defines needed vars
    $scope.cart = [];
    $scope.subTotal = 0;
    $scope.cartShow = true;

    // Adds item to cart and changes subTotal
    $scope.addCart = function(){
      var prodName = this.product.name;
      var prodPrice = this.product.cost;
      $scope.cart.push({name : prodName, cost : prodPrice});
      $log.info($scope.cart);
      $scope.subTotal += prodPrice;
      this.product.inCart = !this.product.inCart;
    };

    // Removes items from cart and subtracts from subTotal
    $scope.deleteThis = function(){
      var prodName = this.product.name;
      var prodPrice = this.product.cost;
      var idx = $scope.cart.indexOf(prodName);
      $scope.cart.splice(idx,1);
      $scope.subTotal -= prodPrice
      this.product.inCart = !this.product.inCart;
    }

    // http call to retrieve API data
    $http({
      method: 'GET',
      url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js'
    }).then(function onSucess(res){
      $scope.title = res.data.pageTitle;
      $scope.subTitle = res.data.extraInfo;
      $scope.products = [];
      for (var i = 0; i < res.data.products.length; i++){
        var productName = res.data.products[i].name;
        var productCost = res.data.products[i].msrpInCents;
        var productImage = res.data.products[i].mainImage.ref;

        $scope.products.push({name : productName,
                              cost : productCost,
                              image : productImage,
                              inCart : true});
      }
    }, function onError(err){
      $log.error('There was a error and I got back ' + err);
    });

}]);
