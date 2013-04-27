define([
    'game/game-objects/GameObjectBase'
], function (
    GameObjectBase
) {
    "use strict";

    var Ground = function () {
        GameObjectBase.call(this);

        this.geometry = new THREE.CubeGeometry(1000, 1, 1000);

        this.material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x0000FF }),
            0.9, // friction
            0.2  // restitution
        );

        this.mesh = new Physijs.BoxMesh(this.geometry, this.material, 0);
        this.mesh.receiveShadow = true;
    };
    Ground.prototype = new GameObjectBase();
    Ground.prototype.constructor = Ground;

    /**
     * Overwrite update function
     */
    Ground.prototype.update = function () {

    };


    return Ground;
});