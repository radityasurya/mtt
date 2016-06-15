(function () {
    'use strict';

    angular
        .module('app.station')
        .controller('StationOfflineController', StationDetailController);

    StationDetailController.$inject = [
                                        '$scope',
										'$state',
										'$stateParams',
										'$ionicHistory',
                                        '$ionicPopup',
										'$ionicPlatform',
										'$cordovaBarcodeScanner',
                                        'StationOfflineService',
                                        'SessionService',
                                        'UserService',
                                        'toaster'
									];

    /* @ngInject */
    function StationDetailController(
        $scope,
        $state,
        $stateParams,
        $ionicHistory,
        $ionicPopup,
        $ionicPlatform,
        $cordovaBarcodeScanner,
        StationOfflineService,
        SessionService,
        UserService,
        toaster) {

        // Variable
        var vm = this;

        SessionService.setCurrentStation($stateParams);

        vm.currentStation = $stateParams.stationName;
        vm.logout = logout;
        vm.sync = sync;
        vm.back = back;
        vm.scan = scan;
        vm.isExist = false;
        vm.add = add;
        vm.records = [];
        vm.removeRecords = removeRecords;
        vm.bagsNr = 0;
        vm.date = new Date();

        ////////////////

        function activate() {
            console.log('activated');
            $ionicPlatform.ready(function () {
                vm.records = [];

                StationOfflineService.getBagsToProcess()
                    .then(function (response) {
                        console.log(response);
                        vm.bagsNr = response.rows.length;
                        if (response.rows.length > 0) {
                            vm.isExist = true;

                            for (var i = 0; i < response.rows.length; i++) {
                                vm.records.unshift(response.rows.item(i));
                            }

                        } else {
                            vm.isExist = false;
                            console.log('kosong');
                        }

                    }, function (error) {
                        console.log(error);
                    });

                if (StationOfflineService.getNumberOfRecords() > 0) {
                    // add add di database
                    vm.isExist = true;
                    console.log('ada isi');
                }
            });
        }
            
        // Toast Message
        function toast(type, title, text, timeout) {
            toaster.pop(type, title, text, timeout);
        }

        $scope.$on('$ionicView.enter', function () {

            activate();
        });

        $ionicPlatform.on('volumeupbutton', function () {
            scan();
        });

        function back() {
            $state.go('station');
        }

        function sync() {
            $state.go('sync');
        }

        function open(lpn) {
            console.log(lpn);
            $state.go('bag', {
                'lpn': lpn
            });
        }

        function removeRecords(lpn) {
            $ionicPlatform.ready(function () {
                StationOfflineService.deleteRecord(lpn)
                    .then(function (response) {
                        console.log('kehapus');
                        activate();
                    }, function (error) {
                        console.log(error);
                    });
            });
        }

        function scan() {
            console.log('scan');

            document.addEventListener('deviceready', function () {
                $cordovaBarcodeScanner.scan().then(function (barcodeData) {

                    if (barcodeData.text !== '') {
                        add(barcodeData.text);
                    }

                }, function (error) {
                    vm.text = error;
                });

            });

        }

        function add(lpn) {
            console.log(lpn);

            if (check(lpn)) {
                // check valid 10key
                var trackRecord = {
                    'lpn': lpn,
                    'username': UserService.getUser().username,
                    'isScanned': true,
                    'currentStation': SessionService.getCurrentStation().stationName
                };

                // check ada di database gak
                if (StationOfflineService.getNumberOfRecords() > 0) {
                    // add add di database
                    console.log(trackRecord);
                } else {
                    // add track
                    console.log(trackRecord);
                    StationOfflineService.insertTrackRecord(trackRecord).then(function (res) {
                        console.log(res);
                        activate();
                    }, function (err) {
                        console.log(err);
                    });
                }
            }

            vm.lpn = '';

        }

        function check(lpn) {
            if (lpn.length === 10) {
                return true;
            } else {
                toast('error', 'LPN is Invalid', 'LPN is not 10 characters!', 5000);
                return false;
            }
        }

        function logout() {
            console.log('logout');

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you want to logout?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $state.go('login');
                } else {
                    console.log('do nothing');
                }
            });
        }

    }
})();
