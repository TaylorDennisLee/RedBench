

            pointsss = [
            [82.5, 9.5],
            [49.642, 9.5],
            [48.557, 9.194],
            [47.467, 8.905],
            [46.373, 8.632],
            [45.275, 8.375],
            [44.173, 8.134],
            [43.068, 7.909],
            [41.96, 7.702],
            [40.849, 7.51],
            [39.735, 7.335],
            [38.618, 7.177],
            [37.5, 7.035],
            [36.379, 6.91],
            [35.257, 6.801],
            [34.133, 6.709],
            [33.008, 6.634],
            [31.882, 6.575],
            [30.755, 6.534],
            [29.628, 6.508],
            [28.5, 6.5],
            [-28.5, 6.5],
            [-29.628, 6.508],
            [-30.755, 6.534],
            [-31.882, 6.575],
            [-33.008, 6.634],
            [-34.133, 6.709],
            [-35.257, 6.801],
            [-36.379, 6.91],
            [-37.5, 7.035],
            [-38.618, 7.177],
            [-39.735, 7.335],
            [-40.849, 7.51],
            [-41.96, 7.702],
            [-43.068, 7.909],
            [-44.173, 8.134],
            [-45.275, 8.375],
            [-46.373, 8.632],
            [-47.467, 8.905],
            [-48.557, 9.194],
            [-49.642, 9.5],
            [-82.5, 9.5],
            [-82.5, -9.5],
            [-49.642, -9.5],
            [-48.557, -9.194],
            [-47.467, -8.905],
            [-46.373, -8.632],
            [-45.275, -8.375],
            [-44.173, -8.134],
            [-43.068, -7.909],
            [-41.96, -7.702],
            [-40.849, -7.51],
            [-39.735, -7.335],
            [-38.618, -7.177],
            [-37.5, -7.035],
            [-36.379, -6.91],
            [-35.257, -6.801],
            [-34.133, -6.709],
            [-33.008, -6.634],
            [-31.882, -6.575],
            [-30.755, -6.534],
            [-29.628, -6.508],
            [-28.5, -6.5],
            [28.5, -6.5],
            [29.628, -6.508],
            [30.755, -6.534],
            [31.882, -6.575],
            [33.008, -6.634],
            [34.133, -6.709],
            [35.257, -6.801],
            [36.379, -6.91],
            [37.5, -7.035],
            [38.618, -7.177],
            [39.735, -7.335],
            [40.849, -7.51],
            [41.96, -7.702],
            [43.068, -7.909],
            [44.173, -8.134],
            [45.275, -8.375],
            [46.373, -8.632],
            [47.467, -8.905],
            [48.557, -9.194],
            [49.642, -9.5],
            [82.5, -9.5],
            [82.5, 9.5]
            ];

            if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

            var container, stats;
            var camera, scene, renderer;
            var particleMaterial;

            var raycaster;
            var mouse;

            init();
            animate();

            function init() {

                scene = new THREE.Scene();
                // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor( 0xffffff  );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );

                container = document.getElementById( "container" );
                container.appendChild( renderer.domElement );

                // camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
                // camera = new THREE.OrthographicCamera(300,300,300,300,300,300);
                camera = new THREE.OrthographicCamera( window.innerWidth / - 10, window.innerWidth / 10, window.innerHeight / 10, window.innerHeight / - 10, - 500, 1000 );
                camera.position.z = 100;

                controls = new THREE.OrbitControls( camera, renderer.domElement );
                //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = true;


                //Trackball zoom

                tb_controls = new THREE.TrackballControls( camera );

                tb_controls.rotateSpeed = 1.0;
                tb_controls.zoomSpeed = 1.2;
                tb_controls.panSpeed = 0.8;

                tb_controls.noZoom = false;
                tb_controls.noPan = false;

                tb_controls.staticMoving = true;
                tb_controls.dynamicDampingFactor = 0.3;

                tb_controls.keys = [ 65, 83, 68 ];

                tb_controls.addEventListener( 'change', render );


                // world

                // var geometry = new THREE.IcosahedronGeometry( 10, 0 );
                // var material =  new THREE.MeshPhongMaterial( { color:0xff0000, shading: THREE.FlatShading } );
                
                // var mesh = new THREE.Mesh( geometry, material );
                // mesh.position.x = 0;
                // mesh.position.y = 0;
                // mesh.position.z = 0;
                // mesh.updateMatrix();
                // mesh.matrixAutoUpdate = false;
                // scene.add( mesh );


                // Draw Helpers

                var axes = new THREE.AxisHelper(300);
                scene.add(axes);




                // Draw Line

                var material = new THREE.LineBasicMaterial({
                    color: 0xff0000,
                    linewidth: 5
                });

                var geometry = new THREE.Geometry();
                for ( var i = 0; i < pointsss.length; i ++ ) {
                    console.log(pointsss[i]);
                    geometry.vertices.push(new THREE.Vector3(pointsss[i][0], pointsss[i][1], 0.0));
                }


                var line = new THREE.Line(geometry, material);


                scene.add(line);


                // Gird Helper
                var grid = new THREE.GridHelper( 100, 10 );
                grid.rotation.x = Math.PI / 2;
                scene.add(grid);



                // Draw Particle
                var particle_geom = new THREE.Geometry();

                particle_geom.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));

                particle_material = new THREE.PointsMaterial({
                  color: 0xFF0000
                });

                var particle_system = new THREE.Points(
                    particle_geom,
                    particle_material
                    );

                scene.add(particle_system);



                // for ( var i = 0; i < 500; i ++ ) {

                //     var mesh = new THREE.Mesh( geometry, material );
                //     mesh.position.x = ( Math.random() - 0.5 ) * 1000;
                //     mesh.position.y = ( Math.random() - 0.5 ) * 1000;
                //     mesh.position.z = ( Math.random() - 0.5 ) * 1000;
                //     mesh.updateMatrix();
                //     mesh.matrixAutoUpdate = false;
                //     scene.add( mesh );

                // }

                // lights

                light = new THREE.DirectionalLight( 0xffffff );
                light.position.set( 1, 1, 1 );
                scene.add( light );

                light = new THREE.DirectionalLight( 0x002288 );
                light.position.set( -1, -1, -1 );
                scene.add( light );

                light = new THREE.AmbientLight( 0x222222 );
                scene.add( light );

                //

                stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.top = '0px';
                stats.domElement.style.zIndex = 50;
                container.appendChild( stats.domElement );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                // camera.aspect = window.innerWidth / window.innerHeight;
                // camera.updateProjectionMatrix();

                camera.left = window.innerWidth / - 2;
                camera.right = window.innerWidth / 2;
                camera.top = window.innerHeight / 2;
                camera.bottom = window.innerHeight / - 2;

                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

                tb_controls.handleResize();

            }

            function animate() {

                requestAnimationFrame( animate );

                controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

                tb_controls.update();


                stats.update();

                render();

            }

            function render() {

                camera.lookAt( scene.position );
                renderer.render( scene, camera );

            }
