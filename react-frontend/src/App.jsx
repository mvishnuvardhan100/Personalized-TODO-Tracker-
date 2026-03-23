import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Todos } from "./pages/Todos";
import { CreateTODO } from "./pages/CreateTODO";


function App(){
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/createTodo" element={<CreateTODO />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App