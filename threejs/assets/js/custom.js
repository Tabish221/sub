// const scene = new THREE.Scene();
import * as THREE from '../three.js-master/build/three.module.js';

// import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const loader = new GLTFLoader();
loader.load(
    'path/to/your/file.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        scene.add( gltf.scene );
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);

console.log(GLTFLoader);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const materil = new THREE.MeshBasicMaterial({ color: "red" });

const box = new THREE.Mesh(geometry, materil);
scene.add(box);

const size = {
  width: 700,
  heigth: 500,
};

const camera = new THREE.PerspectiveCamera(75, size.width / size.heigth);
camera.position.z = 4;
camera.position.x = 2;

scene.add(camera);

//rendering
const target = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({ canvas: target });

renderer.setSize(size.width, size.heigth);
renderer.render(scene, camera);
