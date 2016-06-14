(function() {
    'use strict';

    angular
    .module('app.core', [
        /* Angular modules */
		'ngCordova',
        'base64',
        'toaster',
		'angular-svg-round-progressbar',
		
        /* Cross-app module */
        // 'my.appModule',
        'app.service',

        /* 3rd party modules */
        // 'firebase'
    ]);
})();
