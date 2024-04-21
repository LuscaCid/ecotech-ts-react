import { BrowserRouter, Routes } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { Auth } from "./Auth";
import { AppClientRoutes } from "./App.client";
import { AppAdminRoutes } from "./App.admin";


export const Router = () => {
  //const UserData = useContextSelector(AuthContext, (context) => context.userData)
  //abaixo a verificacao do usuario autenticado pelo cargo dele na aplicacao
  
  const userMocked = {
    cargo : 0,
    isActive : false
  }

  //if(!userMocked.isActive && userMocked.cargo == 0) {
  if(!userMocked.isActive ) {
    return (
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )
  }
  if(userMocked.isActive && userMocked.cargo == 0) {
    return (
      <BrowserRouter>
        <AppClientRoutes />
      </BrowserRouter>
    )
  } else if ( userMocked.isActive && userMocked.cargo == 1) {
    return (
      <BrowserRouter>
        <AppAdminRoutes />
      </BrowserRouter>
    )
  }
  
}
