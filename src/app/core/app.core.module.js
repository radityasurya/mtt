(function() {
    'use strict';

    angular
    .module('app.core', [
        /* Angular modules */
		'ngCordova',
        'base64',
        'toaster',
		
        /* Cross-app module */
        // 'my.appModule',
        'app.service',

        /* 3rd party modules */
        // 'firebase'
    ]);
})();
