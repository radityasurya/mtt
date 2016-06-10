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
            insertTrackRecord: insertTrackRecord
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
            
            var nr = 0;
    
            getBagsToProcess().then(function (res) {
               nr = res.rows.length;
            }, function (err) {
                console.log(err);
                nr = 0;
            });
            
            return nr;
        }
        
        function insertTrackRecord(trackRecord) {
            var query = 'INSERT INTO "BagsToProcess" ';
            query += '("LPN", "Username", "StationName") ';
            query += 'VALUES ("' + trackRecord.lpn + '", "' + trackRecord.username + '", '; 
            query += '"' + trackRecord.station + '")';
            return $q.when(sqliteService.insert(query));
        }
	
	}
})();
