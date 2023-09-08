import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./signup.module.css";

const RegistrationForm = () => {
    const router = useRouter();

    //State for the tutorial
    const [showTutorial, setShowTutorial] = useState(false);

    // State to manage form fields
    const [formData, setFormData] = useState({
      dateOfBirth: '', // Add the dateOfBirth field
      height: '',
      weight: '',
      knownDiseases: 'None',
    });

    // Define an array of disease options
    const diseaseOptions = ['None', 'Hypertension', 'Diabetes', 'Asthma', 'Other'];

    // State to manage the selected avatar
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };  

    // Handle avatar selection
    const handleAvatarSelection = (avatar) => {
      setSelectedAvatar(avatar);
    };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here, you can send the form data to your server or perform any desired action
      // You can access the form data via the formData state
      console.log('Form Data:', formData);
      // You can also access the selected avatar via the selectedAvatar state
      console.log('Selected Avatar:', selectedAvatar);
    };

  return (
    
    <div className={styles.signupForm}>
      <img
          style={{ margin: "0 auto" }}
					src={"/logo.png"}
					width="200px"
					height="197px"/>
      <h2>User Registration</h2>
      <div style={{ height: "100%", marginBottom: "5%"}}>
        <form 
        onSubmit={handleSubmit} 
        style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
          
          <div className={styles.inputField}>
            <label htmlFor="dateOfBirth">Date of Birth <span style={{color:"red"}}>*</span>:</label>
            <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="height">Height (cm) <span style={{color:"red"}}>*</span>:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
              style={{ maxWidth: "100px" }} // Set a maximum width
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="weight">Weight (kg) <span style={{color:"red"}}>*</span>:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
              style={{ maxWidth: "100px" }} // Set a maximum width
            />
          </div>
          <div className={styles.inputField}>
              <label htmlFor="knownDiseases">Known Diseases:</label>
              <select
                  id="knownDiseases"
                  name="knownDiseases"
                  value={formData.knownDiseases}
                  onChange={handleInputChange}
              >
                  {diseaseOptions.map((option) => (
                  <option key={option} value={option}>
                      {option}
                  </option>
                  ))}
              </select>
              </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
            <h5>Create you avatar:</h5>
          <button 
          style={{height:"50%"}}
          onClick={() => router.push("/createAvatar")}>Create Avatar</button>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;