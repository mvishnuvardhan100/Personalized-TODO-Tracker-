import styles from "./Signup.module.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context APIs/AuthContext";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const [ issue, setIssue ] = useState(false);

  return (
    <div className={styles.totalContainer}>
      <div className={styles.totalCard}>
       <div className={styles.items}>
         <div className={`horizontalCenter ${styles.heading}`}>Signin</div>  
       </div>
       <div className={styles.items}>
         <input type="email" value={email} placeholder="Email" onChange={(e) => {
           if(issue) setIssue(false);
           setEmail(e.target.value);
         }}/>
       </div>
       <div className={styles.items}>
         <input type="password" value={password} placeholder="Password" onChange={(e) => {
           if(issue) setIssue(false);
           setPassword(e.target.value);
         }}/>
       </div>

       {issue && 
       <div className={`errorColor ${styles.items}`}>
        Entered email already exist or inputs are not matching expetations
       </div>}

       <div className={styles.items}>
         <button onClick={() => {
          fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              email,
              password,
            })
          }).then((response) => {
            if(!response.ok) {
              setIssue(true);
            } else {
              response.json().then((result) => {
                login(result.token);
              })
            }
          }).catch((err) => {
            console.log("Network error: " + err);
          })
         }} className={styles.Button}>Sign in</button>
       </div>
      </div>
    </div>
  )

}