(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('StationOfflineService', StationOfflineService);

	StationOfflineService.$inject = [
								'ApiService',
								'UserService',
                                'SessionService',
								'$q',
								'$timeout',
                                'sqliteService'
							];

	/* @ngInject */
	function StationOfflineService(ApiService,
							UserService,
                            SessionService,
							$q,
							$timeout,
                            sqliteService,
                            $scope) {
		
		// Variable

		var service = {
			offlineLogin: offlineLogin,
            getBagsToProcess: getBagsToProcess,
            getNumberOfRecords: getNumberOfRecords,
            insertTrackRecord: insertTrackRecord,
			deleteRecord: deleteRecord
		};

		return service;

		////////////////
		
        function offlineLogin(username) {
            var query = 'INSERT INTO "Users" ("Username") VALUES ("' + username + '");';
            return $q.when(sqliteService.insert(query));
        }
        
        function getBagsToProcess() {
            var query = 'SELECT * FROM BagsToProcess';
            return $q.when(sqliteService.insert(query));
        }
        
        function getNumberOfRecords() {
            
            getBagsToProcess().then(function (res) {
            return res.rows.length;
			});
        
        }
        
		function deleteRecord(lpn) {
			console.log(lpn);
			var query = 'DELETE FROM BagsToProcess WHERE LPN = ' + lpn;
			console.log(query);
			return $q.when(sqliteService.insert(query));
		}
		
        function insertTrackRecord(trackRecord) {
            var query = 'INSERT INTO "BagsToProcess" ';
            query += '("LPN", "Username", "StationName") ';
            query += 'VALUES ("' + trackRecord.lpn + '", "' + trackRecord.username + '", '; 
			query += '"' + trackRecord.currentStation + '")';
            return $q.when(sqliteService.insert(query));
        }
	
	}
})();
