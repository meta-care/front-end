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
        <form onSubmit={subscribe} className={styles.waitlistForm}>
            <input type="email" placeholder="Enter your email"
            className={styles.inputWaitlist}/>
            <button type="submit"
            className={styles.button}>
                Subscribe
            </button>
        </form>
     );
}
 
export default SubscribeForm;