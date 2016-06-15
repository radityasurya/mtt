(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('SyncService', SyncService);

	SyncService.$inject = [
								'ApiService',
								'UserService',
                                'SessionService',
								'$q',
								'$timeout',
                                'sqliteService'
							];

	/* @ngInject */
	function SyncService(ApiService,
							UserService,
                            SessionService,
							$q,
							$timeout,
                            sqliteService,
                            $scope) {
		
		// Variable

		var service = {
            getBagsToProcess: getBagsToProcess,
            getNumberOfRecords: getNumberOfRecords,
            insertTrackRecord: insertTrackRecord,
			deleteRecord: deleteRecord,
            getFirstItem: getFirstItem,
            uploadRecord: uploadRecord
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
                console.log(res);
                return res.rows.length;
			});
        
        }
        
        function getFirstItem() {
            var deferred = $q.defer();
            
            getBagsToProcess().then(function (response) {
                if (response.rows.length > 0) {
                    return deferred.resolve(response.rows.item(0));
                } else {
                    return deferred.reject('There is no item');
                }
            }, function (error) {
                return deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
		function deleteRecord(id) {
			console.log(id);
			var query = 'DELETE FROM BagsToProcess WHERE id = ' + id;
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
        
        function uploadRecord(trackRecord) {
            var defer = $q.defer();

			ApiService.restCall('TrackRecords', UserService.getUser().auth, trackRecord)
			.then(function (response) {
                console.log(response);
				defer.resolve(response.data);
			}, function (response) {
				console.log(response);
				defer.reject(response.data);
			});

			return defer.promise;
        }
	
	}
})();
