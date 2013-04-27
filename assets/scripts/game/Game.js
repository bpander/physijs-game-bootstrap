define([
    'lib/Util',
    'game/game-objects/Box',
    'game/game-objects/Ground',
    'three',
    'physijs'
], function (
    Util,
    Box,
    Ground
) {
    "use strict";

    var Game = {

        renderer: null,

        camera: null,

        scene: null,

        objects: []

    };

    var _events = {

        onResize: function () {
            this.setAspectRatio();
        }
    };

    Game.init = function () {

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(0, 100, 200);
        this.setAspectRatio();

        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3( 0, -385, 0 ));
        this.scene.add(this.camera);

        // Get the ball rolling...
        this.bindScope();
        this.bindEvents();
        this.createScene();
        this.animate();
    };

    Game.animate = function () {
        this.render();
        requestAnimationFrame(this.animate);
    };

    Game.render = function () {
        this.scene.simulate();
        this.camera.lookAt(this.box.mesh.position);
        this.renderer.render(this.scene, this.camera);
    };

    Game.bindScope = function () {
        Util.bindAll(_events, this);
        this.animate = this.animate.bind(this);
    };

    Game.bindEvents = function () {
        window.addEventListener('resize', _events.onResize, false);
    };

    Game.setAspectRatio = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    };

    Game.add = function (gameObject) {
        this.objects.push(gameObject);
        this.scene.add(gameObject.mesh);
    };

    Game.createScene = function () {
        // Create lights
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
        directionalLight.position.y = 200;
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        var ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);

        // Create objects
        this.box = new Box();
        this.box.mesh.position.y = 200;
        var rotation = THREE.Math.degToRad(10);
        this.box.mesh.rotation.set(rotation, rotation, rotation);
        this.add(this.box);

        this.ground = new Ground();
        this.add(this.ground);
    };

    return Game;
});