import React, { useEffect, useState } from "react";
import {getAllPosts, deletePost} from '../../api/index.js';
import brokenLaptopPic from '../../images/brokenLaptop.jpg';
import styles from './Posts.module.css';

export default function Posts() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    async function takeData(){
      const allPosts = await getAllPosts();
      console.log(allPosts);
      setData(allPosts);
    }

    takeData()
  }, [])

  async function deletePostHandler(e) {
    try{
      const id = e.target.id;
      await deletePost(id);
      const newData = data.filter(el=>el._id !== id);
      setData(newData);
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <h2>Posts Page</h2>
      <div className={styles.content}>
        {data.map((el) => (
          <div key={el._id} className={styles.card}>
            <img src={el.selectedFile ? el.selectedFile : brokenLaptopPic} alt="visualisation of the issue" />
            <h2> Issue: <span>{el.issue}</span> </h2>
            <p> Laptop type: <span>{el.laptopType}</span> </p>
            <p> Serial number: <span>{el.serialNo}</span> </p>
            <p> Date of occurrence: <span>{el.laptopType}</span> </p>
            <p> User's name : <span>{el.name}</span> </p>
            <p> User's email : <span>{el.email}</span> </p>
            <p> User's notes : <span>{el.notes}</span> </p>
            <button onClick={deletePostHandler} id={el._id}> Delete </button>
          </div>
        ))}
      </div>
    </>
  );
}