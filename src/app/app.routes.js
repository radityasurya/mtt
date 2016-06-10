(function() {
    'use strict';

    angular
    .module('app')
    .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
			controller: 'LoginController as vm'
        })
        .state('station', {
			url: '/station',
			templateUrl: 'app/station/station.html',
			controller: 'StationController as vm'
		})
        .state('station-detail', {
			url: '/station/:stationName',
			params: {'stationName': undefined, 
				'stationType': undefined, 
				'locations': []},
			templateUrl: 'app/station/detail/station-detail.html',
			controller: 'StationDetailController as vm'
		})
        .state('station-monitor', {
			url: '/station/monitored',
			templateUrl: 'app/station/monitor/station-monitor.html',
			controller: 'StationMonitorController as vm'
		})
        .state('station-offline', {
			url: '/station/offline/:stationName',
            params: {'stationName': undefined},
			templateUrl: 'app/station/offline/station-offline.html',
			controller: 'StationOfflineController as vm'
		})
		.state('bag', {
			url: '/bag/:lpn',
			templateUrl: 'app/bag/bag.html',
			params: {'lpn': ''}, 
			controller: 'BagController as vm',
		});

        // Each tab has its own nav history stack which is defined in the corresponding module.

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    }

})();
