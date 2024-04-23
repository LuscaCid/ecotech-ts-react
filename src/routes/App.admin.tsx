import {Routes, Route} from "react-router-dom"
import EmployeeMenu from "../pages/Employee/home"
import { CreateMatResPage } from "../pages/Employee/CreateMatRes"
import { ProductsPage } from "../pages/Employee/Products"

export const AppAdminRoutes = () => {

  
  //matrix its like materiais e residuos
  return (
    <Routes>
      <Route path="/" element={<EmployeeMenu />}/>
      <Route path="/matrix/creation" element={<CreateMatResPage />} />
      <Route path="/product" element ={<ProductsPage />}/> 
    </Routes>
  )
}