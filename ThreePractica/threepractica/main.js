import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.SphereGeometry(15,32,16);
const material = new THREE.MeshStandardMaterial({
  color:0xffff00
});

const earthTexture = new THREE.TextureLoader().load('assets/earth.jpg');
const normalEarthTexture = new THREE.TextureLoader().load('assets/earthNormal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(16,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalEarthTexture
  })
);
scene.add(earth);
earth.rotation.x = -0.1;
earth.position.z = 30;




const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50,0,20);

//const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight/*,ambientLight*/);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);


const controls = new OrbitControls(camera,renderer.domElement);


function addStar(){
  const geometry = new THREE.IcosahedronGeometry(0.4,0);
  const material =new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);
  const x = THREE.MathUtils.randFloatSpread(100);
  const y = THREE.MathUtils.randFloatSpread(100);
  const z = THREE.MathUtils.randFloatSpread(100);
  star.position.set(x,y,z);
  scene.add(star);
}
Array(100).fill().forEach(addStar);


const bgTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = bgTexture;




function animate(){
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
  


  controls.update();
  renderer.render(scene,camera);
}

animate();