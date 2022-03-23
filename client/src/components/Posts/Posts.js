import React, { useEffect, useState } from "react";
import {getAllPosts, deletePost} from '../../api/index.js';
import brokenLaptopPic from '../../images/brokenLaptop.png';
import styles from './Posts.module.css';
import laptopTypes from '../Form/laptopTypes.js';
import issues from '../Form/issues.js';
import dateFormater from '../Form/dateFormater.js';

export default function Posts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateFrom, setDateFrom] = useState("");

  useEffect(()=>{
    async function takeData(){
      const allPosts = await getAllPosts();
      setData(allPosts);
      setFilteredData(allPosts);
    }

    takeData()
  }, [])

  async function deletePostHandler(e) {
    try{
      const id = e.target.id;
      console.log(id);
      await deletePost(id);
      const newData = data.filter(el=>el._id !== id);
      setData(newData);
      const newFiltData = filteredData.filter(el=>el._id !== id);
      setFilteredData(newFiltData);

    } catch(err){
      console.log(err);
    }
  }

  function filterDataHandler(e){
    e.preventDefault();
    const formData = new FormData(e.target.parentElement.parentElement);
    const [laptopType, issue, startDate, endDate] = formData.values();
    let filterData = [...data];

    if(e.target.id === "resetBtn"){
      e.target.parentElement.parentElement.reset();
      setFilteredData(data);
      return;
    }

    if(laptopType !== "All"){
      filterData = filterData.filter(el=>el.laptopType === laptopType);
    }

    if(issue !== "All"){
      filterData = filterData.filter(el=>el.issue === issue);
    }

    if(startDate){
      filterData = filterData.filter(el=> new Date(el.date) >= new Date(startDate));
    }

    if(endDate){
      filterData = filterData.filter(el=> new Date(el.date) <= new Date(endDate));
    }

    setFilteredData(filterData);
  }

  function setDateFromHandler(e){
    setDateFrom(e.target.value);
  }

  return (
    <div className={styles.main}>
      <div className={styles.subMain}>
        <div className={styles.filterForm}>
          <h1>All Posts</h1>

          <h3>Filter by:</h3>
          <form >
            <div className={styles.inputsDiv}>

              <div>
                <label htmlFor="laptopType">Laptop Type</label>
                <select name="laptopType" id="laptopType">
                  <option>All</option>
                  {laptopTypes.map((el, i) => <option key={i}>{el}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="issue">Issue</label>
                <select name="issue" id="issue">
                  <option>All</option>
                  {issues.map((el, i) => <option key={i}>{el}</option>)}
                </select>
              </div>
                
              <div>
                <label htmlFor="dateFrom">Date from</label>
                <input name="dateFrom" id="dateFrom" type="date" max={dateFormater()} onChange={setDateFromHandler} />
              </div>
                
              <div>
                <label htmlFor="dateTo">Date to</label>
                <input name="dateTo" id="dateTo" type="date" min={dateFrom} max={dateFormater()} />
              </div>
            </div>

            <div>
              <button onClick={filterDataHandler}>Filter</button>
              <button id="resetBtn" className={styles.resetBtn} onClick={filterDataHandler}>Reset</button>
            </div>
          </form>
        </div>

        <div className={styles.content}>
          {filteredData.length === 0 && <p className={styles.noDataP}>Sorry, there is no data to show!</p>}
          {filteredData.map((el) => (
            <div key={el._id} className={styles.card}>
              <img
                src={el.selectedFile ? el.selectedFile : brokenLaptopPic}
                alt="visualisation of the issue"
              />
              <h2>Issue: <span>{el.issue}</span></h2>
              <p>Laptop type: <span>{el.laptopType}</span></p>
              <p>Serial number: <span>{el.serialNo}</span></p>
              <p>Date of occurrence: <span>{el.date}</span></p>
              <p>User's name : <span>{el.name}</span></p>
              <p>User's email : <span>{el.email}</span></p>
              <p>User's notes : <span>{el.notes}</span></p>
              <button onClick={deletePostHandler} id={el._id}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}