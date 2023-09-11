import React, { Suspense, useState, useRef } from 'react';
import { useRouter } from "next/router";
import styles from "../signup.module.css";
import { Canvas } from '@react-three/fiber';
import TutorialAvatar from '../../../characters/TutorialAvatar';

const Tutorial3 = ({ onNext }) => {
    const [tutorialStep, setTutorialStep] = useState(1);
    const router = useRouter();
    const productCanvasRef = useRef();

    const handleNextTutorialStep = () => {
      setTutorialStep(tutorialStep + 1);
    };

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

              {tutorialStep === 1 && (
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Let's create your own Avatar</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  Don't walk alone through this journey, just create your own Virtual Pal! This will be the representation of 
                  your Data Digital Twin, and to create your look alike Avatar takes less than 5 minutes. Just upload a photo 
                  and it's done! You can also create it without uploading a photo, but we encourage you to create it through a selfie 
                  (it's funnier and gives you a better user experience).

                  Click "Next" for a small guide on how to create your own Digital Twin Avatar.
                </p>
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={handleNextTutorialStep}
                >
                  Next
                </button>
              </div>
              )}

              {tutorialStep === 2 && (
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Step 1: Choose your body type.</h3>
                <img
                  src={"/Tutorial/choose_gender.JPG"}
                  width="488px"
                  height="282px"
                />
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={handleNextTutorialStep}
                >
                  Next
                </button>
              </div>
              )}

              {tutorialStep === 3 && (
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Step 2: Choose your creation method.</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  You can choose between taking a webcam photo, uploading a photo file, or create yours from scratch.
                </p>
                <img
                  src={"/Tutorial/creation_method.JPG"}
                  width="359px"
                  height="400px"
                />
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={handleNextTutorialStep}
                >
                  Next
                </button>
              </div>
              )}

              {tutorialStep === 4 && (
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Step 3: Upload your photo.</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  After uploading your photo, click "accept" and your Avatar will be automatically generated.
                </p>
                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <img
                  src={"/Tutorial/photo_imported.JPG"}
                  width="278.4px"
                  height="300px"
                />
                <p style={{fontSize: "50px", alignSelf: "center"}}> -&gt; </p>
                <img
                  src={"/Tutorial/avatar_created.JPG"}
                  width="124.32px"
                  height="300px"
                />
                </div>
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={handleNextTutorialStep}
                >
                  Next
                </button>
              </div>
              )}

              {tutorialStep === 5 && (
              <div className={styles.textAndButton}>
                <div style={{width: "100%"}}>
                <h3 style={{ fontSize: "20px" }}>Step 4: Costumize your Digital Twin.</h3>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  You can costumize it as you whish. Once You're finished, just "Next" on top-right corner to access the app!
                </p>
                <img
                  src={"/Tutorial/avatar_config.JPG"}
                  width="615px"
                  height="300px"
                />
                </div>
                <button
                  className={styles.tutorial_button}
                  onClick={() => {
                    onNext();
                    router.push('/createAvatar');
                  }}
                >
                  Create Avatar
                </button>
              </div>
              )}

            </div>
        </div>
      </div>
);

    
}
 
export default Tutorial3;