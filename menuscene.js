import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const initialScenePositionX = -1;
const initialScenePositionY = -300;
const initialScenePositionZ = 0;

const initialCameraPositionX = 6;
const initialCameraPositionY = 2;
const initialCameraPositionZ = -2;

const scene = new THREE.Scene()
const color = 0xFFFFFF;
const intensity = 5;
const light = new THREE.DirectionalLight(color, 2);
const light1 = new THREE.DirectionalLight(color, 2);
const light2 = new THREE.DirectionalLight(color, 2)
light.position.set(-1, 2, 4);
light1.position.set(-1,2,-4);
light2.position.set(5,12,-4);
scene.add(light);
scene.add(light1);
scene.add(light2)

let rocket;

const camera = new THREE.PerspectiveCamera(
    75,
    300 / 300,
    0.1,
    1000
)
camera.position.z = initialCameraPositionZ
camera.position.y = initialCameraPositionY;
camera.position.x = initialCameraPositionX;

const renderer = new THREE.WebGLRenderer({
    alpha: true,
})
renderer.setSize(800, 800)
document.querySelector('.menu').prepend(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)


// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const objLoader = new GLTFLoader()
objLoader.load(
    "./bus_body_red.gltf",
    // (object) => {
    //     // (object.children[0] as THREE.Mesh).material = material
    //     // object.traverse(function (child) {
    //     //     if ((child as THREE.Mesh).isMesh) {
    //     //         (child as THREE.Mesh).material = material
    //     //     }
    //     // })
    //     scene.add(object)
    // },
    (gltf) => {
        rocket = gltf.scene;
        rocket.rotation.y = initialScenePositionY;
        rocket.position.x = initialScenePositionX;
        rocket.position.z = initialScenePositionZ;
        scene.add(rocket);
      }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = 300 / 300
    camera.updateProjectionMatrix()
    renderer.setSize(300, 300)
    render()
}

function animate() {
    requestAnimationFrame(animate)


    controls.update()
    
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()


let controllerIndex = null;

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    controllerIndex = gamepad.index;
    console.log("connected");
});

window.addEventListener("gamepaddisconnected", (event) => {
    controllerIndex = null;
    console.log("disconnected");
});

function handleButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if (i == 15 && button.pressed && scene.rotation.y <= 0.2) {
            scene.rotation.y += 0.01
            console.log(scene.rotation.y)
        }

        if (i == 14 && button.pressed && scene.rotation.y >= -0.2) {
            scene.rotation.y -= 0.01
            console.log(scene.rotation.y)
        }
    }
}

function scene0() {
    scene.rotation.y -= 0.1;
    if(scene.rotation.y >= 0){
        requestAnimationFrame(scene0)
    }
}

function scene1() {
    scene.rotation.y += 0.1;
    if(scene.rotation.y <= 3){
        requestAnimationFrame(scene1)
    }
}

function scene2() {
    scene.rotation.y -= 0.1;
    if(scene.rotation.y >= -3){
        requestAnimationFrame(scene2)
    }
}

function doorClose() {
    scene.rotation.y -= 0.05;
    if(scene.rotation.y >= 0){  
        requestAnimationFrame(doorClose)
    }
}

const ids = ["menu1", "menu2", "menu3"];
let selectedItem = "menu1";
let selectedItemIndex = 0;

document.getElementById(selectedItem).classList.add("active");

addEventListener("keydown", function(event) {
    if(event.keyCode == 38) {
        if(selectedItemIndex != 0) {
            selectedItem = ids[selectedItemIndex - 1];
            selectedItemIndex = ids.findIndex(item => item == selectedItem);
            ids.map(item => item !== selectedItem ? this.document.getElementById(item).classList.remove("active"): this.document.getElementById(item).classList.add("active"))
        } else if (selectedItemIndex == 0) {
            selectedItem = ids[2];
            selectedItemIndex = ids.findIndex(item => item == selectedItem);
            ids.map(item => item !== selectedItem ? this.document.getElementById(item).classList.remove("active"): this.document.getElementById(item).classList.add("active"))
        } 
    }

    if(event.keyCode == 40) {
        if(selectedItemIndex != 2) {
            selectedItem = ids[selectedItemIndex + 1];
            selectedItemIndex = ids.findIndex(item => item == selectedItem);
            ids.map(item => item !== selectedItem ? this.document.getElementById(item).classList.remove("active"): this.document.getElementById(item).classList.add("active"))
        } else if (selectedItemIndex == 2) {
            selectedItem = ids[0];
            selectedItemIndex = ids.findIndex(item => item == selectedItem);
            ids.map(item => item !== selectedItem ? this.document.getElementById(item).classList.remove("active"): this.document.getElementById(item).classList.add("active"))
        } 
    }

    if(selectedItemIndex == 0) {
        scene0()
    }
    if(selectedItemIndex == 1) {
        scene1()
    }
    if(selectedItemIndex == 2) {
        scene2()
    }
})

function gameLoop() {
    if (controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex];
        handleButtons(gamepad.buttons);
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();