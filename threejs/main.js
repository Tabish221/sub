// Create a scene
const scene = new THREE.Scene();
// Get the canvas element
const canvas = document.querySelector('.obj1');
// size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
};

const aspectRatio = size.width / size.height;

const cursor = {
    x: 0,
    y: 0 
};

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
})

// Set up an orthographic camera
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, 
    1 * aspectRatio, 
    1, 
    -1, 
    0.1, 
    100
);
camera.position.set(2, 12, 50); // Adjust the camera position if needed
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure the camera looks at the center

// Create a renderer and add it to the specified canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // Enable alpha for transparent background
renderer.setSize(size.width, size.height);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

const pointLightWhite = new THREE.PointLight( 0xffffff , 1 , 30 );
pointLightWhite.position.set( 1 , 10 , 3 );
scene.add(pointLightWhite);

const lightGeometryWhite = new THREE.SphereGeometry(1, 15, 32);
const lightMaterialWhite = new THREE.MeshBasicMaterial({color : 0xffffff});
const lightSphereWhite = new THREE.Mesh(lightGeometryWhite , lightMaterialWhite);
lightSphereWhite.position.set( 1 , 10 , 3 );
scene.add(lightSphereWhite);

camera.lookAt(lightSphereWhite.position)

// Load the GLTF model
const loader = new THREE.GLTFLoader();

loader.load(
    './assets/objects/gold_rock.gltf',  // Path to your GLTF file
    function (gltf) {
        console.log('Object Load');
        const model = gltf.scene;

        // Create a gold material
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            metalness: 1.0,
            roughness: 0.2
        });

        // Traverse the model and apply the gold material
        model.traverse((object) => {
            if (object.isMesh) {
                object.material = goldMaterial;
            }
        });

        // Adjust the scale and position of the model if necessary
        model.scale.set(1, 1, 1); // Adjust scale if model is too large or small
        model.position.set(0, 0, 0); // Adjust position if model is not centered
        scene.add(model);
        // camera.lookAt(model.position)

        animate();
    },
    undefined,
    function (error) {
        console.error('An error occurred', error);
    }
);

// Create an animation loop
function animate() {
    requestAnimationFrame(animate);

    camera.position.x = Math.sin(cursor.x * 3) * 4;
    camera.position.z = Math.cos(cursor.x * 0.2) * 0.2;
    camera.position.y = cursor.y * 3;

    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure the camera looks at the center during animation

    // Update any animations or transformations here
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
