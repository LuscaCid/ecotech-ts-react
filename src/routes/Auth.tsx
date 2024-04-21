import {Route, Routes} from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/Signup";
import { AuthHome } from "../pages/Auth/Home";

export const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthHome />}  />
      <Route path="/login" element={<Login />}  />
      <Route path="/signup" element={<Signup />}  />
    </Routes>
  )
}