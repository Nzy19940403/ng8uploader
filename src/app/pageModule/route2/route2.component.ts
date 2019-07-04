import { Component, OnInit } from '@angular/core';
//  import SiriWave from 'siriwave'
// const a = require('siriwave')

import * as THREE from 'three'
import * as FBXLoader from 'three-fbxloader-offical'
import * as OrbitControls from 'three-orbitcontrols'
@Component({
  selector: 'app-route2',
  templateUrl: './route2.component.html',
  styleUrls: ['./route2.component.css']
})
export class Route2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    // let container,controls,camera,scene,render,light,mixer

    // init()
    // animate()

    // function init(){
    //   container = document.createElement( 'div' );
    //             document.body.appendChild( container );

    //   camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2000)
    //   camera.position.set(100,200,300)

    //   scene = new THREE.Scene()
    //   scene.background = new THREE.Color(0xa0a0a0)
    //   scene.fog = new THREE.Fog(0xa0a0a,200,1000)

    //   light = new THREE.DirectionalLight( 0xffffff );
    //   light.position.set( 0, 200, 100 );
    //   light.castShadow = true;
    //   light.shadow.camera.top = 180;
    //   light.shadow.camera.bottom = -100;
    //   light.shadow.camera.left = -120;
    //   light.shadow.camera.right = 120;
    //   scene.add( light );

    //   let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000,2000),new THREE.MeshPhongMaterial({color:0x999999,depthWrite:false}));
    //   mesh.rotation.x = - Math.PI/2
    //   mesh.receiveShadow = true
    //   scene.add(mesh)

    //   let grid = new THREE.GridHelper(2000,20,0x000000,0x000000)
  
    //   grid.material['opacity'] =0.2
    //   grid.material['transparent'] = true
    //   scene.add(grid)

    //   let loader = new FBXLoader()
    //   loader.load('../../../assets/飞船.fbx',function(object){
    //     mixer = new THREE.AnimationMixer(object)

    //     let action = mixer.clipAction(object.animations[0])
    //     action.play()

    //     object.traverse( function ( child ) {
    //       if ( child.isMesh ) {
    //         child.castShadow = true;
    //         child.receiveShadow = true;
    //       }
    //     } );
    //     scene.add( object );
    //   })

    //   render = new THREE.WebGLRenderer({antialias:true})
    //   // render.setPixelRation(window.devicePixelRatio)

    //   render.setSize(window.innerWidth,window.innerHeight)
    //   render.shadowMap.enabled = true
    //   container.appendChild(render.domElement)

    //   controls = new OrbitControls(camera,render.domElement)
    //   controls.target.set(0,100,0)
    //   controls.update()


    // }
    // function animate(){

    // }
    var container, stats, controls;
            var camera, scene, renderer, light;

            var clock = new THREE.Clock();

            var mixers = [];

            init();
            animate();

            function init() {

                // container = document.createElement( 'div' );
                // document.body.appendChild( container );
                container = document.getElementById('canvas')
                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
                camera.position.set( 30, 50, 30 );

                controls = new OrbitControls( camera );
                controls.target.set( 0, 100, 0 );
                controls.update();

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0xa0a0a0 );
                // scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );


                var ambient = new THREE.AmbientLight(0xffffff);
              scene.add(ambient); //将环境光添加到场景中

                light = new THREE.HemisphereLight( 0x444444, 0x444444,1 );
                light.position.set( 0, 0, 100 );

                let light2 = new THREE.HemisphereLight( 0x444444, 0x444444,1 );
                light2.position.set( 3000, 3000, 1000 );
                scene.add( light );
                // scene.add( light2 );
                light = new THREE.DirectionalLight( 0xffffff );
                // light.position.set( 6000, 6000, 6100 );
                light.castShadow = true;
                // light.shadow.camera.top = 180;
                // light.shadow.camera.bottom = -100;
                // light.shadow.camera.left = -120;
                // light.shadow.camera.right = 120;
                // scene.add( light );

                // scene.add( new THREE.CameraHelper( light.shadow.camera ) );

                // ground
                // var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 20000, 20000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
                // mesh.rotation.x = - Math.PI / 2;
                // mesh.receiveShadow = true;
                // scene.add( mesh );

                // var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
                // grid.material['opacity'] = 0.2;
                // grid.material['transparent'] = true;
                // scene.add( grid );

                // model
                var loader = new FBXLoader();
                loader.load( '/assets/test3.fbx', function ( object ) {
                 
                    object.mixer = new THREE.AnimationMixer( object );
                    mixers.push( object.mixer );

                    var action = object.mixer.clipAction( object.animations[ 0 ] );
                    action.play();

                    object.traverse( function ( child ) {

                        if ( child.isMesh ) {

                            child.castShadow = true;
                            child.receiveShadow = true;

                        }

                    } );

                    scene.add( object );

                } );

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.shadowMap.enabled = true;
                container.appendChild( renderer.domElement );

                // window.addEventListener( 'resize', onWindowResize, false );

       

            }

            

            //

            function animate() {

                requestAnimationFrame( animate );

                // if ( mixers.length > 0 ) {

                //     for ( var i = 0; i < mixers.length; i ++ ) {

                //         mixers[ i ].update( clock.getDelta() );

                //     }

                // }

                renderer.render( scene, camera );

                // stats.update();

            }
  }
 

}
