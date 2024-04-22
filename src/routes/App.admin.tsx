import {Routes, Route} from "react-router-dom"
import EmployeeMenu from "../pages/Employee/home"

export const AppAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeMenu />}/>
      <Route />
    </Routes>
  )
}