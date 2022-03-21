import { useState } from "react";
import { createPost } from "../../api/index.js";
import styles from './Form.module.css';
import FileBase from "react-file-base64";

export default function Form() {
  const [file, setFile] = useState("");

  const laptopTypes = ["Lenovo P50", "Lenovo P50s", "Lenovo P51", "Lenovo P51s", "Lenovo P52", "Lenovo P52s"];
  const issues = ["Brocken screen", "Broken keyboard", "Physical damage - other", "Laptop crashing", "Software missing", "Other"];

  function dateFormater(){
    const timestamp = new Date();
    let day = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();

    
    if (day < 10) {
      day = "0" + day;
    }
    
    if (month < 10) {
      month = "0" + month;
    }

    return `${year}-${month}-${day}`;
  }

  function onFormSubmit(e){
    e.preventDefault();
      const formData = new FormData(e.target);
      const [type, issue, notes, serialNo, date, name, email] = formData.values();
      console.log(type, issue, notes, serialNo, date, name, email, file);
  }

  return (
    <>
      <h2>Form Page</h2>
      <form onSubmit={onFormSubmit}>

        <label htmlFor="type">Laptop Type</label>
        <select name="type" id="type">
          <option>-- select an option --</option>
          {laptopTypes.map((el, i) => <option key={i}>{el}</option>)}
        </select>

        <label htmlFor="issue">Issue</label>
        <select name="issue" id="issue">
          <option>-- select an option --</option>
          {issues.map((el, i) => <option key={i}>{el}</option>)}
        </select>

        <label htmlFor="notes">Notes</label>
        <textarea name="notes" id="notes" placeholder="Please add here any notes ..." />
        
        <label htmlFor="serialNo"> Serial number</label>
        <input name="serialNo" id="serialNo" placeholder="Serial number"/>
        
        <label htmlFor="date">Date</label>
        <input name="date" id="date" type="date" max={dateFormater()}/>
        
        <label htmlFor="name">Name</label>
        <input name="name" id="name" placeholder="Please enter your name ..."/>
        
        <label htmlFor="email">Email</label>
        <input name="email" id="email" placeholder="Please enter your email ..."/>
        
        <label htmlFor="picture">Picture</label>
        <FileBase type="file" multiple={false} onDone={({base64}) => setFile(base64)} />
        
        <button>Submit</button>
      </form>
    </>
  );
}
