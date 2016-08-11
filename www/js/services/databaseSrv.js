angular.module('appNameToSet.databaseSrv', [])
  .factory('databaseSrv', function($q, $cordovaSQLite, DatabaseParams) {


    return {


      initDatabase: function () {

        var deferred = $q.defer();

        db = $cordovaSQLite.openDB({name:DatabaseParams.DatabaseName,location: 1});

        $q.all([

          $cordovaSQLite.execute(db,"DROP TABLE IF EXISTS " +  DatabaseParams.SystemTable),
          $cordovaSQLite.execute(db,"DROP TABLE IF EXISTS " +  DatabaseParams.FileTable),

          $cordovaSQLite.execute(db,
            "CREATE TABLE IF NOT EXISTS " + DatabaseParams.SystemTable+
            "(" +
              DatabaseParams.SYS_ID                 + " INTEGER primary key, " +
              DatabaseParams.SYS_LAST_SYS_UPDATE    + " TEXT DEFAULT CURRENT_TIMESTAMP" +
            ")"
          ).then(
            function(success) {
              deferred.resolve();
            },
            function (error) {
              deferred.reject();
            }
          ),

          $cordovaSQLite.execute(db,
            "CREATE TABLE IF NOT EXISTS " + DatabaseParams.FileTable +
            "(" +
              DatabaseParams.FILE_ID        + " INTEGER primary key, " +
              DatabaseParams.FILE_BLOB_DATA + " BLOB, " +
              DatabaseParams.FILE_FILE_NAME + " TEXT" +
            ")"
          ).then(
            function(success) {
              deferred.resolve();
            },
            function (error) {
              deferred.reject();
            }
          )
        ]).then(
          function(success) {
            deferred.resolve();
          },
          function (error) {
            deferred.reject();
          }
        );

        return deferred.promise;

      },
      
      saveBlobFile: function(data){

        var defer = $q.defer();
        var query =
          "INSERT INTO " + DatabaseParams.FileTable +
          "(" +
            DatabaseParams.FILE_BLOB_DATA  + "," +
            DatabaseParams.FILE_FILE_NAME  +
          ") VALUES (?,?)";

        $cordovaSQLite.execute(db, query, [
            data,
            "PersonalPhoto"
        ])
          .then(
            function(success) {
              defer.resolve();
            },
            function (error) {
              defer.reject();
              utilsServices.displayErrorMessage("Database","saveBlobFile",error);
            });
        return defer.promise;
      },

      getBase64Img: function () {
        var deferred = $q.defer();
        var query =
          "SELECT * " +
          " FROM " + DatabaseParams.FileTable;
        
        $cordovaSQLite.execute(db, query, [])
          .then(
            function(res) {
              deferred.resolve(res.rows.item(0).data);
            }, 
            function (error) {
              deferred.reject();
              utilsServices.displayErrorMessage("Database","getBase64Img",error);
            }
          );
        return deferred.promise;

      }





    }
  });
