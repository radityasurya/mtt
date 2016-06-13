(function() {
    'use strict';

    angular
    .module('app', [
        /* Shared modules */
        'ionic',
        'ionic.closePopup',
        'app.core',
		'ngCordova',

        /* Feature areas */
        'app.login',
        'app.station',
        'app.bag',
		'app.sync'
    ]);
})();
