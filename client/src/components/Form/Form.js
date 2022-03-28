import { useState } from "react";
import { createPost } from "../../api/index.js";
import styles from './Form.module.css';
import FileBase from "react-file-base64";
import dateFormater from './dateFormater.js';
import inputValidator from './inputValidator.js';
import laptopTypes from './laptopTypes.js';
import issues from './issues.js';

export default function Form() {
  const [selectedFile, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [popUp, setPopUp] = useState(false);

  async function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [laptopType, issue, notes, serialNo, date, name, email] = formData.values();

    const newPost = {
      laptopType: laptopType,
      issue: issue,
      notes: notes.trim(),
      serialNo: serialNo.trim(),
      date: date,
      name: name.trim(),
      email: email.trim(),
      selectedFile: selectedFile,
    };

    try {
      const errObj = inputValidator(newPost);

      if (Object.keys(errObj).length === 0) {
        setErrors(inputValidator(newPost));
        await createPost(newPost);
        e.target.reset();
        setPopUp(true);

      } else {
        setErrors(errObj);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function inputChangeHandler(e){
    const inputName = e.target.name;
    const updatedErrors = {...errors};
    delete updatedErrors[inputName];
    setErrors(updatedErrors);
  }
  
  function hidePopUp(){
    setPopUp(false);
  }

  return (
    <div className={styles.main}>
      <div>
        <div>
          <h1>Create Form</h1>
          <form onSubmit={onFormSubmit} className={styles.createForm}>
            <label htmlFor="laptopType">
              Laptop Type <span>*</span>
            </label>
            <select
              name="laptopType"
              id="laptopType"
              onChange={inputChangeHandler}
            >
              <option>-- select an option --</option>
              {laptopTypes.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            {errors.laptopType && (
              <p className={styles.error}>{errors.laptopType}</p>
            )}

            <label htmlFor="issue">
              Issue <span>*</span>
            </label>
            <select name="issue" id="issue" onChange={inputChangeHandler}>
              <option>-- select an option --</option>
              {issues.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            {errors.issue && <p className={styles.error}>{errors.issue}</p>}

            <label htmlFor="notes">
              Notes <span>*</span>
            </label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Please add here any notes ..."
              onChange={inputChangeHandler}
            />
            {errors.notes && <p className={styles.error}>{errors.notes}</p>}

            <label htmlFor="serialNo">
              {" "}
              Serial number <span>*</span>
            </label>
            <input
              name="serialNo"
              id="serialNo"
              placeholder="Serial number"
              onChange={inputChangeHandler}
            />
            {errors.serialNo && (
              <p className={styles.error}>{errors.serialNo}</p>
            )}

            <label htmlFor="date">
              Date <span>*</span>
            </label>
            <input
              name="date"
              id="date"
              type="date"
              max={dateFormater()}
              onChange={inputChangeHandler}
            />
            {errors.date && <p className={styles.error}>{errors.date}</p>}

            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <input
              name="name"
              id="name"
              placeholder="Please enter your name ..."
              onChange={inputChangeHandler}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              name="email"
              id="email"
              placeholder="Please enter your email ..."
              onChange={inputChangeHandler}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <label htmlFor="fileBtn">Picture</label>
            <FileBase
              type="file"
              id="fileBtn"
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />

            <p>
              All fields marked with an asterisk (<span>*</span>) are required
            </p>
            <button>Submit</button>
          </form>
        </div>
      </div>
        {popUp && (
          <div className={styles.notificationDiv}>
            <div className={styles.notificationDivContent}>
              <p>You have successfully filed a complaint!</p>
              <button onClick={hidePopUp}>OK</button>
            </div>
          </div>
        )}
    </div>
  );
}
