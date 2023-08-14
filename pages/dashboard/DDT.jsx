import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import MaleModel from '../../components/characters/MaleModel';
import FemaleModel from '../../components/characters/FemaleModel.jsx';


function DDT() {
  const ref = useRef();

  const [currentModel, setCurrentModel] = useState('female');
  
  const handleModelChange = (model) => {
    setCurrentModel(model);
  };

   // State to track current animation
   const [currentAnimation] = useState('Wave');

  return (
    <div className="App">
      <div className="wrapper">
          <div className="product-canvas">
            <Canvas>
                <Suspense fallback={null}>
                <ambientLight intensity={1.5}/> 
                <OrbitControls enablePan={false}
                              enableZoom ={false}
                              enableRotate = {true}
                              maxPolarAngle={Math.PI/2.7}
                              minPolarAngle={Math.PI/2.7}
                              maxAzimuthAngle={0}/>
                {currentModel === 'male' ? <MaleModel currentAnimation={currentAnimation} /> : <FemaleModel currentAnimation={currentAnimation} />}
                </Suspense>
            </Canvas>  
          </div>
          <div className="buttons">
            <button onClick={() => handleModelChange('male')}>Male</button>
            <button onClick={() => handleModelChange('female')}>Female</button>
          </div>  
      </div>
    </div>
  );
}

export default DDT;