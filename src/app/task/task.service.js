(function () {
	'use strict';

	angular
		.module('app.service')
		.service('TaskService', TaskService);

	TaskService.$inject = [
		'ApiService',
		'UserService',
        'SessionService',
		'$q'
	];

	/* @ngInject */
	function TaskService(ApiService,
						UserService,
                        SessionService,
						$q) {
		
		var service = {
			executeTask: executeTask,
		};
		
		return service;

		////////////////

		function executeTask(task, lpn, screeningResult) {
			
            console.log(lpn);
            
			var data = {
				'lpn': lpn,
				'isLpnScanned': 'false',
				'station': SessionService.getCurrentStation().stationName,
				'device': 'Emulator'
			};
			
			if (task === 'StoreBag') {
				console.log('StoreBag');
				data.storeLocation = 'PB Store 2';
			}
			
			if (task === 'ScreenBag') {
				console.log('ScreenBag');
				data.screeningProcess = 'ECAC';
				data.screeningResult = screeningResult;
			}
			
			console.log(data.lpn);
			
			data = angular.toJson(data);
			
			var defer = $q.defer();
			
			ApiService.restCall(task,
							UserService.getUser().auth, 
							data)
			.then(function (response) {
				defer.resolve(response);
			}, function (response) {
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
	}
})();
