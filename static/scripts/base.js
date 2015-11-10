

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

                camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.z = 500;

                controls = new THREE.OrbitControls( camera, renderer.domElement );
                //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = false;


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




                var material = new THREE.LineBasicMaterial({
                    color: 0x000000,
                    linewidth: 5
                });

                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(-100, 0, 0));
                geometry.vertices.push(new THREE.Vector3(0, 100, 0));
                geometry.vertices.push(new THREE.Vector3(100, 0, 0));



                var line = new THREE.Line(geometry, material);


                scene.add(line);






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
                stats.domElement.style.zIndex = 100;
                container.appendChild( stats.domElement );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
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

                renderer.render( scene, camera );

            }
