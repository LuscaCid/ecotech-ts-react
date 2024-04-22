import { BrowserRouter } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { Auth } from "./Auth";
import { AppClientRoutes } from "./App.client";
import { AppAdminRoutes } from "./App.admin";
import { AuthContext } from "../Contexts/Auth";

export const Router = () => {
  //const UserData = useContextSelector(AuthContext, (context) => context.userData)
  //abaixo a verificacao do usuario autenticado pelo cargo dele na aplicacao
  const userLogged = useContextSelector(AuthContext, (context) => {
    return context.userData
  })

  //if(!userMocked.isActive && userMocked.cargo == 0) {
  if(userLogged == null) {
    return (
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )
  }
  if(userLogged && userLogged.nu_cargo == 0) {
    console.log("user normal")
    return (
      <BrowserRouter>
        <AppClientRoutes />
      </BrowserRouter>
    )
  } else if ( userLogged && userLogged.nu_cargo == 1) {
    console.log("func")
    return (
      <BrowserRouter>
        <AppAdminRoutes />
      </BrowserRouter>
    )
  }
  
}
