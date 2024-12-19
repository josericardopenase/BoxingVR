import * as THREE from 'three';
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

var controllerModelFactory = new XRControllerModelFactory();
const controllerL = renderer.xr.getControllerGrip(0);
const controllerR = renderer.xr.getControllerGrip(1);

const model1 = controllerModelFactory.createControllerModel(controllerL);
controllerL.add(model1);
scene.add(controllerL);
const model2 = controllerModelFactory.createControllerModel(controllerR);
controllerR.add(model2);
scene.add(controllerR);


const light = new THREE.DirectionalLight(0xffffff, 1)
light.rotateZ(Math.PI/2)
scene.add(light);

const loader = new GLTFLoader();
loader.load("/ring/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(0.8, 0.8, 0.8)
});

loader.load("/glove/scene.gltf", (gltf) => {
    controllerR.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    gltf.scene.rotation.set(-2.2, 0,  0);
});

loader.load("/glove/scene.gltf", (gltf) => {
    controllerL.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(-0.05, 0.05, 0.05);
    gltf.scene.rotation.set(-2.2, 0,  0);
});

loader.load("bag/scene.gltf", (gltf) => {
    scene.add(gltf.scene)
    gltf.scene.position.set(0, -0.2, -1.3 );
    gltf.scene.scale.set(30, 30, 30);

})

camera.position.y = 2.5;

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
