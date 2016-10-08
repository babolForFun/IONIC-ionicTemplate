angular.module('appNameToSet.utilsSrv', [])
  .factory("utilsSrv", function($q, $cordovaFile) {

    return {

      base64ToUint8Array: function (base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
          uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
      },

      displayErrorMessage:    function(type, functionName, error) {
        console.error("Type: " + type + "\nFunction: " + functionName + "\nError: " + JSON.stringify(error));
      }

    }
  });
