/* eslint-disable */
/**
 * THREE.Geometry to THREE.BufferGeometry Example
 * @author Callum Prentice / http://callum.com/
 */
var camera, scene, renderer, controls, stats, gui;
var bufferMesh = 0;
var parameters = 0;

function app() {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    init();
    animate();
}

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45.0, window.innerWidth / window.innerHeight, 100, 1500.0);
    camera.position.z = 480.0;

    scene.add(new THREE.AmbientLight(0x444444));

    var light1 = new THREE.DirectionalLight(0x999999, 0.1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0x999999, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.minDistance = 100.0;
    controls.maxDistance = 800.0;
    controls.dynamicDampingFactor = 0.1;

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '24px';
    document.body.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);

    createGui('Cylinder');

    createScene();
}

function createGeometry() {

    if (parameters.geomType === 'Cylinder') {
        return new THREE.CylinderGeometry(
            parameters.radius, parameters.radius, parameters.maxHeight, parameters.numSides, 1, !parameters.endCaps);
    } else
    if (parameters.geomType === 'Cone') {
        return new THREE.CylinderGeometry(
            parameters.radius1, parameters.radius2, parameters.maxHeight, parameters.numSides, 1, !parameters.endCaps);
    } else
    if (parameters.geomType === 'Sphere') {
        return new THREE.SphereGeometry(
            parameters.radius, parameters.segments, parameters.segments);
    } else
    if (parameters.geomType === 'Tetrahedron') {
        return new THREE.TetrahedronGeometry(
            parameters.radius);
    } else
    if (parameters.geomType === 'Heart') {
        var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
        var x = 0,
            y = 0;
        heartShape.moveTo(x + 25, y + 25);
        heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
        heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
        heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
        heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
        heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
        heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
        var extrudeSettings = {
            amount: 8,
            bevelEnabled: true,
            bevelSegments: 1,
            steps: 2,
            bevelSize: 1,
            bevelThickness: 1
        };
        var geom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-THREE.Math.degToRad(90)));
        geom.applyMatrix(new THREE.Matrix4().makeScale(0.1, 0.1, 0.1));
        geom.applyMatrix(new THREE.Matrix4().makeScale(parameters.radius, parameters.radius, parameters.radius));
        return geom;
    } else
    if (parameters.geomType === 'Torus') {
        return new THREE.TorusGeometry(
            parameters.radius1, parameters.radius2, parameters.segments, parameters.segments);
    } else
    if (parameters.geomType === 'Torus Knot') {
        return new THREE.TorusKnotGeometry(
            parameters.radius1, parameters.radius2, parameters.segments, parameters.segments);
    }
}

function createGui(geom_type) {

    if (gui && gui.domElement) {
        document.body.removeChild(gui.domElement)
    }

    gui = new dat.GUI({
        autoPlace: false
    });

    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '24px';
    gui.domElement.style.right = '0';
    document.body.appendChild(gui.domElement);

    parameters = {
        density: 50,
        radius1: 10,
        radius2: 5,
        radius: 8,
        numSides: 16,
        maxHeight: 40,
        endCaps: true,
        segments: 16,
        randomHeights: true
    };

    var object_list = ['Cylinder', 'Cone', 'Sphere', 'Tetrahedron', 'Heart', 'Torus', 'Torus Knot'];

    if (geom_type === 'Cylinder') {

        parameters.geomType = geom_type;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius', 0, 20).name("Radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'numSides', 3, 64).step(1).name("Cylinder sides").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'maxHeight', 1, 80).name("Max height").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'endCaps', true).name("End caps").onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'randomHeights', true).name("Random heights").onChange(function (value) {
            createScene();
        });
    } else
    if (geom_type === 'Cone') {

        parameters.geomType = geom_type;
        parameters.radius1 = 0;
        parameters.radius2 = 9;
        parameters.endCaps = false;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius1', 0, 20).name("Top radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius2', 0, 20).name("Bottom radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'numSides', 3, 64).step(1).name("Cone sides").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'maxHeight', 1, 80).name("Max height").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'endCaps', true).name("End caps").onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'randomHeights', true).name("Random heights").onChange(function (value) {
            createScene();
        });
    } else
    if (geom_type === 'Sphere') {

        parameters.geomType = geom_type;
        parameters.density = 30;
        parameters.radius = 12;
        parameters.maxHeight = 50.0;
        parameters.segments = 16;
        parameters.randomHeights = false;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius', 0, 20).name("Radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'segments', 0, 20).step(1).name("Segments").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'randomHeights', true).name("Randomize position").onChange(function (value) {
            createScene();
        });
    } else
    if (geom_type === 'Tetrahedron') {

        parameters.geomType = geom_type;
        parameters.density = 46;
        parameters.radius = 15;
        parameters.maxHeight = 50.0;
        parameters.randomHeights = true;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius', 0, 20).name("Radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'randomHeights', true).name("Randomize position").onChange(function (value) {
            createScene();
        });
    } else
    if (geom_type === 'Heart') {

        parameters.geomType = geom_type;
        parameters.density = 20;
        parameters.radius = 3.5;
        parameters.maxHeight = 50.0;
        parameters.randomHeights = false;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius', 0, 20).name("Radius").listen().onFinishChange(function (value) {
            createScene();
        });
    } else
    if (geom_type === 'Torus' || geom_type === 'Torus Knot') {

        parameters.geomType = geom_type;
        parameters.density = 24;
        parameters.radius1 = 16;
        parameters.radius2 = 2;
        parameters.maxHeight = 50.0;
        parameters.segments = 32;
        parameters.randomHeights = false;

        gui.add(parameters, 'geomType', object_list).name('Geometry type').onChange(function (value) {
            createGui(value);
            createScene();
        });
        gui.add(parameters, 'density', 1, 180).step(2).name("Density").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius1', 0, 20).name("Radius").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'radius2', 0, 20).name("Tube").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'segments', 0, 64).step(1).name("Segments").listen().onFinishChange(function (value) {
            createScene();
        });
        gui.add(parameters, 'randomHeights', true).name("Randomize position").onChange(function (value) {
            createScene();
        });
    }
}

