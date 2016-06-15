(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
								'$scope',
								'$state',
								'$ionicLoading',
								'$window',
                                'toaster',
                                'SessionService',
								'loginService',
								'$ionicPlatform',
                                'UserService',
                                '$ionicPopup',
                                '$rootScope'
                                ];

    /* @ngInject */
    function LoginController($scope,
        $state,
        $ionicLoading,
        $window,
        toaster,
        SessionService,
        loginService,
        $ionicPlatform,
        UserService,
        $ionicPopup,
        $rootScope) {

        // Variable
        var vm = this;
        vm.login = login;
        vm.box = setup(vm.height);
        vm.isOnline = true;
        vm.showLogin = false;
        vm.offline = offline;
        vm.checkRecords = checkRecords;

        activate();

        ////////////////

        function activate() {
            console.log('Fetching supported functions');
            // Fetch supportedFunctions from the server
            SessionService.fetchSupport()
                .then(function (data) { // Success
                    console.log(data);
                    toast('success', 'Loaded', 'SupportedFunctions successfully loaded!', 2000);
                }, function (data) { // Error
                    toast('error', 'Loading Error', 'Failed to load SupportedFunctions', 5000);
                });
        }

        // Toast Message
        function toast(type, title, text, timeout) {
            toaster.pop(type, title, text, timeout);
        }

        function login() {

            // Keyboard Hack
            if ($window.cordova &&
                $window.cordova.plugins) {
                cordova.plugins.Keyboard.close();
            }
            window.scrollTo(0, 0);

            if (vm.isOnline) {

                // Login function
                SessionService.login(vm.username, vm.password)
                    .then(function (data) { // Success
                        $state.go('station');
                        console.log(data);
                    }, function (data) { // Error
                        if (data.status === 0) {
                            toast('error', 'Connection Error', 'Not connected to the server', 5000);
                        } else if (data.status === 401) {
                            toast('error', 'Login Error', 'Wrong username or password', 5000);
                        }
                    });
            } else {
                offline();
            }

            vm.username = '';
            vm.password = '';
            vm.showLogin = false;
        }

        function checkRecords() {
            //check records
            $ionicPlatform.ready(function () {
                console.log('check records');
                loginService.checkRecords().then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Re-Sync',
                            template: 'Bag records found, resync the app?'
                        });

                        confirmPopup.then(function (res) {
                            if (res) {
                                $state.go('sync');
                            } else {
                                console.log('do nothing');
                            }
                        });
                    } else {
                        vm.showLogin = true;
                        vm.isOnline = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            });
        }

        // Responsive Setup
        function setup(height) {
            // calc height
            var temp = (height / 2) + 'px';

            if (height === 0) {
                return 305;
            }
            return temp;
        }

        function offline() {
            $ionicPlatform.ready(function () {
                loginService.offlineLogin(vm.username).then(function (res) {
                    SessionService.login(vm.username);
                    $state.go('station');
                }, function (err) {
                    console.log(err);
                });
            });
        }
        
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            SessionService.setOnlineStatus(true);
            vm.isOnline = true;
            // Check changes
			$scope.$watch('vm.isOnline', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    SessionService.setMode('online');
                }
            });
        });
            
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            SessionService.setOnlineStatus(false);
            vm.isOnline = false;
            $scope.$watch('vm.isOnline', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    SessionService.setMode('offline');
                }
            });
        });
    }
})();
