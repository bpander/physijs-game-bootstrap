define([
], function (
) {
    "use strict";

    var EnvironmentBase = function (game) {

        this.game = game;

        this.assets = [];

        this.gameObjects = [];

    };


    ////////////////////////////////////
    // ENVIRONMENT-SPECIFIC FUNCTIONS //
    ////////////////////////////////////

    EnvironmentBase.prototype.ready = function () {
        throw new Error('No ready function implemented');
    };

    EnvironmentBase.prototype.update = function () {
        throw new Error('No update function implemented');
    };


    ////////////////////////////////
    // COMMON ENVIRONMENT METHODS //
    ////////////////////////////////

    EnvironmentBase.prototype.load = function (onLoadFn) {
        // TODO: loading algorithm
        this.ready();
        if (onLoadFn instanceof Function) {
            onLoadFn();
        }
    };

    EnvironmentBase.prototype.updateObjects = function () {
        // Run all the game objects' update functions
        var i = 0;
        var l = this.gameObjects.length;
        for (; i !== l; i++) {
            this.gameObjects[i].update();
        }
    };

    EnvironmentBase.prototype.add = function (gameObject) {
        this.gameObjects.push(gameObject);
        this.game.scene.add(gameObject.mesh);
    };

    EnvironmentBase.prototype.remove = function (gameObject) {
        var indexToRemove = this.gameObjects.indexOf(gameObject);
        this.gameObjects.splice(indexToRemove, 1);
    };


    return EnvironmentBase;
});