function createScene() {

    if (bufferMesh) {
        scene.remove(bufferMesh);
    }

    var buffer_geometry = new THREE.BufferGeometry();
    var radius = 100.0;
    var positions = 0;
    var normals = 0;
    var colors = 0;

    for (var num_lat = 0; num_lat < parameters.density / 2; ++num_lat) {

        var lat_lhs = (num_lat + 0) * 180 / (parameters.density / 2);
        var lat_rhs = (num_lat + 1) * 180 / (parameters.density / 2);
        var lat = (lat_lhs + lat_rhs) / 2.0;

        for (var num_lng = 0; num_lng < parameters.density; ++num_lng) {

            var lng_lhs = (num_lng + 0) * 360 / parameters.density;
            var lng_rhs = (num_lng + 1) * 360 / parameters.density;
            var lng = (lng_lhs + lng_rhs) / 2.0;

            var height = parameters.maxHeight;
            if (parameters.randomHeights)
                height = Math.random() * (parameters.maxHeight - 5.0) + 5;

            var phi = lat * Math.PI / 180.0;
            var theta = lng * Math.PI / 180.0;
            var x = radius * Math.sin(phi) * Math.cos(theta);
            var y = radius * Math.cos(phi);
            var z = radius * Math.sin(phi) * Math.sin(theta);

            var geometry = createGeometry();

            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, height / 2, 0));
            geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-THREE.Math.degToRad(90)));
            geometry.applyMatrix(new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z), new THREE.Vector3(0, 1, 0)));
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x, y, z));

            var color = new THREE.Color(0xffffff);
            color.setHSL(lat / 180.0, 1.0, 0.7);

            if (positions === 0) {
                var num_stacks = parameters.density * parameters.density / 2;

                var str = "Geometry to BufferGeometry Example - " + parseInt(num_stacks * geometry.faces.length, 10) + " triangles";
                document.getElementById('title').textContent = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                positions = new Float32Array(num_stacks * geometry.faces.length * 3 * 3);
                normals = new Float32Array(num_stacks * geometry.faces.length * 3 * 3);
                colors = new Float32Array(num_stacks * geometry.faces.length * 3 * 3);
            }

            geometry.faces.forEach(function (face, index) {

                var cur_element = ((num_lng + num_lat * parameters.density) * geometry.faces.length + index);

                positions[cur_element * 9 + 0] = geometry.vertices[face.a].x;
                positions[cur_element * 9 + 1] = geometry.vertices[face.a].y;
                positions[cur_element * 9 + 2] = geometry.vertices[face.a].z;
                positions[cur_element * 9 + 3] = geometry.vertices[face.b].x;
                positions[cur_element * 9 + 4] = geometry.vertices[face.b].y;
                positions[cur_element * 9 + 5] = geometry.vertices[face.b].z;
                positions[cur_element * 9 + 6] = geometry.vertices[face.c].x;
                positions[cur_element * 9 + 7] = geometry.vertices[face.c].y;
                positions[cur_element * 9 + 8] = geometry.vertices[face.c].z;

                normals[cur_element * 9 + 0] = face.normal.x;
                normals[cur_element * 9 + 1] = face.normal.y;
                normals[cur_element * 9 + 2] = face.normal.z;
                normals[cur_element * 9 + 3] = face.normal.x;
                normals[cur_element * 9 + 4] = face.normal.y;
                normals[cur_element * 9 + 5] = face.normal.z;
                normals[cur_element * 9 + 6] = face.normal.x;
                normals[cur_element * 9 + 7] = face.normal.y;
                normals[cur_element * 9 + 8] = face.normal.z;

                colors[cur_element * 9 + 0] = color.r;
                colors[cur_element * 9 + 1] = color.g;
                colors[cur_element * 9 + 2] = color.b;
                colors[cur_element * 9 + 3] = color.r;
                colors[cur_element * 9 + 4] = color.g;
                colors[cur_element * 9 + 5] = color.b;
                colors[cur_element * 9 + 6] = color.r;
                colors[cur_element * 9 + 7] = color.g;
                colors[cur_element * 9 + 8] = color.b;
            });
        }
    }

    buffer_geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    buffer_geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    buffer_geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    buffer_geometry.computeBoundingSphere();

    var buffer_material = new THREE.MeshPhongMaterial({
        color: 0x999999,
        specular: 0x333333,
        shininess: 50,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors,
        shading: THREE.SmoothShading
    });

    bufferMesh = new THREE.Mesh(buffer_geometry, buffer_material);
    scene.add(bufferMesh);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();
    renderer.render(scene, camera);
}