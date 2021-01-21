import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', onDocumentMouseMove, false );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};

const loader = new OBJLoader();
loader.load(
    // resource URL
    '../models/kirbo.obj',
    // called when resource is loaded
    function(object) {
        scene.add(object);
    },
    // called when loading is in progress
    function(xhr) {
        console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function (error) {
        console.log( 'An error happened' );
    }
);

const ambientLight = new THREE.AmbientLight( 0xFFB6C1, 0.4 );
scene.add( ambientLight );

const animate = function () {
    requestAnimationFrame( animate );
    render();
};

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render(scene,camera);
}

animate();
