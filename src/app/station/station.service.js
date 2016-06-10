(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationService', StationService);

	StationService.$inject = [
								'ApiService',
								'UserService',
                                'SessionService',
								'$q',
								'$timeout',
                                'sqliteService'
							];

	/* @ngInject */
	function StationService(ApiService,
							UserService,
                            SessionService,
							$q,
							$timeout,
                            sqliteService,
							$scope) {
		
		// Variable

		var service = {
			getStations: getStations,
            getOfflineStations: getOfflineStations,
			getMonitoredStations: getMonitoredStations,
			createParams: createParams,
			filterStoreStation: filterStoreStation,
		};

		return service;

		////////////////
		
		/**
		 * Get Stations
		 * filter store stations and 
		 * set as monitoredStations by default
		 * @returns {object} Promise
		 */
		function getStations() {

			var defer = $q.defer();

			ApiService.restCall('Stations', UserService.getUser().auth)
				.then(function (response) {
					// Filter & Set monitoredStation
					var storeStation = filterStoreStation(response.data);
					SessionService.setMonitoredStations(storeStation);
					defer.resolve(response.data);
				}, function (response) {
					console.log(response);
					defer.reject(response.data);
				});

			return defer.promise;
		}
        
        function getOfflineStations() {
            var query = 'SELECT * FROM Stations';
			return $q.when(sqliteService.getItems(query));
        }
		
		/**
		 * Filter store stations
		 * @param   {Array} stations 	all available stations
		 * @returns {Array} store stations
		 */
		function filterStoreStation(stations) {
			var storeStations = [];
			
			for (var key in stations) {
				if (key !== null) {
					if (stations[key].type === 'Store') {
						storeStations.push({'stationName': key});
					}
				}
			}
				
			return storeStations;
		}

		/**
		 * Get monitoredStations status
		 * @returns {object} Promise
		 */
		function getMonitoredStations() {
			var defer = $q.defer();

			ApiService.restCall('MonitoredStations', UserService.getUser().auth, '')
				.then(function (response) {
                    console.log(response);
					SessionService.setMonitoredStations(response.data);
					defer.resolve(response.data);
				}, function (response) {
					defer.reject(response.data);
				});

			return defer.promise;
		}
				
		/**
		 * Create Parameter for Getting the BagsToProcess
	     * @param   {string} currentStation    the selected station
		 * @param   {string} device            emulator / handheld
		 * @param   {Array}  monitoredStations list of monitoredStation by the user
		 * @returns {string} &station=[currentStation]&device=[device]&StoreStation[]=[monitoredStations]
		 */
		function createParams(currentStation, device, monitoredStations) {
			var _url = '&station=' + currentStation;
			_url += '&device=' + device;
	
			// Add storeStation
			for (var key in monitoredStations) {
				if (key !== null) {
					
					if (angular.isUndefined(monitoredStations[key].checked)) {
						_url += ('&StoreStation[]=' + monitoredStations[key].stationName);
					} else {
						if (monitoredStations[key].checked) {
							_url += ('&StoreStation[]=' + monitoredStations[key].stationName);
						}
					}					
				}
			}
						
			return _url;
		}
	
	}
})();
