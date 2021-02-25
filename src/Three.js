const THREE = window.THREE;
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls.js";

function setupRenderer(container){
  //create renderer, match their size and append to the document
  const renderer = new THREE.WebGLRenderer({antialias: true,  alpha: true});
  const rendererWidth = window.innerWidth;
  const renderHeight = window.innerHeight;
  renderer.setSize( rendererWidth, renderHeight );
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

function createMesh(){
  const r =  10;
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

const handleResize = (renderer, camera) => {
  const {innerWidth, innerHeight} = window;
  const rendererWidth = innerWidth ;
  const renderHeight = innerHeight;
  renderer.setSize(rendererWidth, renderHeight);
  camera.aspect = (rendererWidth) / renderHeight;
  camera.updateProjectionMatrix();
};

const createStars = (scene) => {
  const starsMaterials = [
    new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
  ];

  const r = 14;
  const vertices1 = [];
  const vertices2 = [];
  const vertex = new THREE.Vector3();

  for ( let i = 0; i < 100; i ++ ) {
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar( r );
    vertices1.push( vertex.x, vertex.y, vertex.z );

  }

  for ( let i = 0; i < 500; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar( r );
    vertices2.push( vertex.x, vertex.y, vertex.z );

  }

  const starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
  starsGeometry[ 0 ].setAttribute( "position", new THREE.Float32BufferAttribute( vertices1, 3 ) );
  starsGeometry[ 1 ].setAttribute( "position", new THREE.Float32BufferAttribute( vertices2, 3 ) );

  for ( let i = 10; i < 30; i ++ ) {

    const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
    stars.rotation.x = Math.random() * 6;
    stars.rotation.y = Math.random() * 6;
    stars.rotation.z = Math.random() * 6;
    stars.scale.setScalar( i * 10 );
    stars.matrixAutoUpdate = false;
    stars.updateMatrix();

    scene.add( stars );

  }
};

const setupPlanet = (container, textureURLs) => {
  // create scene
  const scene = new THREE.Scene();
  const camera = setupCamera();
  const renderer = setupRenderer(container);
  var controls = new TrackballControls( camera, renderer.domElement );
  controls.maxDistance = 150;
  controls.minDistance = 20;
  let clock = new THREE.Clock();
  const light1 = createLight(-40, -20, 20);
  const light2 = createLight(40, 20, 20);
  // add cube and light to scene
  scene.add(light1);
  scene.add(light2);
  createStars(scene);
  const Mesh = createMesh();
  const {cube} = Mesh;
  
  return Promise.all(createTextures(textureURLs))
    .then(([earthtexture, bumptexture]) => {
      cube.material.map = earthtexture;
      cube.material.needsUpdate = true;
      cube.material.bumpMap = bumptexture;
      cube.material.bumpScale = 0;
      scene.add(cube);
      animate(renderer, scene, camera, cube, controls, clock);
      window.addEventListener("resize", handleResize(renderer, camera));
      return(scene);
    })
    .catch(err => console.log(err));
};

export {setupPlanet};