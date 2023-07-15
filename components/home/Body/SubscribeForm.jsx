import styles from "./body.module.css";

//We should preform the backend to store the user's email

const SubscribeForm = () => {
    return ( 
        <div className={styles.waitlistForm}>
            <input type="email" placeholder="Enter your email"
            className={styles.inputWaitlist}/>
            <button type="submit"
            className={styles.button}>
                Submit
            </button>
        </div>
     );
}
 
export default SubscribeForm;