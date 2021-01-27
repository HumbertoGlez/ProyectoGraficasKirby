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
        object.position.set(23.5, 0, 0);
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

const ambientLight = new THREE.AmbientLight( 0xFcd1c6, 0.75);
scene.add( ambientLight );

const materialMoon = new THREE.MeshBasicMaterial( { color: 0x9b9b9b });
const moon = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), materialMoon);
moon.position.set(0, 15, 0);
scene.add(moon);

var walls = [];
const material = new THREE.MeshBasicMaterial( { color: 0x136d15 } );
walls.push(new THREE.Mesh(new THREE.BoxGeometry(44, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 8), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 18), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 37), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(17, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 8), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(8, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 8), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(18, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(19, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(18, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 8), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(9, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 18), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(43, 1, 1), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 8), material));
walls.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 11), material));
walls[0].position.set(0.5, 0.5, 22.5);
walls[1].position.set(-13, 0.5, 18);
walls[2].position.set(22, 0.5, 14);
walls[3].position.set(-22, 0.5, -4.5);
walls[4].position.set(-13, 0.5, 6.5);
walls[5].position.set(-4, 0.5, 10);
walls[6].position.set(-0.5, 0.5, 13.5);
walls[7].position.set(13, 0.5, 9);
walls[8].position.set(13.5, 0.5, 4.5);
walls[9].position.set(-4, 0.5, -3.5);
walls[10].position.set(4.5, 0.5, -13.5);
walls[11].position.set(13, 0.5, -9);
walls[12].position.set(18, 0.5, -5.5);
walls[13].position.set(22, 0.5, -14);
walls[14].position.set(0, 0.5, -22.5);
walls[15].position.set(5, 0.5, 1);
walls[16].position.set(-13.5, 0.5, -8.5);
scene.add(walls[0]);
scene.add(walls[1]);
scene.add(walls[2]);
scene.add(walls[3]);
scene.add(walls[4]);
scene.add(walls[5]);
scene.add(walls[6]);
scene.add(walls[7]);
scene.add(walls[8]);
scene.add(walls[9]);
scene.add(walls[10]);
scene.add(walls[11]);
scene.add(walls[12]);
scene.add(walls[13]);
scene.add(walls[14]);
scene.add(walls[15]);
scene.add(walls[16]);

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
