define([
    'lib/Util',
    'three',
    'physijs'
], function (
    Util
) {
    "use strict";

    Physijs.scripts.worker = 'assets/scripts/lib-thirdparty/physijs_worker.js';

    var Game = {

        renderer: null,

        camera: null,

        scene: null,

        environment: null
    };

    var _events = {

        onResize: function () {
            this.setAspectRatio();
        },

        onEnvironmentLoaded: function () {
            this.animate();
        }
    };

    /**
     * Initialize the game with a given environment
     * @param {Environment} environment  The environment to run the game framework on
     */
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
        return this;
    };

    Game.animate = function () {
        this.render();
        requestAnimationFrame(this.animate);
    };

    Game.render = function () {
        // Run the physics simulation and update the environment
        this.scene.simulate();
        this.environment.updateObjects();
        this.environment.update();
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

    Game.loadEnvironment = function (environment) {
        this.environment = environment;
        this.environment.game = this;

        this.environment.load(_events.onEnvironmentLoaded);
    };


    return Game;
});