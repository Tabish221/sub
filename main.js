document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector("[data-scroll-container]");

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true
    });

    // Update ScrollTrigger on Locomotive Scroll event
    locoScroll.on("scroll", ScrollTrigger.update);

    // ScrollTrigger Proxy
    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Event listener for scroll updates
    locoScroll.on('scroll', () => {
        document.querySelectorAll('.fade-image').forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if element is in the viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate the opacity
                const elementHeight = rect.height;
                const elementTop = Math.max(rect.top, 0);
                const elementBottom = Math.min(rect.bottom, windowHeight);
                const visibleHeight = elementBottom - elementTop;

                // Calculate opacity based on visible height
                const opacity = Math.min((visibleHeight / elementHeight), 1);
                element.style.opacity = opacity;
            } else {
                element.style.opacity = 0;
            }
        });
    });

    // Function to handle opacity based on scroll position
    function handleOpacity() {
        document.querySelectorAll('[data-scroll-opacity]').forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Get custom opacity attributes
            const startOpacity = parseFloat(element.getAttribute('data-scroll-opacity')) || 0;
            const endOpacity = parseFloat(element.getAttribute('data-scroll-opacity-end')) || 1;

            // Check if element is in the viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const viewportHeight = windowHeight;
                const distance = rect.top < 0 ? Math.min(viewportHeight, rect.bottom) : Math.min(viewportHeight, rect.bottom - rect.top);
                const opacity = startOpacity + ((endOpacity - startOpacity) * (distance / viewportHeight));
                element.style.opacity = Math.min(Math.max(opacity, startOpacity), endOpacity);
            } else {
                element.style.opacity = startOpacity;
            }
        });
    }

    // Add event listeners
    locoScroll.on('scroll', handleOpacity);
    handleOpacity(); // Initial call to set opacity

    // Register GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Example GSAP animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".tragitSec",
            start: "top -10px",
            end: "+=200%",
            scroller: scrollContainer,
            scrub: true,
            pin: true,
        }
    });

    tl.from('.canvasBox', {
        yPercent: -100,
    }).to('.canvasBox', {
        yPercent: 0,
    });

    // Additional GSAP animation
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".tragitSec2",
            start: "top bottom",
            end: "+=100%",
            scroller: scrollContainer,
            scrub: true,
            markers: true
        }
    });

    tl2.from('.canvasBox', {
        scale: 1, rotation: 0,
    }).to('.canvasBox', {
        scale: 1.2, rotation: -90,
    });

    // Additional GSAP animation
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".tragitSec3",
            start: "top bottom",
            end: "+=100%",
            scroller: scrollContainer,
            scrub: true,
        }
    });

    tl3.from('.canvasBox', {
        opacity: 1
    }).to('.canvasBox', {
        opacity: 0
    });
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


scene.add(group);

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




        group.add(model);
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
    group.rotation.y = elapsedTime * 0.003;
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
