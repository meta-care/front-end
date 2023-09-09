import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const TutorialAvatar = ({ containerRef }) => {
  let camera, scene, renderer, ambientLight;
  let character;
  let mixer; // Animation mixer

  // Clock for updating the mixer
  const clock = new THREE.Clock();

  useEffect(() => {
    function init() {
      // Camera setup
      const AspectRatio = 9 / 16; // Height:Width ratio
      camera = new THREE.PerspectiveCamera(30, AspectRatio, 0.1, 100);
      camera.position.set(0, 4, 1);

      // Scene setup
      scene = new THREE.Scene();
      scene.background = null;

      // Ambient light setup
      ambientLight = new THREE.AmbientLight(0xffffff, 2.8); // Color, Intensity
      scene.add(ambientLight);

      // DRACO loader setup
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

      // GLTF loader setup for character
      const characterUrl = 'https://models.readyplayer.me/64fb08e90a22f8785ae573b1.glb';
      const characterLoader = new GLTFLoader();
      characterLoader.setDRACOLoader(dracoLoader); // If using DRACOLoader
      characterLoader.load(characterUrl, function (gltf) {
        character = gltf.scene;

        // Assuming your GLB character has a skeletal structure, add it to the scene
        character.position.set(0, 1.85, 2); // Character position
        scene.add(character);

        character.traverse(function(node) {
            if (node.isMesh) {
                node.morphTargetInfluences[node.morphTargetDictionary.mouthSmile] = 0.3;
            }
        });

        // Render the scene immediately after adding the character
        render();

      });

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // OrbitControls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableRotate = false; // Allow rotation around Y-axis
      controls.enableZoom = false;
      controls.enablePan = false;
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
      onWindowResize();

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
      if (mixer) {
        mixer.update(0.01); // Update the animation mixer
      }
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

export default TutorialAvatar;