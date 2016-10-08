angular.module('appNameToSet.httpCtrl', [])
  .controller('httpCtrl', function($scope, httpRequestServices, utilsSrv) {

    $scope.doRequestPost = function () {

      var url = 'http://httpbin.org/post';
      var header = {
        'Content-Type': 'text/html'
      };
      var data = {
        name:    'Name',
        surname: 'Surname',
        age: 28
      };

      httpRequestServices.postRequest(url, header, data)
          .then(
              function (response) { $scope.response = response.data.data; },
              function (error)    { utilsSrv.displayErrorMessage("HTTP","postRequest",error) }
          )
    };

    $scope.doRequestGet = function () {

      var url = 'http://httpbin.org/get';
      var header = {
        'Content-Type': 'text/html'
      };

      httpRequestServices.getRequest(url, header)
          .then(
              function (response) { $scope.response = JSON.stringify(response.data); },
              function (error)    { utilsSrv.displayErrorMessage("HTTP","getRequest",error) }
          )
    }





  });
