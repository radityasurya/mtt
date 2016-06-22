(function () {
	'use strict';

	angular
		.module('app.service')
		.factory('SessionService', global);

	global.$inject = [
					'$http',
					'$q',
					'ApiService',
                    'UserService',
                    '$base64'
					];

	/* @ngInject */
	function global($http,
		$q,
		ApiService,
        UserService,
        $base64) {
        
        // variable
        var currentStation = {};
        var currentMonitoredStations = {};
        var isOnline = true;
        var appMode = 'online';
        
		var service = {
			fetchSupport: fetchSupport,
			login: login,
			logout: logout,
            setCurrentStation: setCurrentStation,
			getCurrentStation: getCurrentStation,
            setMonitoredStations: setMonitoredStations,
			getMonitoredStations: getMonitoredStations,
            setOnlineStatus: setOnlineStatus,
            getOnlineStatus: getOnlineStatus,
            setMode: setMode,
            getMode: getMode
		};

		return service;

		////////////////
		
		/**
		 * Fetching SupportedFunctions
		 * @returns {object} Promise
		 */
		function fetchSupport() {
			var defer = $q.defer();

			ApiService.supportedFunctions()
				.then(function (response) {
					defer.resolve(response);
				}, function (response) {
					defer.reject(response);
				});

			return defer.promise;
		}
		
		/**
		 * Login functionalities
		 * @param   {string} username 
		 * @param   {string} password 
		 * @param   {object} callback 
		 * @returns {object} Promise
		 */
		function login(username, password) {
			
			// Encode authorization data with base64
			var authdata = $base64.encode(username + ':' + password);
			var defer = $q.defer();

            if (appMode === 'online') {
    
                ApiService.restCall('Roles', authdata, '')
				.then(function (response) {
					UserService.setCredentials(username, authdata, response.data);
					defer.resolve(response.data);
				}, function (response) {
					defer.reject(response);
				});
                
            } else {
                UserService.setCredentials(username, authdata);
				defer.resolve('ok');
            }
			
			return defer.promise;

		}
		
		/**
		 * Logout, by login with wrong credentials
		 * ex: logout:logout
		 * @returns {object} Promise
		 */
		function logout() {
			var deferred = $q.defer();

			// Reset Credentials
			UserService.resetCredentials();

			ApiService.restCall('Roles', 'logout', '')
				.then(function (response) {
					deferred.resolve(response.data);
				}, function (response) {
					UserService.resetCredentials();
					deferred.reject(response);
				});

			return deferred.promise;
		}
        
        function setCurrentStation(station) {
			currentStation = station;
		}

		function getCurrentStation() {
			return currentStation;
		}
        
        function setMonitoredStations(monitoredStations) {
			currentMonitoredStations = monitoredStations;
		}

		function getMonitoredStations() {	
			return currentMonitoredStations;
		}
        
        function setOnlineStatus(status) {
            isOnline = status;
        }
        
        function getOnlineStatus() {
            return isOnline;
        }
        
        function setMode(mode) {
            appMode = mode;
        }
        
        function getMode() {
            return appMode;
        }

	}
})();
