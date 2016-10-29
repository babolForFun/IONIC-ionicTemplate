angular.module('appNameToSet.homeCtrl', [])
  .controller('homeCtrl', function($scope, $cordovaCamera, databaseSrv,utilsSrv) {

    $scope.open = function () {

      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,        // Change source if you need to pick the photo from the gallery
        allowEdit: true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 512,
        targetHeight: 512,
        saveToPhotoAlbum: true,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options)
        .then(
          function(imageData) {
            databaseSrv.saveBlobFile(imageData)
              .then(
                function (success) {
                  databaseSrv.getBase64Img()
                    .then(
                      function (success) { $scope.image64 = success; },
                      function (error)   { utilsSrv.displayErrorMessage("Promise","getBase64Img",error);}
                    )
                },
                function (error) { utilsSrv.displayErrorMessage("Promise","saveBlobFile",error); })
          },
          function (error) { utilsSrv.displayErrorMessage("Promise","getPicture",error);}
        )
      }
    }
  );
