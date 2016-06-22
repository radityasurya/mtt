(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationDetailService', StationDetailService);

	StationDetailService.$inject = [
								'ApiService',
								'UserService',
                                'SessionService',
                                'BagService',
                                'TaskService',
								'$q',
								'$timeout'
							];

	/* @ngInject */
	function StationDetailService(ApiService,
							UserService,
                            SessionService,
                            BagService,
                            TaskService,
							$q,
							$timeout,
							$scope) {
		
		// Variable

		var service = {
			getBagsToProcess: getBagsToProcess,
            createParams: createParams,
			registerMonitor: registerMonitor,
            executeBag: executeBag
		};

		return service;

		////////////////
				
		/**
		 * Get Bags To Process lists
		 * @param   {string} currentStation    the selected station
		 * @param   {string} device            emulator / handheld
		 * @param   {Array}  monitoredStations list of monitoredStation by the user
		 * @returns {object} Promise
		 */
		function getBagsToProcess(currentStation, device, monitoredStations) {
			var defer = $q.defer();

			ApiService.restCall('BagsToProcess',
					UserService.getUser().auth,
					createParams(currentStation, device, monitoredStations))
				.then(function (response) {
					defer.resolve(response.data);
				}, function (response) {
					console.log(response);
					defer.reject(response.data);
				});

			return defer.promise;
		}
		
		/**
		 * Register selected station to monitor
		 * @param   {Array}  monitoredStations 
		 * @returns {object} Promise
		 */
		function registerMonitor(monitoredStations) {
						
			var temp = [];

			for (var key in monitoredStations) {
				if (key !== null) {
					if (angular.isUndefined(monitoredStations[key].checked)) {
						temp.push(monitoredStations[key].stationName);
					} else {
						if (monitoredStations[key].checked) {
							temp.push(monitoredStations[key].stationName);
						}
					}
				}
			}

			var monitored = {};
			monitored['station'] = temp;

			var defer = $q.defer();

			ApiService.restCall('RegisterMonitor',
					UserService.getUser().auth,
					monitored)
				.then(function (response) {
					defer.resolve(response);
				}, function (response) {
					defer.reject(response.data);
				});

			return defer.promise;
		}
        
        function executeBag(lpn) {
            var defer = $q.defer();
            console.log(lpn);
            TaskService.executeTask('ReleaseBag', lpn)
                .then(function (response) {
					defer.resolve(response);
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
			var _url = 'station=' + currentStation;
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
