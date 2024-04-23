import { BrowserRouter } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { Auth } from "./Auth";
import { AppClientRoutes } from "./App.client";
import { AppAdminRoutes } from "./App.admin";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";

export const Router = () => {
  //const UserData = useContextSelector(AuthContext, (context) => context.userData)
  //abaixo a verificacao do usuario autenticado pelo cargo dele na aplicacao


  const {userData} = useContext(AuthContext)
  //console.log(userData.usuario)

  console.log(userData)

  if(!userData) {
    return (
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )
  }
  if(userData && userData.nu_cargo == 0) {
    console.log("user normal")
    return (
      <BrowserRouter>
        <AppClientRoutes />
      </BrowserRouter>
    )
  } else if ( userData && userData.nu_cargo == 1) {
    console.log("func")
    return (
      <BrowserRouter>
        <AppAdminRoutes />
      </BrowserRouter>
    )
  }
  
}
