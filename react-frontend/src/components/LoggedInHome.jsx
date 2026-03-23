import styles from "./LoggedInHome.module.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context APIs/AuthContext";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const LoggedInHome = () => {
  const [ isLoading, setisLoading ] = useState(true);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/fNLN", {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("todoToken"),
        "Content-Type": "application/json"  
      }
    }).then((response) => {
      if(!response.ok) {
        logout();
        setisLoading(false);
      } else {
        response.json().then((result) => {
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setisLoading(false);
        });
      }
    })
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.totalContainer}>
      <div className={styles.topBar}>
        <div className="verticalCenter">
          <div>
            Personalized TODO Tracker
          </div>
        </div>
        <div className={styles.secondSet}>
          <div className="verticalCenter">
           <div>
             <span>{firstName}</span>
             <span>{lastName}</span>
           </div>
          </div>
          <div className="verticalCenter">
           <div>
            <button className={styles.Button} onClick={logout}>Sign out</button>
           </div>
          </div>
        </div>
      </div>
      <div className={styles.mainBody}>
        <div className={styles.twoButtons}>
          <div>
            <button onClick={() => {
              navigate("/todos");
            }} className={styles.Button}>View TODOs</button>
          </div>
          <div>
            <button onClick={() => {
              navigate("/createTodo");  
            }} className={styles.Button}>Create TODO?</button>
          </div>
        </div>
      </div>
    </div>
  )
}