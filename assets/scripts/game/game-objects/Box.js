define([
    'game/game-objects/GameObjectBase'
], function (
    GameObjectBase
) {
    "use strict";

    var Box = function () {
        GameObjectBase.call(this);

        /////////////////////////////////////////
        // Put object-specific properties here //
        /////////////////////////////////////////
        
        this.width = 50;

        this.height = 50;

        this.depth = 50;


        ////////////////////////////////////
        // Put base class properties here //
        ////////////////////////////////////

        this.geometry = new THREE.CubeGeometry(this.width, this.height, this.depth);

        var restitution = 1.2;
        this.material = Physijs.createMaterial(
            new THREE.MeshPhongMaterial({ color: 0xFF0000 }),
            0.9, // friction
            restitution  // restitution
        );

        this.mesh = new Physijs.BoxMesh(this.geometry, this.material, 10);
        this.mesh.castShadow = true;
    };
    Box.prototype = new GameObjectBase();
    Box.prototype.constructor = Box;

    /**
     * Overwrite update function
     */
    Box.prototype.update = function () {

    };


    return Box;
});