import styles from "./body.module.css";
import { useState } from "react";
// Example taken from: https://codewithmarish.com/post/newsletter-subscription-using-next-js-and-mailchimp-api



const SubscribeForm = () => {
    const [state, setState] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
  // 0 - initial , 1 - loading, 2 - success, 2 - error
    const subscribe = async (e) => {
      e.preventDefault();

      setState(1);
      setErrorMsg("");
      console.log(e.target[0].value);
      try {
        const res = await fetch("../../api/newsletter", {
          method: "POST",
          body: e.target[0].value,
        });

        const data = await res.json();
        if (data.error !== null) {
          throw data.error;
        }
        setState(2);
      } catch (e) {
          setErrorMsg(e);
        setState(3);
      }
  };
    return ( 
      <div>
      {/* The user successfully subscribed*/}
      {state === 2 && (
        <div>
          <p style={{color: "green"}}>Thanks for subscribing!</p>
      </div>
      )}
      {/* Initial state of the form*/}
      {state === 0 && (
        <form onSubmit={subscribe} className={styles.waitlistForm}>
          <input type="email" placeholder="Enter your email"
          className={styles.inputWaitlist}/>
          <button type="submit"
          className={styles.button}>
            Subscribe
          </button>
        </form>
      )}
      {/* Form is loading (we can do some animation)*/}
      {state === 1 && (
        <form onSubmit={subscribe} className={styles.waitlistForm}>
          <input type="email" placeholder="Enter your email"
          className={styles.inputWaitlist}/>
          <button type="submit"
          className={styles.button}>
            Subscribe
          </button>
        </form>
      )}
      {/* Error during subscription (we can make other state for an email that already exists)
          But mailchimp doesn't store duplicates*/}
      {state === 3 && (
        <form onSubmit={subscribe} className={styles.waitlistForm}>
          <input type="email" placeholder="Enter your email"
          className={styles.inputWaitlist}/>
          <button type="submit"
          className={styles.button}>
            Subscribe
          </button>
          <div>
          <p className="subscriptionFail">Something went wrong, please try again</p>
          </div>
        </form>
        
        
      )}
    </div>
     );
}
 
export default SubscribeForm;