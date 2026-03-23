import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context APIs/AuthContext";
import styles from "./CreateTODO.module.css";

export const CreateTODO = () => {
  const navigate = useNavigate();
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [ issue, setIssue ] = useState(false);

  useEffect(() => {
    if(!isLoggedIn)  navigate("/");
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/verify", {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("todoToken"),
        "Content-Type": "application/json"  
      }
    }).then((response) => {
      if(!response.ok) {
        logout();
      }
    })
  }, []);



  return (
    <div className={styles.totalContainer}>
      <div className={styles.totalCard}>
       <div className={styles.items}>
         <div className={`horizontalCenter ${styles.heading}`}>Enter TODO</div>  
       </div>
       <div className={styles.items}>
         <input type="text" value={title} placeholder="enter title of the todo" onChange={(e) => {
           if(issue) setIssue(false);
           setTitle(e.target.value);
         }}/>
       </div>
       <div className={styles.items}>
         <textarea placeholder="enter description of the todo" value={description} onChange={(e) => {
          if(issue) setIssue(false);
          setDescription(e.target.value);
         }} rows={4}></textarea>
       </div>

       {issue && 
       <div className={`errorColor ${styles.items}`}>
        Inputs are not matching expetations
       </div>}

       <div className={styles.items}>
         <button onClick={() => {
          fetch("http://localhost:3000/addtodo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("todoToken")
            }, 
            body: JSON.stringify({
              title,
              description,
            })
          }).then((response) => {
            if(!response.ok) {
              setIssue(true);
            } else {
              navigate("/todos");
            }
          }).catch((err) => {
            console.log("Network error: " + err);
          })
         }} className={styles.Button}>Create TODO</button>
       </div>
      </div>
    </div>
  )
}