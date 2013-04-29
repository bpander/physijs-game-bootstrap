define([
    'lib/Util',
    'game/Input',
    'three',
    'physijs'
], function (
    Util,
    Input
) {
    "use strict";

    Physijs.scripts.worker = 'assets/scripts/lib-thirdparty/physijs_worker.js';

    var Game = {

        renderer: null,

        camera: null,

        scene: null,

        environment: null
    };
    window.Game = Game;

    var _events = {

        onResize: function () {
            this.setAspectRatio();
        },

        onEnvironmentLoaded: function () {
            this.animate();
        },

        onClick: function (e) {
            Util.requestPointerLock(e.currentTarget);
        }
    };


    /**
     * Initialize the game with a given environment
     * @param {Environment} environment  The environment to run the game framework on
     */
    Game.init = function () {

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // Append the renderer's dom element and request pointer lock
        document.body.appendChild(this.renderer.domElement);
        Util.requestPointerLock(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        this.setAspectRatio();

        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3( 0, -385, 0 ));
        this.scene.add(this.camera);


        // Get the ball rolling...
        Input.init();
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
        Input.update();
        this.renderer.render(this.scene, this.camera);
    };

    Game.bindScope = function () {
        Util.bindAll(_events, this);
        this.animate = this.animate.bind(this);
    };

    Game.bindEvents = function () {
        window.addEventListener('resize', _events.onResize, false);
        this.renderer.domElement.addEventListener('click', _events.onClick);
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