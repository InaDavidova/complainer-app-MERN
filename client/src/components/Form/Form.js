import { useState } from "react";
import { createPost } from "../../api/index.js";
import styles from './Form.module.css';
import FileBase from "react-file-base64";
import dateFormater from './dateFormater.js';
import inputValidator from './inputValidator.js';
import laptopTypes from './laptopTypes.js';
import issues from './issues.js';

export default function Form(props) {
  const [selectedFile, setFile] = useState("");
  const [errors, setErrors] = useState({});

  function onFormSubmit(e) {
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
        createPost(newPost);
        props.history.push("/");

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

  return (
    <>
      <h1>Create Form</h1>
      <form onSubmit={onFormSubmit} className={styles.createForm}>

        <label htmlFor="laptopType">Laptop Type *</label>
        <select name="laptopType" id="laptopType" onChange={inputChangeHandler}>
          <option>-- select an option --</option>
          {laptopTypes.map((el, i) => <option key={i}>{el}</option>)}
        </select>
        {errors.laptopType && <p className={styles.error}>{errors.laptopType}</p>}

        <label htmlFor="issue">Issue *</label>
        <select name="issue" id="issue" onChange={inputChangeHandler}>
          <option>-- select an option --</option>
          {issues.map((el, i) => <option key={i}>{el}</option>)}
        </select>
        {errors.issue && <p className={styles.error}>{errors.issue}</p>}

        <label htmlFor="notes">Notes *</label>
        <textarea name="notes" id="notes" placeholder="Please add here any notes ..." onChange={inputChangeHandler} />
        {errors.notes && <p className={styles.error}>{errors.notes}</p>}
        
        <label htmlFor="serialNo"> Serial number *</label>
        <input name="serialNo" id="serialNo" placeholder="Serial number" onChange={inputChangeHandler}/>
        {errors.serialNo && <p className={styles.error}>{errors.serialNo}</p>}
        
        <label htmlFor="date">Date *</label>
        <input name="date" id="date" type="date" max={dateFormater()} onChange={inputChangeHandler}/>
        {errors.date && <p className={styles.error}>{errors.date}</p>}
        
        <label htmlFor="name">Name *</label>
        <input name="name" id="name" placeholder="Please enter your name ..." onChange={inputChangeHandler}/>
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        
        <label htmlFor="email">Email *</label>
        <input name="email" id="email" placeholder="Please enter your email ..." onChange={inputChangeHandler}/>
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        
        <label htmlFor="picture">Picture</label>
        <FileBase type="file" multiple={false} onDone={({base64}) => setFile(base64)} />
        
        <p>All fields marked with an asterisk (*) are required</p>
        <button>Submit</button>
      </form>
    </>
  );
}
