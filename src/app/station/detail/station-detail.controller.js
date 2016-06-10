(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationDetailController', StationDetailController);

	StationDetailController.$inject = [
                                        '$scope',
										'$state',
										'$stateParams',
										'$timeout',
										'$ionicHistory',
										'$ionicPlatform',
                                        '$ionicPopup',
										'$cordovaBarcodeScanner',
                                        'StationDetailService',
                                        'SessionService'
									];

	/* @ngInject */
	function StationDetailController(
                                    $scope,
									$state,
									$stateParams,
									$timeout,
									$ionicHistory,
                                    $ionicPlatform,
                                    $ionicPopup,
									$cordovaBarcodeScanner,
                                    StationDetailService,
                                    SessionService) {
		
		// Variable
		var vm = this;
                                                                                
		SessionService.setCurrentStation($stateParams);
        
		vm.currentStation = $stateParams.stationName;
		vm.logout = logout;
		vm.monitor = monitor;
		vm.back = back;
		vm.scan = scan;
		vm.isExist = false;
		vm.setTaskDescription = setTaskDescription;
		vm.getIcon = getIcon;
		vm.bagsToProcess = null;
		vm.open = open;
        vm.execute = execute;

		////////////////

		function activate() {
			
			// Register Monitor
			StationDetailService.registerMonitor(SessionService.getMonitoredStations())
				.then(function (response) {
			}, function (response) {
				console.log(response);
			});

			// Get BagToProcess
			StationDetailService.getBagsToProcess(
				SessionService.getCurrentStation().stationName,
				'Emulator',
				SessionService.getMonitoredStations())
				.then(function (response) {
				if (angular.equals('', response)) {
					vm.isExist = false;
				} else if (angular.equals([], response)) {
					vm.isExist = false;
				}else { 
					vm.isExist = true;
				}

				vm.bagsToProcess = response;
				
			}, function (response) {
				console.log(response);
				vm.isExist = false;
			});

		}
        
        function execute(bag) {
            console.log(bag);
            StationDetailService.executeBag(bag.lpn)
            .then(function (response) {
                    activate();
                },
                function (error) {
                    console.log('error');
                });
		}
		
		$scope.$on('$ionicView.enter', function() {

			activate();
		});
		
		$ionicPlatform.on('volumeupbutton', function() {
			scan();
		});
		
		function back() {
			$state.go('station');
		}
		
		function monitor() {
			$state.go('station-monitor');
		}
		
		function open(lpn) {
			console.log(lpn);
			$state.go('bag', {'lpn': lpn});
		}
		
		function scan() {
			console.log('scan');

			document.addEventListener('deviceready', function () {
				$cordovaBarcodeScanner.scan().then(function (barcodeData) {
					
					if (barcodeData.text !== '') {
						$state.go('bag', {'lpn': barcodeData.text});
					}
					
				}, function (error) {
					vm.text = error;
				});

			});

		}

		function logout() {
			console.log('logout');

			var confirmPopup = $ionicPopup.confirm({
				title: 'Logout',
				template: 'Are you sure you want to logout?'
			});

			confirmPopup.then(function (res) {
				if (res) {
					SessionService.logout();
					$state.go('login');
					$timeout(function () {
						$ionicHistory.clearCache();
						$ionicHistory.clearHistory();
					}, 300);
				} else {
					console.log('do nothing');
				}
			});
		}
		
        function getTask(bagFromJSON) {
			var stationType = SessionService.getCurrentStation().stationType;
            
            console.log('The Station Type: ' + stationType);
            
            var tempTask = '';
			
			/*switch (stationType) {
				case 'Screening':
					if (BagService.canScreen(bagFromJSON)) {
						tempTask = 'Screen';
					} else {
						tempTask = 'ReadOnly';
					}
					break;
				case 'Store':
					if (BagService.canStore(bagFromJSON)) {
						tempTask = 'Store';
					} else {
						tempTask = 'ReadOnly';
					}
					break;
				case 'Stillage':
					if (BagService.canDeliver(bagFromJSON)) {
						tempTask = 'Deliver';
					} else {
						tempTask = 'ReadOnly';
					}
					break;
				default:
					tempTask = 'ReadOnly';
					break;	
			}
            */
            return tempTask;
            
		}
        
		function setTaskDescription(bag) {
						
			var _description = '';
			
			_description += bag.taskDescription;
			_description += getPrePosition(bag.taskDescription);
			_description += bag.taskDestinations;
						
			return _description;
		}
		
		function getIcon(taskDescription) {
			var icon = '';

			if (taskDescription !== null)
			{
				switch (taskDescription.toLowerCase())
				{
					case 'store':
						icon = 'Store.png';
						break;
					case 'screen':
						icon = 'Screening.png';
						break;
					case 'deliver':
						icon = 'Stillage.png';
						break;
					case 'release':
						icon = 'StationTypeRelease.png';
						break;
					default:
						icon = 'Store.png';
						break;
				}
			}

			return icon;
		}
		
		function getPrePosition(taskDescription)
		{
			var prePosition = '';

			if (taskDescription !== null)
			{
				switch (taskDescription.toLowerCase())
				{
					case 'store':
						prePosition = ' in ';
						break;
					case 'screen':
						prePosition = ' at ';
						break;
					case 'deliver':
						prePosition = ' to ';
						break;
					case 'release':
						prePosition = ' from ';
						break;
					default:
						prePosition = ' at ';
						break;
				}
			}

			return prePosition;
		}
	}
})();
