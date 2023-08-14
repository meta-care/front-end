import { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei'


function MaleModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Male.glb')
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
          <primitive object={nodes.mixamorig7Hips} />
          <skinnedMesh name="Ch08_Beard" geometry={nodes.Ch08_Beard.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Beard.skeleton} />
          <skinnedMesh name="Ch08_Body" geometry={nodes.Ch08_Body.geometry} material={materials.Ch08_body} skeleton={nodes.Ch08_Body.skeleton} />
          <skinnedMesh name="Ch08_Eyelashes" geometry={nodes.Ch08_Eyelashes.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Eyelashes.skeleton} />
          <skinnedMesh name="Ch08_Hair" geometry={nodes.Ch08_Hair.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Hair.skeleton} />
          <skinnedMesh name="Ch08_Hoodie" geometry={nodes.Ch08_Hoodie.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Hoodie.skeleton} />
          <skinnedMesh name="Ch08_Pants" geometry={nodes.Ch08_Pants.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Pants.skeleton} />
          <skinnedMesh name="Ch08_Sneakers" geometry={nodes.Ch08_Sneakers.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Sneakers.skeleton} />
          </group>
        </group>
      </group>
  )
}

useGLTF.preload('/Male.glb')

export default MaleModel;