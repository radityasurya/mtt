(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['$ionicPlatform',
                        '$timeout',
                        '$cordovaSplashscreen',
                        '$rootScope',
                        '$ionicLoading',
						'sqliteService',
                        'SessionService'];

	function runBlock($ionicPlatform,
		$timeout,
		$cordovaSplashscreen,
		$rootScope,
		$ionicLoading,
		sqliteService,
        SessionService) {
		$ionicPlatform.ready(function () {

			// Splash Screen
			$timeout(function () {
				$cordovaSplashscreen.hide();
			}, 100);

			// Hide the accessory bar by default (remove this to show the accessory bar
			// above the keyboard for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleLightContent();
			}

			// Keyboard Fix
			window.addEventListener('native.keyboardhide', keyboardHideHandler);

			function keyboardHideHandler(e) {
				window.scrollTo(0, 0);
			}
			document.addEventListener('focusout', function (e) {
				window.scrollTo(0, 0);
			});

			// Loading
			$rootScope.$on('loading:show', function () {
				$ionicLoading.show({
					template: '<ion-spinner icon="lines" style="stroke: #F17B21; fill: #F17B21"/>',
					showBackdrop: true,
					duration: 5000
				});
			});

			$rootScope.$on('loading:hide', function () {
				$ionicLoading.hide();
			});

			//SQLite
			sqliteService.preloadDatabase(true);
            
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                SessionService.setOnlineStatus(true);
            });
            
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                SessionService.setOnlineStatus(false);
            });
            
		});
	}
})();
