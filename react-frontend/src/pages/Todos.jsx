import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context APIs/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Todos.module.css";
import { Loading } from "../components/Loading";

export const Todos = () => {
  const [ todos, setTodos ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("todoToken")
      },
    }).then((response) => {
      if(!response.ok) {

      } else {
        response.json().then((result) => {
          setTodos(result.todos);
          setIsLoading(false);
        })
      }
    })
  }, []);

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Your TODOs</h1>
      <div className={styles.todosGrid}>
        {todos.map((element) => {
          return (
            <div key={element._id} className={styles.individualCard}>
              <div className={styles.content}>
                <p><strong>Title:</strong> {element.title}</p>
                <p><strong>Description:</strong> {element.description}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => {
                  setIsLoading(true);
                  fetch("http://localhost:3000/removetodo/" + element._id, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": localStorage.getItem("todoToken")
                    }
                  }).then((response) => {
                    if(!response.ok) {

                    } else {
                      fetch("http://localhost:3000/todos", {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": localStorage.getItem("todoToken")
                        } 
                      }).then((response) => {
                        if(!response.ok) {

                        } else {
                          response.json().then((result) => {
                            setTodos(result.todos);
                            setIsLoading(false);
                          })
                        }
                      })
                    }
                  })
                }} className={styles.completeBtn}>Completed</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button className={styles.navigateBtn} onClick={() => {
          navigate("/createTodo");
        }}>Create TODO</button>
      </div>
    </div>
  );
} 