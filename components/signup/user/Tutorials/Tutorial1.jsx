import React, { Suspense, useState, useRef } from 'react';
import styles from "../signup.module.css";
import { Canvas } from '@react-three/fiber';
import TutorialAvatar from '../../../characters/TutorialAvatar';

const Tutorial1 = ({ onNext }) => {
    const productCanvasRef = useRef();


    return ( 
      <div className={styles.tutorial_overlay}>
        <div className={styles.tutorial_content}>
            <div style={{ width:"85%", display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
              <div className={styles.avatar_container} ref={productCanvasRef}>
                <Suspense fallback={"null"}>
                  <Canvas>
                    <TutorialAvatar containerRef={productCanvasRef}/>
                  </Canvas>
                </Suspense>
              </div>
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Welcome to Metacare Health!</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  Your journey for an healthier future just started! I'm Alberto, doctor and CEO of Metacare Health. 
                  In this small onboarding I'm going to quickly explain our mission and let you know our privacy terms. Click on "Next"
                  to continue.
                </p>
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </div>
        </div>
      </div>
);

    
}
 
export default Tutorial1;