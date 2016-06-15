(function () {
    'use strict';

    angular
        .module('app.sync')
        .controller('SyncController', SyncController);

    SyncController.$inject = ['UserService',
										'StationService',
										'$ionicHistory',
										'$scope',
										'SessionService',
                                        'roundProgressService',
                                        '$timeout',
                                        '$window',
                                        '$ionicPlatform',
                                        'SyncService'];

    /* @ngInject */
    function SyncController(UserService,
        StationService,
        $ionicHistory,
        $scope,
        SessionService,
        roundProgressService,
        $timeout,
        $window,
        $ionicPlatform,
        SyncService) {

        // Variable
        var vm = this;
        vm.currentStation = SessionService.getCurrentStation().stationName;
        vm.back = back;
        vm.message = 'Uploading';

        $scope.current = 0;
        $scope.offset = 0;
        $scope.timerCurrent = 0;
        $scope.uploadCurrent = 0;
        $scope.stroke = 25;
        $scope.radius = 125;
        $scope.isSemi = false;
        $scope.rounded = false;
        $scope.responsive = false;
        $scope.clockwise = true;
        $scope.currentColor = '#2ecc71';
        $scope.bgColor = '#eaeaea';
        $scope.duration = 800;
        $scope.currentAnimation = 'easeOutCubic';
        $scope.animationDelay = 0;

        activate();

        ////////////////

        function activate() {
            console.log('start syncing');

            // get number of records
            $ionicPlatform.ready(function () {
                SyncService.getBagsToProcess()
                    .then(function (response) {
                        // get how many bag
                        vm.bagsNr = response.rows.length;

                        if (vm.bagsNr > 0) {
                            //sync
                            startSync();
                        } else {
                            vm.message = 'Complete';
                        }

                    }, function (error) {
                        console.log(error);
                    });
            });
        }

        function back() {

            $ionicHistory.goBack();
        }

        $scope.increment = function (amount) {
            $scope.current += (amount || 1);
        };

        $scope.decrement = function (amount) {
            $scope.current -= (amount || 1);
        };

        $scope.animations = [];

        angular.forEach(roundProgressService.animations, function (value, key) {
            $scope.animations.push(key);
        });

        $scope.getStyle = function () {
            var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

            return {
                'top': $scope.isSemi ? 'auto' : '50%',
                'bottom': $scope.isSemi ? '5%' : 'auto',
                'left': '50%',
                'transform': transform,
                '-moz-transform': transform,
                '-webkit-transform': transform,
                'font-size': $scope.radius / 3.5 + 'px',
                'color': 'black'
            };
        };

        $scope.getColor = function () {
            return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
        };

        $scope.showPreciseCurrent = function (amount) {
            $timeout(function () {
                if (amount <= 0) {
                    $scope.preciseCurrent = $scope.current;
                } else {
                    var math = $window.Math;
                    $scope.preciseCurrent = math.min(math.round(amount), $scope.max);
                }
            });
        };

        var getPadded = function (val) {
            return val < 10 ? ('0' + val) : val;
        };

        function startSync() {
            //check database ada record apa enggak?
            SyncService.getBagsToProcess()
                .then(function (response) {
                    // get how many bag     
                    console.log(response.rows.length);
                    if (response.rows.length > 0) {
                        //get record yang mau di sync
                        SyncService.getFirstItem().then(function (record) {
                            var _record = convertRecord(record);

                            SyncService.uploadRecord(_record).then(function (res) {
                                onSuccessSync(record.id);
                            }, function (err) {
                                console.log(err);
                                startSync();
                            });

                        });
                    } else {
                        vm.message = 'Complete';
                    }

                }, function (error) {
                    console.log(error);
                });

            //execute
            console.log('syncing');
        }

        function convertRecord(trackRecord) {
            var _record = {
                'device': 'Emulator',
                trackRecords: [{
                    'isLpnScanned': false,
                    'operatorId': trackRecord.Username,
                    'lpn': trackRecord.LPN,
                    'station': trackRecord.StationName
                }]
            };

            return _record;
        }

        function onSuccessSync(id) {
            //increase
            $scope.increment();

            //remove
            SyncService.deleteRecord(id);

            //restart sync
            startSync();
            console.log('success');
        }

    }
})();
