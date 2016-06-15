(function () {
    'use strict';

    angular
        .module('app.station')
        .controller('StationController', StationController);

    StationController.$inject = [
								'$timeout',
								'$scope',
                                '$state',
								'$ionicHistory',
                                '$ionicPopup',
								'$cordovaBarcodeScanner',
                                'StationService',
                                'UserService',
                                'SessionService',
                                '$ionicPlatform'
								];

    /* @ngInject */
    function StationController(
        $timeout,
        $scope,
        $state,
        $ionicHistory,
        $ionicPopup,
        $cordovaBarcodeScanner,
        StationService,
        UserService,
        SessionService,
        $ionicPlatform
    ) {

        // Variable
        var vm = this;
        vm.back = back;
        vm.scan = scan;
        vm.logout = logout;
        vm.stations = [];
        vm.type = 'Screening';
        vm.filterStations = filterStations;
        vm.isCurrentStationExist = false;
        vm.check = isCurrentStationExist;
        vm.isOnline = SessionService.getOnlineStatus();
        vm.populateOfflineView = populateOfflineView;
            
        // activate();

        ////////////////

        function activate() {

            vm.isOnline = SessionService.getOnlineStatus();

            if (vm.isOnline) {
                // Online
                populateView();
            } else {
                // Offline
                
                var _stations = [];
                
                $ionicPlatform.ready(function () {
                    StationService.getOfflineStations().then(function (res) {
                        
                       /* for (var i = 0; i < res.length; i++) { 
                            var key = res[i].StationName;
                            var type = res[i].StationType;
                            var location = res[i].StationLocation;
                            
                            _stations[key] = {'type': type, 'location': location}
                        }*/
                        
                        vm.offlineStations = angular.copy(res);
                    }, function (err) {
                        console.log(err);
                    });
                });

            }

            vm.username = UserService.getUser().username;

        }

        function populateView() {
            // Populate Station Views
            StationService.getStations().then(function (data) {
                vm.stations = data;
                console.log(data);
            }, function (response) { // Error
                console.log(response);
            });
        }

        $scope.$on('$ionicView.enter', function () {
            activate();
        });
        
        function populateOfflineView() {
            console.log(vm.stations);
        }

        function scan() {
            console.log('scan');

            document.addEventListener('deviceready', function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        alert(barcodeData.text + '\n' + barcodeData.format);
                    }, function (error) {
                        vm.text = error;
                    });

            });

        }

        function back() {
            var stationName = SessionService.getCurrentStation().stationName;
            var stationType = SessionService.getCurrentStation().stationType;
            var stationLocations = SessionService.getCurrentStation().locations;

            $state.go('station-detail', {
                'stationName': stationName,
                'stationType': stationType,
                'locations': stationLocations
            });
        }

        function isCurrentStationExist(station) {
            if (station === 'default') {
                return false;
            } else {
                return true;
            }
        }

        function filterStations(type) {
            var result = {};
                    
            angular.forEach(vm.stations, function (value, key) {
                if (value.type === type) {
                    result[key] = value;
                }
            });
            
            return result;
        }

        function logout() {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you want to logout?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    SessionService.logout();
                    $state.go('login');
                }
            });
        }
    }
})();
