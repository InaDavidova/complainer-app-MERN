import { useState } from "react";
import { createPost } from "../../api/index.js";
import styles from './Form.module.css';
import FileBase from "react-file-base64";
import dateFormater from './dateFormater.js';
import validator from 'validator';

export default function Form(props) {
  const [selectedFile, setFile] = useState("");
  const [errors, setErrors] = useState({});

  const laptopTypes = ["Lenovo P50", "Lenovo P50s", "Lenovo P51", "Lenovo P51s", "Lenovo P52", "Lenovo P52s"];
  const issues = ["Brocken screen", "Broken keyboard", "Physical damage - other", "Laptop crashing", "Software missing", "Other"];

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

    function inputValidator(userInputData){
      console.log(userInputData);
      const errorsData = {};
      const serialNoRgx = /^[a-zA-Z\d]{5}-[a-zA-Z\d]{6}$/gm;

      if(userInputData.laptopType === "-- select an option --"){
        errorsData.laptopType = "Please select a laptop type!";
      }

      if(userInputData.issue ===  "-- select an option --"){
        errorsData.issue = "Please select a laptop type!";
      }

      if(!userInputData.notes){
        errorsData.notes = "Please add some notes describing the problem!"
      }

      if(serialNoRgx.exec(userInputData.serialNo) === null){
        errorsData.serialNo = "Please add a valid serial number! Example: 3rD7a-pO9iu"
      }

      if(!userInputData.date){
        errorsData.date = "Please enter the date this problem occured!"
      }

      if(!userInputData.name){
        errorsData.name = "Please enter your name!"
      }

      if(!validator.isEmail(userInputData.email)){
        errorsData.email = "Please enter a valid email!"
      }

      return errorsData;
    }

    const errObj = inputValidator(newPost);
    try {
      if(Object.keys(errObj).length === 0){

        setErrors(inputValidator(newPost));
        createPost(newPost);
        console.log("Should be created");
        props.history.push("/posts");
      } else{
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
      <h2>Form Page</h2>
      <form onSubmit={onFormSubmit}>

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
