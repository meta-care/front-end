import styles from "./DoctorEarlyAccess.module.css";
import { useRouter } from "next/router";

const ProfessionalsForm = () => {
    const router = useRouter();
    return (
    <div style={{marginTop: 30}} className={styles.formContainer}>
        <h1 style={{marginBottom: 50}}>Request early access</h1>
        <form onSubmit="{subscribe}" >
            {/* Grid Field */}
            {/* First and Last Name */}
            <div style={{marginBottom: 50}} className={styles.gridField}>
                <div className={styles.formField}>
                    <label htmlFor="firstNameInput" className={styles.formLabel}>
                    First Name:
                    </label>
                    <input type="text" id="firstNameInput" name="firstName" className={styles.formInput} />
                </div>
                <div style={{marginLeft: 25}} className={styles.formField}>
                    <label htmlFor="lastNameInput" className={styles.formLabel}>
                    Last Name:
                    </label>
                    <input type="text" id="lastNameInput" name="lastName" className={styles.formInput} />
                </div>
            
                {/* Professional Info */}
                <div className={styles.formField}>
                    <label htmlFor="occupation" className={styles.formLabel}>
                        Occupation:
                    </label>
                    <select id="occupation" name="occupation" className={styles.formInput}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                </div>
                <div style={{marginLeft: 25}} className={styles.formField}>
                    <label htmlFor="medicalSpecialty" className={styles.formLabel}>
                    Specialty:
                    </label>
                    <select type="text" id="medicalSpecialty" name="medicalSpecialty" className={styles.formInput}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                </div>
            </div>
            {/* Grid Field Ends */}
            {/* Message */}
            <div>
            <label htmlFor="messageInput" className={styles.formLabel}>
                Message:
            </label>
            <textarea
                id="messageInput"
                name="message"
                rows="5"
                cols="40"
                placeholder="Tell us why you want to request early access"
                style={{marginTop: 25}}
                className={styles.formTextarea}
            ></textarea>
            </div>
            <input type="checkbox" id="termsCheckbox" name="termsCheckbox" className={styles.formCheckbox} />
            <label htmlFor="termsCheckbox">
                I accept the{' '}
                <span style={{ color: 'blue' }}>
                    <a href="/privacy">terms and conditions</a>
                </span>.
            </label>
        </form>
        <h3>If you want to provide more information <span style={{color: "blue"}}><a href="/">Click here</a></span>.</h3>
        <button 
        type="submit"
        style={{marginTop: 25}}
        className={styles.button}>
            Subscribe
        </button>
    </div>
    );
  };
  
  export default ProfessionalsForm;