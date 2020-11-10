const THREE = window.THREE;
const outerPlanetsScale = 1.6;
const innerPlanetsScale = 5;

function setupRenderer(container){
  //create renderer, match their size and append to the document
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth/2, 800 );
  container.appendChild( renderer.domElement );
  return renderer;
}

function setupCamera(){
  //create camera
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 50;
  camera.position.y = 5;
  return camera;
}

function createLight(pozX, pozY, pozZ){
  //create Light
  const colorWhite = new THREE.Color("hsl(309, 100%, 100%)");
  const light = new THREE.PointLight(colorWhite, 100);
  //place light
  light.position.set(pozX, pozY, pozZ);
  return light;
}

function createMesh(radius, type, scaling){
  const scale = type === "inner" ? innerPlanetsScale : outerPlanetsScale;
  const r = scaling ? Number(radius)*scale : 10;
  const geometry = new THREE.SphereGeometry(r, 32, 32);
  const material = new THREE.MeshBasicMaterial( {} );
  const cube = new THREE.Mesh( geometry, material );
  return cube;
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
        console.error( "An error happened." , err);
        reject("An error happened." );
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
        console.error( "An error happened.", err );
        reject("An error happened." );
      }
    );}
  );
  return [earthtexture, bumptexture];
}
    
function animate(renderer, scene, camera, cube) {
  requestAnimationFrame( () => animate(renderer, scene, camera, cube) );
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}

const handleResize = (renderer, camera) => {
  const {innerWidth} = window;
  renderer.setSize(innerWidth/2, 800);
  camera.aspect = (innerWidth/2) / 800;
  camera.updateProjectionMatrix();
};

export function setupScene(container, textureURLs, radius, type, scaling){
  // create scene
  const scene = new THREE.Scene();
  const camera = setupCamera();
  const renderer = setupRenderer(container);
  const light1 = createLight(-40, -20, 20);
  const light2 = createLight(40, 20, 20);
  //add cube and light to scene
  scene.add(light1);
  scene.add(light2);
  const cube = createMesh(radius, type, scaling);
  Promise.all(createTextures(textureURLs))
    .then(([earthtexture, bumptexture]) => {
      cube.material.map = earthtexture;
      cube.material.needsUpdate = true;
      cube.material.bumpMap = bumptexture;
      cube.material.bumpScale = 0;
      scene.add(cube);
      animate(renderer, scene, camera, cube);
      window.addEventListener("resize", handleResize(renderer, camera));
    })
    .catch(err => console.log(err));
}
