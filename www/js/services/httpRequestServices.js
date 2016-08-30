angular.module('appNameToSet.httpRequestServices', [])
  .factory("httpRequestServices", function($http, $q) {

    return {

      // POST REQUEST
      postRequest: function (url, headers, data) {
        var request = {
          method    : "POST",
          url       : url,
          headers   : headers,
          data      : data
        };
        var deferred = $q.defer();

        $http(request)
          .then(
            function(response){
              deferred.resolve(response);
            },
            function (error) {
              deferred.reject(error);
            }
          );
        return deferred.promise;
      },

      // GET REQUEST
      getRequest: function(url,headers){
        var deferred = $q.defer();
        var request = {
          method    : "GET",
          url       : url,
          headers   : headers
        };
        $http(request)
          .then(
            function(response){
              deferred.resolve(response);
            },
            function (error) {
              deferred.reject(error);
            }
          );
        return deferred.promise;
      }

    }
  })
