(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('ApiService', ApiService);
	
	ApiService.$inject = ['$http', '$q'];

	/* @ngInject */
	function ApiService($http, $q) {
		
		// Variable
		// var _baseUrl = 'http://172.19.18.225';
        // var _baseUrl = 'http://192.168.192.26';
		var _baseUrl = 'http://172.28.30.59';
		var _supportedFunction = {};
		var _timeout = 5000;
				
		var service = {
			getURL: getURL,
			getURI: getURI,
			getMethod: getMethod,
			supportedFunctions: supportedFunctions,
			getTimeout: getTimeout,
			setTimeout: setTimeout,
			setSupportedFunctions: setSupportedFunctions,
			getSupportedFunctions: getSupportedFunctions,
			restCall: restCall
		};

		return service;

		////////////////
		
		function getURL() {
			return _baseUrl;
		}
				
		function getTimeout() {
			return _timeout;
		}
		
		function setTimeout(t) {
			_timeout = t;
		}
		
		/**
		 * Retrieve supportedFunctions
		 * @returns {object} promise
		 */
		function supportedFunctions() {
			var defer = $q.defer();
			
			$http.get(_baseUrl + '/mttws/public/meta/SupportedFunctions')
			.then(function (response) {
				defer.resolve(response.data);
				setSupportedFunctions(response.data);
			}, function (response) {
				defer.reject(response);
			});
			
			return defer.promise;
		}
		
		// Set supportedFunctions
		function setSupportedFunctions(supportedFunctions) {
			_supportedFunction = supportedFunctions;
		}
		
		// Get supportedFunctions 
		function getSupportedFunctions() {
			return _supportedFunction;
		}

		/**
		 * Get URI Name from supportedFunction
		 * @param   {string} name	Name of the supportedFunctions
		 * @returns {string} baseUrl + selectedURI: host/mttws/[selectedURI]
		 */
		function getURI(name) {
			
			var URI = '';
						
			angular.forEach(_supportedFunction, function(value, key) {
				if (key === name) {
					URI = value.uri;
				}
			});
			
			return _baseUrl + URI;
		}
		
		/**
		 * Get HTTP Method of selected supportedFunction
		 * @param   {string} name	name of the supported functions
		 * @returns {string} HTTP Method: GET, POST, PUT, DELETE
		 */
		function getMethod(name) {
			var method = '';

			angular.forEach(_supportedFunction, function(value, key) {
				if (key === name) {
					method = value.method;
				}
			});

			return method;
		}
		
		/**
		 * RESTCall functions
		 * @param   {string} name   Name of the supportedFunctions
		 * @param   {string} auth   Basic Authorization encoded with base64
		 * @param   {object} params Optional: for parameter or object to pass
		 * @returns {object} Promise
		 */
		function restCall(name, auth, params) {
			
			if (angular.isUndefined(params)) {
				params = '';
			}
			
			var _url = getURI(name) + '?auth=' + auth;
			var _method = getMethod(name);
						
			if (_method === 'GET') {
				_url += params;
				console.log(_url);

				return $http.get(_url);
			}
			
			if (_method === 'POST') {
				console.log(params);
				console.log(_url);
				return $http({
					url: _url,
					method: 'POST',
					data: params,
					headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Accept-Language': 'en-GB'
							}
				});
			}
			
			if (_method === 'PUT') {
				return $http({
					url: _url,
					method: 'PUT',
					data: params,
					headers: {'Content-Type' : 'application/json'}
				});
			}
			
		}

	}
})();
