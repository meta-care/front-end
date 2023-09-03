import { useEffect } from "react";
import styles from "./DataVisualization.module.css";

const DataVisualization = () => {
    
    useEffect(() => {
    // Assume you have fetched the value and stored it in the variable 'fetchedValue'
    const fetchedValue = 50; // Example fetched value

    // Calculate the position of the slider within the chart
    const chart = document.querySelector(`.${styles.chart}`);
    const slider = document.querySelector(`.${styles.slider}`);
    const sliderWidth = slider.clientWidth;
    const chartWidth = chart.clientWidth;
    const maxSliderPosition = chartWidth - sliderWidth;
    const sliderPosition = (fetchedValue / 100) * maxSliderPosition;

    // Update the slider's left position
    slider.style.left = sliderPosition + "px";

  }, []);
    
    return ( 
        <div className={styles.chartWrapper}>
            <div className={styles.chart}>
                <div className={styles.redSection}></div>
                <div className={styles.yellowSection}></div>
                <div className={styles.greenSection}></div>
                <div className={styles.yellowSection2}></div>
                <div className={styles.redSection2}></div>
            </div>
            <div className={styles.slider}>
                <div className={styles.sliderBall}></div>
                <div className={styles.sliderLine}></div>
            </div>
        </div>
     );
}
 
export default DataVisualization;