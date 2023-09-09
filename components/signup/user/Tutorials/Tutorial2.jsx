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
                <h3 style={{ fontSize: "20px" }}>Why we need some informations?</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  We at Metacare believe that the internet should be transparent and trustless. We require some personal 
                  information in order to provide a personalized health recommendation experience. Our business model is NOT 
                  personal data selling, although, in order to provide you with the best recommendations and experience, your 
                  ANONIMOUS data may be used to train an AI model. 
                </p>
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={onNext}
                >
                  Finish
                </button>
              </div>
            </div>
        </div>
      </div>
);

    
}
 
export default Tutorial1;