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
        UserService) {

        // Variable
        var vm = this;
        vm.login = login;
        vm.box = setup(vm.height);
		vm.isOnline = true;
		vm.showLogin = false;
		vm.offline = offline;

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
    }
})();
