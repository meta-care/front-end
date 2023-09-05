import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


const AvatarDisplay = ({ containerRef }) => {
    let camera, scene, renderer, ambientLight;
    let character;

    useEffect(() => {
    function init() {


      // Camera setup
      const AspectRatio = 9 / 16; // Height:Width ratio
      camera = new THREE.PerspectiveCamera(30, AspectRatio, 0.1, 100);
      camera.position.set(0, 4, 5);
   
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      // Ambient light setup
      ambientLight = new THREE.AmbientLight(0xffffff, 2.8); // Color, Intensity
      scene.add(ambientLight);
   
      // DRACO loader setup
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
   
      // GLTF loader setup
      const characterUrl = 'https://models.readyplayer.me/64ea14524a8548d9bc0b6d76.glb';
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader); // If using DRACOLoader
      loader.load(characterUrl, function (gltf) {
        character = gltf.scene;
        character.position.set(0, 1.1, 0); //Character position
        scene.add(character);
        render();
      });
      
   
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);

      const container = containerRef.current;
      console.log('container', container);
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
   
      // OrbitControls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableRotate = true; // Allow rotation around Y-axis
      controls.enableZoom = false;
      controls.enablePan = true;
      controls.minDistance = 3; // Minimum distance from the object
      controls.maxDistance = 10; // Maximum distance from the object
      controls.minPolarAngle = Math.PI / 2.3; // Lock vertical rotation (min angle)
      controls.maxPolarAngle = Math.PI / 2.3; // Lock vertical rotation (max angle)
      controls.target.set(0, 2, 0); // Set the initial target of the camera
      controls.addEventListener('change', render);
      controls.target.set(0, 2, 0);
      controls.update();
   
      // Resize event listener
      window.addEventListener('resize', onWindowResize);
      render();
   }

   // Define onWindowResize function
   function onWindowResize() {
    const container = containerRef.current;
  
    // Check if container exists
    if (container) {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    render();
    }
  }
   
  function render() {
  renderer.render(scene, camera);
  }

  // Call the init function to start
  init();

  // Clean up
  return () => {
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
      canvasElement.remove();
    }
    
  };
}, [containerRef]);
  
    return null;
  };

export default AvatarDisplay;
