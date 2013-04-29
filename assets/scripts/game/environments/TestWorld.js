define([
    'game/environments/EnvironmentBase',
    'game/Input',
    'game/game-objects/Ball',
    'game/game-objects/Arena'
], function (
    EnvironmentBase,
    Input,
    Ball,
    Arena
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

        this.ball = null;

        this.ground = null;

        this.relativeRotation = 0;
    };
    TestWorld.prototype = new EnvironmentBase();
    TestWorld.prototype.constructor = TestWorld;

    TestWorld.prototype.ready = function () {
        this.game.camera.position.set(0, 100, 200);

        // Create lights
        var ambientLight = new THREE.AmbientLight(0xAAAAAA);
        this.game.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        directionalLight.position.y = 200;
        directionalLight.castShadow = true;
        directionalLight.shadowMapWidth = 2048;
        directionalLight.shadowMapHeight = 2048;
        this.game.scene.add(directionalLight);

        // Create objects
        this.ball = new Ball();
        this.ball.mesh.position.y = 200;
        this.add(this.ball);

        this.arena = new Arena();
        this.add(this.arena);
    };

    TestWorld.prototype.update = function () {
        this.updateCameraPosition();
    };

    TestWorld.prototype.updateCameraPosition = function () {
        var camera = this.game.camera;
        var deltaRotation = Input.mouse.movementX * 0.01;
        this.relativeRotation = this.relativeRotation - deltaRotation;
        camera.position.x = Math.sin(this.relativeRotation) * 200 + this.ball.mesh.position.x;
        camera.position.z = Math.cos(this.relativeRotation) * 200 + this.ball.mesh.position.z;
        camera.position.y = camera.position.y + Input.mouse.movementY;

        camera.lookAt(this.ball.mesh.position);
    };


    return TestWorld;
});