import { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei'

export function FemaleModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Female.glb')
  const { actions, mixer } = useAnimations(animations, group)
  
   // Define animation durations
   const animationDurations = {
    Wave: 4.5,
    Idle: 10,
  };

  // Function to handle animation transitions
  const handleAnimation = async (fromAction, toAction, fadeInDuration = 0.3) => {
    if (fromAction !== null) {
      fromAction.fadeOut(fadeInDuration);
    }

    // Start the new action
    toAction.fadeIn(fadeInDuration);
    toAction.play();

    // Wait for the new action to finish
    await new Promise((resolve) => {
      const checkFinished = () => {
        if (toAction.time >= toAction.getClip().duration) {
          toAction.getMixer().removeEventListener('finished', checkFinished);
          resolve();
        }
      };
      toAction.getMixer().addEventListener('finished', checkFinished);
    });

    if (fromAction !== null) {
      fromAction.stop();
    }
  };

  useEffect(() => {
    mixer.stopAllAction();

    if (props.currentAnimation === 'Wave') {
      handleAnimation(actions.Idle, actions.Wave);
      setTimeout(() => {
        handleAnimation(actions.Wave, actions.Idle);
      }, animationDurations.Wave * 1000);
    } else if (props.currentAnimation === 'Idle') {
      handleAnimation(null, actions.Idle);
    }
  }, [props.currentAnimation, actions]);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -3.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.033}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch02_Body" geometry={nodes.Ch02_Body.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Body.skeleton} />
          <skinnedMesh name="Ch02_Cloth" geometry={nodes.Ch02_Cloth.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Cloth.skeleton} />
          <skinnedMesh name="Ch02_Eyelashes" geometry={nodes.Ch02_Eyelashes.geometry} material={materials.Ch02_hair} skeleton={nodes.Ch02_Eyelashes.skeleton} />
          <skinnedMesh name="Ch02_Hair" geometry={nodes.Ch02_Hair.geometry} material={materials.Ch02_hair} skeleton={nodes.Ch02_Hair.skeleton} />
          <skinnedMesh name="Ch02_Sneakers" geometry={nodes.Ch02_Sneakers.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Sneakers.skeleton} />
          <skinnedMesh name="Ch02_Socks" geometry={nodes.Ch02_Socks.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Socks.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Female.glb')

export default FemaleModel;