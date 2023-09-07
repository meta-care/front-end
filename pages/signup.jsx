import React, { useState } from 'react';
import { useRouter } from "next/router";

const RegistrationForm = () => {
    const router = useRouter();

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
    
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <p>Disclaimer</p>
        <div>
        <label htmlFor="dateOfBirth">Date of Birth<span style={{color:"red"}}>*</span>:</label>
        <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
        />
        </div>
        <div>
          <label htmlFor="height">Height (cm)<span style={{color:"red"}}>*</span>:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight (kg)<span style={{color:"red"}}>*</span>:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
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
        <div>
        <button onClick={() => router.push("/createAvatar")}>Create Avatar</button>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;