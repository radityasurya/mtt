(function () {
	'use strict';

	angular
		.module('app.sync')
		.controller('SyncController', SyncController);

	SyncController.$inject = ['UserService',
										'StationService',
										'$ionicHistory',
										'$scope',
										'SessionService'];

	/* @ngInject */
	function SyncController(UserService,
		StationService,
		$ionicHistory,
		$scope,
		SessionService) {

		// Variable
		var vm = this;
		vm.currentStation = SessionService.getCurrentStation().stationName;
		vm.back = back;
		vm.selectAll = selectAll;
		vm.deselectAll = deselectAll;

		activate();

		////////////////

		function activate() {

			var monitoredStations = SessionService.getMonitoredStations();
			vm.storeStations = populateViews(monitoredStations);

		}

		function back() {

			// Check changes
			$scope.$watchCollection('vm.storeStations', function (newValue, oldValue) {
				SessionService.setMonitoredStations(newValue);
			});

			$ionicHistory.goBack();
		}

		function populateViews(monitoredStations) {

			var temp = [];

			for (var key in monitoredStations) {
				if (key !== null) {
					if (angular.isUndefined(monitoredStations[key].checked)) {
						temp.push({
							'stationName': monitoredStations[key].stationName,
							'checked': true
						});
					} else {
						temp.push({
							'stationName': monitoredStations[key].stationName,
							'checked': monitoredStations[key].checked
						});
					}
				}
			}

			return temp;
		}

		function selectAll() {
			angular.forEach(vm.storeStations, function (station) {
				station.checked = true;
			});
		}

		function deselectAll() {
			angular.forEach(vm.storeStations, function (station) {
				station.checked = false;
			});
		}
	}
})();
