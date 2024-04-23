import {Route, Routes} from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/Signup";

export const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}  />
      <Route path="/signup" element={<Signup />}  />
    </Routes>
  )
}