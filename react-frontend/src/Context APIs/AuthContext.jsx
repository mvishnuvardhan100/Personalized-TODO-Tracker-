import { createContext } from "react";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("todoToken") != null) setIsLoggedIn(true);
    setIsLoading(false);
  }, []);

  const login = (todoToken) => {
    localStorage.setItem("todoToken", todoToken);
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("todoToken");
    setIsLoggedIn(false);
  }

  return <AuthContext.Provider value={{isLoggedIn, login, logout}}>
    {isLoading && <Loading />}
    {!isLoading && children }
  </AuthContext.Provider>

}