import { useContext } from "react";
import { AuthContext } from "../Context APIs/AuthContext";
import { LoggedInHome } from "../components/LoggedInHome";
import { NotLoggedInHome } from "../components/NotLoggedInHome";

export const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && <LoggedInHome />}
      {!isLoggedIn && <NotLoggedInHome />}
    </>
  )
} 