var db = null;

angular.module('appNameToSet', [

  'ionic',
  'ngCordova',
  
  'appNameToSet.appCtrl',
  'appNameToSet.homeCtrl',

  'appNameToSet.databaseSrv',
  'appNameToSet.httpRequestServices',
  'appNameToSet.utilsSrv'
])


  .run(function($ionicPlatform, databaseSrv) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      databaseSrv.initDatabase()
        .then(
          function (success) {
            console.log("Success DB");
          }
        )

    });
  })

  .constant("DatabaseParams",{

    "DatabaseName"      : "app.db",

    "SystemTable":"system",
      "SYS_ID":"_id",
      "SYS_LAST_SYS_UPDATE":"last_sys_update",

    "FileTable" : "file",
      "FILE_ID":"id",
      "FILE_BLOB_DATA":"data",
      "FILE_FILE_NAME":"file_name"

  })




    .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'appCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/home');
});
