require([
    'lib-thirdparty/ready', // Because there's no sense loading jQuery if all we use it for is the 'onready' callback
    'game/Game',
    'physijs'
], function (
    ready,
    Game
) {
    "use strict";

    Physijs.scripts.worker = 'assets/scripts/lib-thirdparty/physijs_worker.js';

    ready(function () {

        Game.init();

    });

});