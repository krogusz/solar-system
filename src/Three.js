let THREE = window.THREE;

function setupRenderer(container){
  //create renderer, match their size and append to the document
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  return renderer;

  // container.appendChild( renderer.domElement );
}

function setupCamera(){
    //create camera
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    camera.position.y = 5;
    return camera;
}

function createLight(pozX, pozY, pozZ){
  //create Light
  let colorPink = new THREE.Color('hsl(309, 100%, 60%)');
  let light = new THREE.PointLight(colorPink, 2);
  //place light
  light.position.set(pozX, pozY, pozZ)
  return light;
}

function createMesh(){
  //create Mesh
  let geometry = new THREE.BoxGeometry(5,5,5);
  let white = new THREE.Color();
  let material = new THREE.MeshPhongMaterial( { color: white } );
  let cube = new THREE.Mesh( geometry, material );
  cube.rotation.x = 40;
  cube.rotation.z = -20;
  return cube;
  
}

function animate(renderer, scene, camera, cube) {
  requestAnimationFrame( () => animate(renderer, scene, camera, cube) );
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

export function setupScene(container){
  // create scene
  let scene = new THREE.Scene();
  let camera = setupCamera();
  let renderer = setupRenderer(container);
  let mesh = createMesh();
  console.log(mesh);
  let light1 = createLight(-40, -20, 20);
  let light2 = createLight(40, 20, 20);
  //add cube and light to scene
  scene.add(mesh);
  scene.add(light1);
  scene.add(light2);
  animate(renderer, scene, camera, mesh);
}

