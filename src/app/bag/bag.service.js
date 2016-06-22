(function () {
	'use strict';
	angular
		.module('app.bag')
		.factory('BagService', BagService);

	BagService.$inject = [
		'ApiService',
		'UserService',
		'$q',
		'$timeout'
	];

	/* @ngInject */
	function BagService(ApiService,
							UserService,
							$q,
							$timeout,
							$scope) {

		// Variable
		var supportedFunctions = ApiService.getSupportedFunctions();
		var roles = UserService.getRoles();
		var service = {
			getBag: getBag,
			createParams: createParams,
			canRelease: canRelease,
			canScreen: canScreen,
			canStore: canStore,
			canDeliver: canDeliver
		};

		return service;

		////////////////
		
		/**
		 * Get bag function
		 * @param   {string} lpn            License Plate Number 
		 * @param   {string} currentStation current selected stations
		 * @returns {object} promise
		 */
		function getBag(lpn, currentStation) {
			var defer = $q.defer();

			ApiService.restCall('Bag', UserService.getUser().auth, createParams(lpn, currentStation))
			.then(function (response) {
				defer.resolve(response.data);
			}, function (response) {
				console.log(response);
				defer.reject(response.data);
			});

			return defer.promise;
		}
		
		/**
		 * create the parameters
		 * @param   {string} lpn            License Plate Number
		 * @param   {string} currentStation current selected stations
		 * @returns {string} constructed URL (LPN+STATION+ISSCANNED+FORCECREATE)
		 */
		function createParams(lpn, currentStation) {
			var _url = 'lpn=' + lpn;
			_url += '&station=' + currentStation;
			_url += '&isLpnScanned=false&forceCreate=false&device=emulator'; 
			
			return _url;
		}
		
		function canRelease(bag) {
			
			if ('ReleaseBag' in supportedFunctions) {
				//console.log('ada di supported functions');
				if (bag.registrationStatus === 'REGISTERED_IN_MTT') {
					//console.log(supportedFunctions['ReleaseBag'].allowedRoles);	
					if (supportedFunctions['ReleaseBag'].allowedRoles in roles) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
			
		}
		
		function canScreen(bag) {
			if ('ScreenBag' in supportedFunctions) {
				//console.log('ada di supported functions');
				if (supportedFunctions['ScreenBag'].allowedRoles in roles) {
					if (bag.registrationStatus === 'NOT_REGISTERED') {
						return true;
					} else if (bag.registrationStatus === 'REGISTERED_IN_MTT') {
						return false;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		
		function canStore(bag) {
            console.log(bag);
            console.log('can store');
            
			if ('StoreBag' in supportedFunctions) {
				console.log('ada di supported functions');
				if (supportedFunctions['StoreBag'].allowedRoles in roles) {
				console.log('ada di roles');
                    console.log(bag.registrationStatus);
                    if (bag.registrationStatus === 'NOT_REGISTERED') {
						return true;
					} else if (bag.registrationStatus === 'REGISTERED_IN_MTT') {
						return false;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		
		function canDeliver(bag) {
			if ('DeliverBag' in supportedFunctions) {
				if (supportedFunctions['DeliverBag'].allowedRoles in roles) {
					if (bag.registrationStatus === 'NOT_REGISTERED') {
						return true;
					} else if (bag.registrationStatus === 'REGISTERED_IN_MTT') {
						return false;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		
	}
})();
