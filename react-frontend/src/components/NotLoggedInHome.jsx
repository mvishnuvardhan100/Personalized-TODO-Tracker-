import styles from "./NotLoggedInHome.module.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context APIs/AuthContext";
import { useNavigate } from "react-router-dom";

export const NotLoggedInHome = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.topBar}>
        <div className="verticalCenter">
          <div>
            Personalized TODO Tracker
          </div>
        </div>
        <div className={styles.secondSet}>
          <div className="verticalCenter">
           <div>
             <button className={styles.Button} onClick={() => {
              navigate("/signin");
             }}>Sign in</button>
           </div>
          </div>
          <div className="verticalCenter">
           <div>
             <button className={styles.Button} onClick={() => {
              navigate("/signup");
             }}>Sign up</button>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}