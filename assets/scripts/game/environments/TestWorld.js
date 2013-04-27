define([
    'game/environments/EnvironmentBase',
    'game/game-objects/Box',
    'game/game-objects/Ground'
], function (
    EnvironmentBase,
    Box,
    Ground
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

        this.box = null;

        this.ground = null;
    };
    TestWorld.prototype = new EnvironmentBase();
    TestWorld.prototype.constructor = TestWorld;

    TestWorld.prototype.ready = function () {
        // Create lights
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
        directionalLight.position.y = 200;
        directionalLight.castShadow = true;
        this.game.scene.add(directionalLight);

        var ambientLight = new THREE.AmbientLight(0x333333);
        this.game.scene.add(ambientLight);

        // Create objects
        this.box = new Box();
        this.box.mesh.position.y = 200;
        var rotation = THREE.Math.degToRad(10);
        this.box.mesh.rotation.set(rotation, rotation, rotation);
        this.add(this.box);

        this.ground = new Ground();
        this.add(this.ground);
    };

    TestWorld.prototype.update = function () {
        this.game.camera.lookAt(this.box.mesh.position);
    };


    return TestWorld;
});