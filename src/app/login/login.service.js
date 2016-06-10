(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('loginService', loginService);

	loginService.$inject = ['$q', 'sqliteService'];

	/* @ngInject */
	function loginService($q, sqliteService) {
		
		var service = {
			getStations: getStations,
			preload: preload, createTable: createTable,
            offlineLogin: offlineLogin
		};
		
		return service;

		////////////////

		function getStations() {
			var query = 'SELECT * FROM Stations';
			return $q.when(sqliteService.getItems(query));
		}
		
		function preload() {
			return $q.when(sqliteService.preloadDatabase(true));
		}
		
		function createTable() {
			var query = 'CREATE TABLE Stations(StationId ';
			query += 'integer primary key autoincrement,StationName text not null, StationLocation text);';
			query += 'INSERT INTO "Stations" ("StationId","StationName",';
			query += '"StationLocation") VALUES (1, "OOG Store", "Rack 1, Rack 2, Rack 3");';
			return $q.when(sqliteService.executeSQL(query)); 
		}
        
        function offlineLogin(username) {
            var query = 'INSERT INTO "Users" ("Username") VALUES ("' + username + '");';
            return $q.when(sqliteService.insert(query));
        }
	}
})();
