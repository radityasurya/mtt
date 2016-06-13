// jshint ignore:start
/*ignore jslint start*/
//jscs:disable

(function () {
    'use strict';
    angular
        .module('app.service')
        .factory('sqliteService', sqliteService);

    sqliteService.$inject = ['$q', '$cordovaSQLite'];

    /* @ngInject */
    function sqliteService($q, $cordovaSQLite) {

        var self = this;
        var _db;

        var _queries = [

			'DROP TABLE IF EXISTS Users;',
			'DROP TABLE IF EXISTS Stations;',
			
			'CREATE TABLE Users (id integer primary key autoincrement, Username text not null);',
			'CREATE TABLE Stations(id integer primary key autoincrement,StationName text not null, StationType text not null, StationLocation text);',
			'CREATE TABLE IF NOT EXISTS BagsToProcess(id integer primary key autoincrement, LPN integer not null, Username text not null, StationName text not null);',

			'INSERT INTO "Stations" ("id","StationName", "StationType", "StationLocation") VALUES (1, "OOG Store", "Store","Rack 1, Rack 2, Rack 3");',
			'INSERT INTO "Stations" ("id","StationName", "StationType", "StationLocation") VALUES (2, "HBS North", "Screening", NULL);',
			'INSERT INTO "Stations" ("id","StationName", "StationType", "StationLocation") VALUES (3, "Lateral 1", "Stillage", NULL);',

		];

        var service = {
            db: db,
            getItems: getItems,
            preloadDatabase: preloadDatabase,
            insert: insert,
            executeSQL: executeSQL
        };

        return service;

        ////////////////

        function db() {
            if (!_db) {
                if (window.cordova) {
                    _db = $cordovaSQLite.openDB({
                        name: 'demo.db',
                        location: 1,
                    });
                } else {
                    if (window.sqlitePlugin !== undefined) {
                        //www/demo.db is a file created with SqliteBrowser tool :)
                        _db = window.sqlitePlugin.openDatabase({
                            name: "demo.db",
                            location: 2,
                            createFromLocation: 1
                        });
                    } else {
                        // For debugging in the browser
                        _db = window.openDatabase("demo.db", "1.0", "Demo", 200000);
                    }
                }

            }
            return _db;
        }

        function getItems(query, parameters) {
            var deferred = $q.defer();
            executeSQL(query, parameters).then(function (res) {
                var items = [];
                for (var i = 0; i < res.rows.length; i++) {
                    items.push(res.rows.item(i));
                }
                return deferred.resolve(items);
            }, function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        }

        function preloadDatabase(enableLog) {
            var deferred = $q.defer();
            enableLog && console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
            db().transaction(function () {
                for (var i = 0; i < _queries.length; i++) {
                    console.log(_queries[i]);
                    executeSQL(_queries[i]);
                }
            }, function (error) {
                deferred.reject(error);
            }, function () {
                enableLog && console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
                deferred.resolve('OK');
            });

            return deferred.promise;
        }
        
        function insert(query, parameters) {
            var deferred = $q.defer();
            executeSQL(query, parameters).then(function (res) {
                return deferred.resolve(res);
            }, function (err) {
                return deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function executeSQL(query, parameters) {
            return $cordovaSQLite.execute(db(), query, parameters);
        }
    }
})();
