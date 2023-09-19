
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

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
camera.position.z = 0
camera.position.y = 3;
camera.position.x = -6;

const renderer = new THREE.WebGLRenderer({
    alpha: true,
})
renderer.setSize(300, 300)
document.querySelector('.speedometer-container').appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)


// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const objLoader = new GLTFLoader()
objLoader.load(
    "./rocket.gltf",
    // (object) => {
    //     // (object.children[0] as THREE.Mesh).material = material
    //     // object.traverse(function (child) {
    //     //     if ((child as THREE.Mesh).isMesh) {
    //     //         (child as THREE.Mesh).material = material
    //     //     }
    //     // })
    //     scene.add(object)
    //},
    (gltf) => {
        rocket = gltf.scene;
        rocket.position.y = 50;
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

    scene.rotation.y += 0.01

    controls.update()
    
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()