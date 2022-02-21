//Gustavo P.V 2021
import './style.css';
import * as THREE from './node_modules/three';
//import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(-25,40,0);

renderer.render(scene,camera);


const materialNeutron = new THREE.MeshStandardMaterial({
  color:0xB90C0C
});

const materialProton = new THREE.MeshStandardMaterial({
  color:0xC4BB9
});

const materialElectron = new THREE.MeshStandardMaterial({
  color:0x40D40D
});

const materialMol = new THREE.MeshStandardMaterial({
  color:0x000000
});






const metalTexture = new THREE.TextureLoader().load('/assets/metal.jpg');
const sphereMol = new THREE.SphereGeometry( 4, 16, 16 );

function crearHex(x,y,z,ts=6,a=6.283185307179586,r=0)
{
  const link = new THREE.Mesh( 
    new THREE.TorusGeometry( 10, 2.5, 4, ts ,a ),
    new THREE.MeshStandardMaterial({
      map: metalTexture
    })
   );
  scene.add( link );
  link.position.set(x,y,z);
  link.rotation.z=r;
  crearMol(x+10,y,z);
  crearMol(x-10,y,z);


  
}

function crearMol(x,y,z)
{
  const mol = new THREE.Mesh( sphereMol, materialMol );
  mol.position.set(x,y,z);
  scene.add( mol );
}

crearHex(-50,50,-70);
crearHex(-50,67,-70,3,3.16876695732775,3.1416);
crearHex(-64,40,-70);
crearHex(-36,40,-70,3,3.16876695732775);
crearHex(-78,30,-70);
crearHex(-78,13,-70,3,3.16876695732775);


function createProton(x,y,z)
{
  const sphereBig = new THREE.SphereGeometry( 2, 16, 16 );
  const proton = new THREE.Mesh( sphereBig, materialProton );
  scene.add( proton );
  proton.position.set(x,y,z);
  return proton;
}

function createNeutron(x,y,z)
{
  const sphereBig = new THREE.SphereGeometry( 2, 16, 16 );
  const neutron = new THREE.Mesh( sphereBig, materialNeutron );
  scene.add( neutron );
  neutron.position.set(x,y,z);
  return neutron;
}


function createOrbit(x,y,z,t=20)
{
  const torus = new THREE.TorusGeometry( t, .2, 16, 24 );
  const materialRing = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const ring = new THREE.Mesh( torus, materialRing );
  scene.add( ring );
  ring.rotation.x = -0.4;
  ring.position.set(x,y,z);
  return ring;
  
}

function createElectron(x,y,z)
{
  const sphereSmall = new THREE.SphereGeometry( 1, 16, 16 );
  const electron = new THREE.Mesh( sphereSmall, materialElectron );
  scene.add( electron );
  electron.position.set(x,y,z);

}



//Hydrogen
const protonH=createProton(0,-100,100);
const orbitH=createOrbit(0,-100,100);
createElectron(20,-100,100);

//Helium
const orbitHe=createOrbit(-25,-190,190);
const protonHe1=createProton(-22,-190,190);
const protonHe2=createProton(-28,-190,190);
const neutronHe1=createNeutron(-25,-192,190);
const neutronHe2=createNeutron(-25,-188,190);
createElectron(-5,-190,190);
createElectron(-45,-190,190);

//Carbon
const orbitC1=createOrbit(25,-290,280);
const orbitC2=createOrbit(25,-290,280,25);
const protonC1=createProton(25,-293,282);
const protonC2=createProton(25,-293,280);
const protonC3=createProton(25,-287,280);
const protonC4=createProton(25,-287,282);
const neutronC1=createNeutron(23,-290,280);
const neutronC2=createNeutron(27,-290,280);
const neutronC3=createNeutron(25,-290,282);
const neutronC4=createNeutron(25,-290,278);
createElectron(5,-290,280);
createElectron(45,-290,280);
createElectron(0,-290,280);
createElectron(50,-290,280);
createElectron(25,-267,270);
createElectron(25,-313,290);

var orbits = [
  orbitH,orbitHe,orbitC1,orbitC2
];

var prne = [
  protonH,protonHe1,protonHe2,neutronHe1,neutronHe2,
  protonC1,protonC2,protonC3,protonC4,neutronC1,neutronC2,neutronC3,neutronC4
];


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,50,300);/*
const ambientLight = new THREE.AmbientLight(0xffffff);*/
scene.add(pointLight/*,ambientLight*/);

/*const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(500,200);
scene.add(lightHelper,gridHelper);*/


//const controls = new OrbitControls(camera,renderer.domElement);

/*
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
Array(100).fill().forEach(addStar); */


const bgTexture = new THREE.TextureLoader().load('/assets/molecules.jpg');
scene.background = bgTexture;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.125;
  camera.position.y = (t*0.125) + 30;
  camera.position.x = (t*-0.01) - 25;

}

document.body.onscroll = moveCamera;

function animate(){
  requestAnimationFrame(animate);
  orbits.forEach(o => o.rotation.z += -0.005);
  prne.forEach(e => e.rotation.y += 0.01);

 

  //controls.update();
  renderer.render(scene,camera);
}


animate();

