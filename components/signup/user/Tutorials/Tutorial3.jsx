import React, { Suspense, useState, useRef } from 'react';
import styles from "../signup.module.css";
import { Canvas } from '@react-three/fiber';
import TutorialAvatar from '../../../characters/TutorialAvatar';

const Tutorial3 = ({ onNext }) => {
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
                <h3 style={{ fontSize: "20px" }}>First step done!</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  Thank you for providing the required information! Those informations were essential for us to evaluate 
                  you health data and provide you with the best health assitant in the market! In this step we are asking for non-essential 
                  information that you can choose not to answer (but we would be apreciate if you do). Click "Next" to continue.
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
 
export default Tutorial3;