import { useEffect, useRef, useState } from "react";
import styles from "./DataVisualization.module.css";

const DataVisualization = () => {
  const chartBarRef = useRef(null);
  const [percentageValue, setPercentageValue] = useState(98);

  useEffect(() => {
    if (chartBarRef.current) {
      const angle = `${percentageValue}%`;
      const compAngle = `${100 - percentageValue}%`;

       // Determine the color based on the percentageValue
       let color = "#00cc00"; // Default to green
       if (percentageValue < 30) {
         color = "red"; // Change to red if < 30
       } else if (percentageValue < 70) {
         color = "yellow"; // Change to yellow if < 70
       }

      // Set the background on the inner div with the class styles.chart_bar
      chartBarRef.current.style.background = `conic-gradient(
        ${color} 0% ${angle},
        transparent 0% ${angle},
        transparent 100% ${compAngle}
      )`;
    }
  }, [percentageValue]);

  return (
    <div className={styles.chart_container}>
      <div className={styles.chart}>
        <div className={styles.circular_background}></div>
        <div
          className={styles.chart_bar}
          ref={chartBarRef}
          style={{ width: "200px", height: "200px" }} // Set a fixed width and height
        ></div>
        <div className={styles.chart_image}>
          <img src="/heart.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
