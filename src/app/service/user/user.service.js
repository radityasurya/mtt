(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('UserService', UserService);

	UserService.$inject = ['$http', '$q'];

	/* @ngInject */
	function UserService($http, $q) {

		// Variable		
		var _user = {
			username: '',
			auth: '',
			isLoggedIn: false,
			roles: {}
		};
        
        var _isOnline = true;
		
		var service = {
            setCredentials: setCredentials,
			resetCredentials: resetCredentials,
			createUser: createUser,
			getUser: getUser,
			setRoles: setRoles,
			getRoles: getRoles,
		};

		return service;

		////////////////
        
        /**
		 * Setting credentials
		 * @param {string} username 
		 * @param {string} authdata encrypted password with base64
		 * @param {Array}  roles    roles of the user
		 */
		function setCredentials(username, authdata, roles) {
			createUser(username, authdata);
			setRoles(roles);
		}
        
		/**
		 * Create new User object
		 * @param {string} uname Username
		 * @param {sting}  auth  Basic Authentication data
		 */
		function createUser(uname, auth) {
			_user.username = uname;
			_user.auth = auth;
			_user.isLoggedIn = true;
		}

		function getUser() {
			return _user;
		}

		function resetCredentials() {
			_user.username = '';
			_user.auth = '';
			_user.isLoggedIn = false;
			_user.roles = {};
		}

		function setRoles(rolesFromJson) {
			_user.roles = angular.copy(rolesFromJson);
		}

		function getRoles() {
			return _user.roles;
		}

	}
})();
