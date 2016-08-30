angular.module('appNameToSet.httpCtrl', [])
    .controller('httpCtrl', function($scope,$ionicModal, $timeout) {



        $scope.doRequestPost = function () {

            var url = 'http://httpbin.org/post';
            var header = {
                'Content-Type': 'text/html'
            };
            var data = {
                name: 'Gabriele',
                surname: 'Bonadiman',
                age: 28
            };

            httpRequestServices.postRequest(url, header, data)
                .then(
                    function (success) {
                        console.log("Post success");
                    },
                    function (error) {
                        console.log("Post error");
                    }
                )
        }

    });
