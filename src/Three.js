const THREE = window.THREE;
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls.js";
const scale = 10/109;
const velocity = 0.008;
const planetMotion = false;

function setupRenderer(container, sun = false){
  //create renderer, match their size and append to the document
  const renderer = new THREE.WebGLRenderer({antialias: true,  alpha: true});
  const rendererWidth = sun? window.innerWidth : window.innerWidth/2;
  renderer.setSize( rendererWidth, 800 );
  container.appendChild( renderer.domElement );
  return renderer;
}

function setupCamera(){
  //create camera
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.00001, 1000 );
  camera.position.z = 100;
  return camera;
}

function createLight(pozX, pozY, pozZ){
  //create light
  const colorWhite = new THREE.Color("hsl(309, 100%, 100%)");
  const light = new THREE.PointLight(colorWhite, 100);
  //place light
  light.position.set(pozX, pozY, pozZ);
  return light;
}

function createMesh(radius, scaling){
  const r = scaling ? Number(radius)*scale : 10;
  const geometry = new THREE.SphereGeometry(r, 32, 32);
  const material = new THREE.MeshBasicMaterial( {} );
  const cube = new THREE.Mesh( geometry, material );
  const pivot = new THREE.Object3D();
  pivot.add(cube);
  return {
    cube,
    pivot
  };
}

function createTextures(textureURLs){
  const loader = new THREE.TextureLoader();
  const earthtexture = new Promise((resolve, reject)=>{
    loader.load(
      textureURLs.planet,
      function ( texture ) {  
        resolve(texture);
      },
      // onProgress callback currently not supported
      undefined,
      // onError callback
      function ( err ) {
        reject(err );
      }
    );}
  );

  const bumptexture = new Promise((resolve, reject)=>{
    loader.load(
      textureURLs.bump,
      function ( texture ) {  
        resolve(texture);
      },
      // onProgress callback currently not supported
      undefined,
      // onError callback
      function ( err ) {
        reject( err );
      }
    );}
  );
  return [earthtexture, bumptexture];
}
    
function animate(renderer, scene, camera, cube, controls, clock) {
  requestAnimationFrame( () => animate(renderer, scene, camera, cube, controls, clock) );
  cube.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

const handleResize = (renderer, camera, sun) => {
  const {innerWidth} = window;
  const rendererWidth = sun ? innerWidth : innerWidth/2;
  renderer.setSize(rendererWidth, 800);
  camera.aspect = (rendererWidth) / 800;
  camera.updateProjectionMatrix();
};

const rotatePlanet = (planet, ratio) => {
  planet.rotation.y  += ratio*velocity;
  requestAnimationFrame(() => rotatePlanet(planet, ratio));
};

const setupPlanet = (container, textureURLs, radius, scaling = false, sun = false) => {
  // create scene
  const scene = new THREE.Scene();
  const camera = setupCamera();
  const renderer = setupRenderer(container, sun);
  var controls = new TrackballControls( camera, renderer.domElement );
  let clock = new THREE.Clock();
  const light1 = createLight(-40, -20, 20);
  const light2 = createLight(40, 20, 20);
  // add cube and light to scene
  scene.add(light1);
  scene.add(light2);
  const Mesh = createMesh(radius, scaling);
  const {cube} = Mesh;
  
  return Promise.all(createTextures(textureURLs))
    .then(([earthtexture, bumptexture]) => {
      cube.material.map = earthtexture;
      cube.material.needsUpdate = true;
      cube.material.bumpMap = bumptexture;
      cube.material.bumpScale = 0;
      scene.add(cube);
      console.log(clock);
      animate(renderer, scene, camera, cube, controls, clock);
      window.addEventListener("resize", handleResize(renderer, camera, sun));
      return(scene);
    })
    .catch(err => console.log(err));
};

// Define all solar system. This element is not used yet.
const setupSystem = (container, planetsInfo, sunTextures, sunRadius ) => {
  const sun = setupPlanet(container, sunTextures, sunRadius, true, true);
  sun.then(scene => {
    Object.keys(planetsInfo).map(planet => {
      const Mesh = createMesh(planetsInfo[planet]["radius"], true);
      const {cube, pivot} = Mesh;
      const AU = planetsInfo[planet]["AU"];
      const speedRatio = planetsInfo[planet]["speedRatio"];
      
      Promise.all(createTextures(planetsInfo[planet]["urls"]))
        .then(([earthtexture, bumptexture]) => {
          cube.material.map = earthtexture;
          cube.material.needsUpdate = true;
          cube.material.bumpMap = bumptexture;
          cube.material.bumpScale = 0;
          cube.position.set(AU*15,0,0);
          scene.add(pivot);
          if (!planetMotion) {rotatePlanet(pivot, speedRatio);}
        })
        .catch(
          err => {
            console.log(err);
          }
        );
    });
  });
};

export {setupPlanet, setupSystem};