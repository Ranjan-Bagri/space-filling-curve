var container;
var camera, scene, renderer;
var uniforms;

init();
animate();

function init() {
	container = document.getElementById( 'container' );

	camera = new THREE.Camera();

	camera.position.z = 1;

	scene = new THREE.Scene();

	var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

	uniforms = {
		time: {
			type: "f",
			value: 1.0
		},
		resolution: {
			type: "v2",
			value: new THREE.Vector2()
		},
		mouse: {
			type: "v2",
			value: new THREE.Vector2()
		}
	};
	var fragment =document.getElementById( 'fragmentShader' ).textContent;
	fragment = frag;
	console.log(frag);

	var vertex = document.getElementById( 'vertexShader' ).textContent;
	vertex = vert;
	console.log(vert);

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertex,
		fragmentShader: fragment
});

	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );

	container.appendChild( renderer.domElement );

	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );

	document.onmousemove = function(e){
		uniforms.mouse.value.x = e.pageX
		uniforms.mouse.value.y = e.pageY
	};
}

function onWindowResize( event ) {
	renderer.setSize( window.innerWidth, window.innerHeight );
	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	uniforms.time.value += 0.05;
	renderer.render( scene, camera );
}
