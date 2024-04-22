import {Routes, Route} from "react-router-dom"
import { BonusPage } from "../pages/Client/Bonus"
import { Requests } from "../pages/Client/Requests"
import { HomeClient } from "../pages/Client/Home"

export const AppClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeClient/>}/>
      <Route path="/bonus" element ={<BonusPage />}/>
      <Route path="/requests" element={<Requests />} />
    </Routes>
  )
}