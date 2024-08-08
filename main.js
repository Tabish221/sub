// const scene = new THREE.Scene();
// // Get the canvas element
// const canvas = document.querySelector('.obj1');

// // size
// const size = {
//     width: window.innerWidth,
//     height: window.innerHeight
// };

// // ASPECTRATION OF WINDOWS
// const aspectRatio = size.width / size.height;

// // CURSOR POINTER VALUE GET
// const cursor = {
//     x: 0,
//     y: 0 
// };

// // Set up an camera
// const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 100)
// camera.position.set(0, 0, 0);
// scene.add(camera);

// // Create a renderer and add it to the specified canvas
// const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // Enable alpha for transparent background
// renderer.setSize(size.width, size.height);



// // Add ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// // Add directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight);



// // Add OrbitControls
// const controls = new THREE.OrbitControls(camera, canvas);
// controls.enableDamping = true; // Enable damping for smoother control





// // Load the GLTF model
// const loader = new THREE.GLTFLoader();

// loader.load(
//     './assets/objects/sgl_gold_bar.gltf',  // Path to your GLTF file
//     function (gltf) {
//         console.log('Object Load');
//         const model = gltf.scene;

//         // Create a gold material
//         const goldMaterial = new THREE.MeshStandardMaterial({
//             color: 0xffd700, // Gold color
//             metalness: 1.0,
//             roughness: 0.2
//         });

//         // Traverse the model and apply the gold material
//         model.traverse((object) => {
//             if (object.isMesh) {
//                 object.material = goldMaterial;
//             }
//         });

//         // Adjust the scale and position of the model if necessary
//         model.scale.set(1, 1, 1); // Adjust scale if model is too large or small
//         model.position.set(0, 0, 0); // Adjust position if model is not centered
//         scene.add(model);
//         camera.lookAt(model.position)

//         animate();
//     },
//     undefined,
//     function (error) {
//         console.error('An error occurred', error);
//     }
// );

// // Create an animation loop
// function animate() {
//     requestAnimationFrame(animate);

//     // Update the controls
//     controls.update();

//     camera.position.x = Math.sin(cursor.x * 3) * 4;
//     camera.position.z = Math.cos(cursor.x * 3) * 4;
//     camera.position.y = cursor.y * 3;

//     camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure the camera looks at the center during animation

//     // Update any animations or transformations here
//     renderer.render(scene, camera);
// }

// // Start the animation loop
// animate();















document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the sec1 section and animate the canvas and boxes
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".tragitSec",
            start: "top -10px",
            end: "+=200%",
            scrub: true,
            pin: true,
        }
    });

    tl.from('.canvasBox', {
        yPercent: -100,
        // opacity: 0
    }).to('.canvasBox', {
        yPercent: 0,
        // opacity: 1
    })


    // aboutSection

    // Pin the sec1 section and animate the canvas and boxes
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".aboutSection",
            start: "top bottom",
            end: "+=100%",
            scrub: true,
        }
    });

    tl2.from('.canvasBox', {
        scale: 1, rotation:0, ease: "power2"
        // opacity: 0
    }).to('.canvasBox', {
        scale: 1.2, rotation:-90,
        // opacity: 1
    })

    // const tl1 = gsap.timeline({
    //     paused: true,
    //     scrollTrigger: {
    //         trigger: ".sec1-contCard",
    //         start: 'top center',
    //         end: 'bottom center',
    //         scrub: 1,
    //         // markers: true
    //     },
    // });
    // tl1.from(".sec1-contCard", {
    //     yPercent: 100,
    // })
    // tl1.to(".sec1-contCard", {
    //     yPercent: 0,
    // })

    // const tl2 = gsap.timeline({
    //     paused: true,
    //     scrollTrigger: {
    //         trigger: ".sec1-contCard",
    //         start: 'top -20%',
    //         end: 'bottom 30%',
    //         scrub: 1,
    //         markers: true
    //     },
    // });
    // tl2.from(".sec1-contCard", {
    //     yPercent: -5,
    // })
    // tl2.to(".sec1-contCard", {
    //     yPercent: -300,
    // })


    // Pin the sec1 section and animate the canvas and boxes
    // let tl2 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".tragitSec",
    //         start: "top -200px",
    //         end: "+=200%",
    //         scrub: true,
    //         pin: true,
    //         markers: true
    //     }
    // });
    // .to(".box2", {
    //     x: "0",
    //     y: "0px",
    //     opacity: 1,
    //     duration: 1,
    // }, "<")
    // .to(".box3", {
    //     x: "0",
    //     y: "0px",
    //     opacity: 1,
    //     duration: 1,
    // }, "<")
    // .to(".box4", {
    //     x: "0",
    //     y: "0px",
    //     opacity: 1,
    //     duration: 1,
    // }, "<");

    // // Animate the canvas in the third section after the boxes' animation
    // gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".sec2",
    //         start: "top top",
    //         end: "+=100%",
    //         scrub: true,
    //         pin: true,
    //     }
    // })
    // .to(".obj1", {
    //     rotation: -90,
    //     x: "10vw",
    //     y: "10vh",
    //     zIndex: 2,
    //     duration: 1
    // });
});





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
camera.position.set(1, 1, 1); 

// RESIZING 
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
})

// Create a renderer and add it to the specified canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // Enable alpha for transparent background
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Add ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// Add directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(3, 50, 6.5);
// scene.add(directionalLight);

// // Add OrbitControls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // Enable damping for smoother controls

// LOAD TEXTURE
const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('./assets/images/gold-reap.png');
color.colorSpace = THREE.SRGBColorSpace;
color.minFilter = THREE.NearestFilter;

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();


scene.add( group );

// Load the GLTF model
const loader = new THREE.GLTFLoader();

loader.load(
    './assets/objects/gold_rock.glb',  // Path to your GLTF file
    function (gltf) {
        console.log('Object Load');
        const model = gltf.scene;

        // Create a gold material
        const goldMaterial = new THREE.MeshBasicMaterial({
            map: color, // Gold color
            emissive: 0x967b02,
            roughness: 0.1,
            metalness: 0.9,
            ior: 1,
            reflectivity: 0.8,
            clearcoat: 0.9,
            clearcoatRoughness: 1
        });

        goldMaterial.transparent = true;
        // goldMaterial.alphaMap = doorAlphaTexture;

        model.rotation.set(1.2, 0.2, -1.2);

        // Adjust the scale and position of the model if necessary
        model.scale.set(4, 4, 4); // Adjust scale if model is too large or small
        model.position.set(-.5, 0, 0); // Adjust position if model is not centered

        // Traverse the model and apply the gold material
        model.traverse((object) => {
            if (object.isMesh) {
                object.material = goldMaterial;
            }
        });
        
       
       

        group.add( model );
        // camera.lookAt(model.position)

        animate();
    },
    undefined,
    function (error) {
        console.error('An error occurred', error);
    }
);


// let time = Date.now();
let clock = new THREE.Clock();

// Create an animation loop
function animate() {
    // const currentTime = Date.now();
    // const dalta = currentTime - time;
    // time = currentTime;
    // console.log(dalta)
    const elapsedTime = clock.getElapsedTime();
    // group.rotation.z = (elapsedTime * 0.02);
    group.rotation.y = elapsedTime * 0.08;
    // group.position.y = elapsedTime * 0.3;


    requestAnimationFrame(animate);

    // Update the controls
    // controls.update();

    // camera.position.x -= 0.1;
    // // camera.position.z += 0.1;
    // camera.position.y += 0.1;

    camera.lookAt(group.position); // Ensure the camera looks at the center during animation

    // Update any animations or transformations here
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
