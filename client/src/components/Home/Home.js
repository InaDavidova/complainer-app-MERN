import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.main}>

        <div className={styles.infoDiv}>
          <div>
            <p><span>Dear customer</span>,</p>  
            <p>
              As part of our commitment to provide a high standard of customer
              service, we created this application to help you raise a complaint
              about a faulty product you have purchased from us.
            </p>

            <Link to="/form">Raise a complaint</Link>

            <p>
              Please follow this link and submit the form. One of our technicians
              will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
