import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

let clock = new THREE.Clock();
let keyboard = new THREEx.KeyboardState();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};

let Kirby;
// This format already sets the texture, just need the files
var loader = new GLTFLoader();
loader.load('../models/scene.gltf', function (gltf) {
    Kirby = gltf.scene;
    // Kirby.rotation.set(0, Math.PI, 0);
    Kirby.rotateOnAxis( new THREE.Vector3(0, 1, 0), Math.PI);
    Kirby.position.set(23.5, 0, 0);
    scene.add(Kirby);

}, undefined, function (error) {

    console.error(error);

});
var kirbyBottomLight = new THREE.PointLight(0xfff07f, 1, 10)
scene.add(kirbyBottomLight);
let kirbyFaceLight = new THREE.PointLight(0xfff07f, 1, 10)
scene.add(kirbyFaceLight);

// Set up a really dim and smooth blueish ambient light (its nightime)
// const ambientLight = new THREE.AmbientLight(0x0055a5, 0.1);
// scene.add(ambientLight);
// Set up the biggest light source which is the moonlight
// var moonLight = new THREE.DirectionalLight(0xd9dee0, 0.4);
var moonLight = new THREE.DirectionalLight(0x0055a5, 0.6);
moonLight.position.set(0, 25, 0).normalize();
scene.add(moonLight);

// Create moon
const materialMoon = new THREE.MeshBasicMaterial({ color: 0x9b9b9b });
const moon = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), materialMoon);
moon.position.set(0, 15, 0);
scene.add(moon);

// Create ground
const groundSize = 60;
const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
var textureLoader = new THREE.TextureLoader();
var groundTexture = textureLoader.load("../models/textures/stone_path.jpg");
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(groundSize, groundSize);
const ground = new THREE.Mesh(groundGeometry, new THREE.MeshLambertMaterial({ map: groundTexture, side: THREE.DoubleSide }));
ground.position.set(0, -0.01, 0);
ground.rotation.set(Math.PI / 2, 0, 0);
ground.matrixAutoUpdate = false;
scene.add(ground);
ground.updateMatrix();

// Create walls
var walls = [];
var wallHeight = 3;
walls.push(makeWall(44, wallHeight, 1, new THREE.Vector3(0.5, wallHeight / 2, 22.5)));
walls.push(makeWall(1, wallHeight, 8, new THREE.Vector3(-13, wallHeight / 2, 18)));
walls.push(makeWall(1, wallHeight, 18, new THREE.Vector3(22, wallHeight / 2, 14)));
walls.push(makeWall(1, wallHeight, 37, new THREE.Vector3(-22, wallHeight / 2, -4.5)));
walls.push(makeWall(17, wallHeight, 1, new THREE.Vector3(-13, wallHeight / 2, 6.5)));
walls.push(makeWall(1, wallHeight, 8, new THREE.Vector3(-4, wallHeight / 2, 10)));
walls.push(makeWall(8, wallHeight, 1, new THREE.Vector3(-0.5, wallHeight / 2, 13.5)));
walls.push(makeWall(1, wallHeight, 8, new THREE.Vector3(13, wallHeight / 2, 9)));
walls.push(makeWall(18, wallHeight, 1, new THREE.Vector3(13.5, wallHeight / 2, 4.5)));
walls.push(makeWall(19, wallHeight, 1, new THREE.Vector3(-4, wallHeight / 2, -3.5)));
walls.push(makeWall(18, wallHeight, 1, new THREE.Vector3(4.5, wallHeight / 2, -13.5)));
walls.push(makeWall(1, wallHeight, 8, new THREE.Vector3(13, wallHeight / 2, -9)));
walls.push(makeWall(9, wallHeight, 1, new THREE.Vector3(18, wallHeight / 2, -5.5)));
walls.push(makeWall(1, wallHeight, 18, new THREE.Vector3(22, wallHeight / 2, -14)));
walls.push(makeWall(43, wallHeight, 1, new THREE.Vector3(0, wallHeight / 2, -22.5)));
walls.push(makeWall(1, wallHeight, 8, new THREE.Vector3(5, wallHeight / 2, 1)));
walls.push(makeWall(1, wallHeight, 11, new THREE.Vector3(-13.5, wallHeight / 2, -8.5)));
for (let i = 0; i < walls.length; i++) {
    scene.add(walls[i]);
    walls[i].updateMatrix();
}


function makeWall(width, height, depth, position) {
    var textureLoader = new THREE.TextureLoader();
    var wallGeometry = new THREE.BoxGeometry(width, height, depth);
    var materials = [];
    // right
    var wallTexture = textureLoader.load("../models/textures/hedge.jpg");
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(depth, height);
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));
    // left
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));
    // top
    wallTexture = textureLoader.load("../models/textures/hedge.jpg");
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(width, depth);
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));
    // bottom
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));
    // front
    wallTexture = textureLoader.load("../models/textures/hedge.jpg");
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(width, height);
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));
    // back
    materials.push(new THREE.MeshLambertMaterial({ map: wallTexture }));

    var wall = new THREE.Mesh(wallGeometry, materials);

    wall.position.set(position.x, position.y, position.z);
    wall.matrixAutoUpdate = false;
    return wall;
}

// instantiate a loader
var loader = new OBJLoader();
// load a resource
loader.load(
	// resource URL
	'../models/Archway.obj',
	// called when resource is loaded
	function ( object ) {
        object.material = new THREE.MeshLambertMaterial({ color: 0xFFb6c1 })
        object.position.set(-38, 5, 17);
        object.rotateOnAxis( new THREE.Vector3(0, 1, 0), Math.PI / 2 );
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const animate = function () {
    requestAnimationFrame(animate);
    movement();
    render();
};

function movement() {
    if (Kirby) {
        let delta = clock.getDelta(); // segundos
        let rotateAngle = Math.PI / 2 * delta; // 200 pixeles por segundo
        let moveDistance = 6 * delta;
        
        // W Hacia delante
        if ( keyboard.pressed("W") ) {
            Kirby.translateX( moveDistance );
        }
        // S Hacia atras
        if ( keyboard.pressed("S") ) {
            Kirby.translateX( -moveDistance );
        }
        // A Girar a la Izquierda
        if ( keyboard.pressed("A") ) {
            Kirby.rotateOnAxis( new THREE.Vector3(0, 1, 0), rotateAngle);
        }
        // D Girar a la Derecha
        if ( keyboard.pressed("D") ) {
            Kirby.rotateOnAxis( new THREE.Vector3(0, 1, 0), -rotateAngle);
        }
    }
};

function render() {
    if (kirbyFaceLight && Kirby) {
        kirbyFaceLight.position.set(Kirby.position.x, Kirby.position.y + 1, Kirby.position.z);
        kirbyBottomLight.position.set(Kirby.position.x, Kirby.position.y - 1, Kirby.position.z);
        let relativeCameraOffset = new THREE.Vector3(-10, 5, 0);
        let cameraOffset = relativeCameraOffset.applyMatrix4( Kirby.matrixWorld );
        camera.position.x = cameraOffset.x;
        camera.position.y = cameraOffset.y;
        camera.position.z = cameraOffset.z;
        camera.lookAt(new THREE.Vector3(Kirby.position.x, Kirby.position.y + 2, Kirby.position.z));
    } else {
        camera.position.set(30, 5, 0);
        camera.lookAt(scene.position);
    }
    renderer.render(scene, camera);
}

animate();
