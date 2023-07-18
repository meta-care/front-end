import styles from "./ProfessionalsForm.module.css";
import { useRouter } from "next/router";

const ProfessionalsForm = () => {
    const router = useRouter();
    return (
    <div style={{marginTop: 30}} className={styles.formContainer}>
        <h1 style={{marginBottom: 50}}>Request early access</h1>
        <form onSubmit="{subscribe}" >
            {/* First and Last Name */}
            <div className={styles.formLine}>
            <div className={styles.formFieldInLine}>
                <label htmlFor="firstNameInput" className={styles.formLabel}>
                First Name:
                </label>
                <input type="text" id="firstNameInput" name="firstName" className={styles.formInput} />
            </div>
            <div style={{marginLeft: 25}} className={styles.formFieldInLine}>
                <label htmlFor="lastNameInput" className={styles.formLabel}>
                Last Name:
                </label>
                <input type="text" id="lastNameInput" name="lastName" className={styles.formInput} />
            </div>
            </div>
            {/* Professional Info */}
            <div className={styles.formLine}>
            <div className={styles.formFieldInLine}>
                <label htmlFor="occupation" className={styles.formLabel}>
                Occupation:
                </label>
                <input type="text" id="occupation" name="occupation" className={styles.formInput} />
            </div>
            <div style={{marginLeft: 25}} className={styles.formFieldInLine}>
                <label htmlFor="medicalSpecialty" className={styles.formLabel}>
                Medical Specialty:
                </label>
                <input type="text" id="medicalSpecialty" name="medicalSpecialty" className={styles.formInput} />
            </div>
            </div>
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