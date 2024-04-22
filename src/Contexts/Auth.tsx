import { createContext } from "use-context-selector";
import { LoginQuery } from "../Queries/Login.queries";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

interface IUser {
    nm_usuario : string
    chave : string
    nu_cargo : number
    qt_ecosaldo : number
}

interface ISignup {}

export interface LoginCredentials  {
    nm_email : string
    nm_senha : string
}

interface IAuthContext {
    userData : IUser | null
    login : (LoginCredentials: LoginCredentials) => Promise<IUser | void>  
    signup : (SignupCredentials : ISignup) => Promise<void>
    logout : () => void
}


export const AuthContext = createContext({} as  IAuthContext)

interface props {
    children : ReactNode
}

export function AuthContextProvider ({children} : props) {

    const [userData , setUserData ] = useState<IUser | null>(null)
    
    const {mutateAsync : LoginMutate } = useMutation({
        mutationFn : LoginQuery,
        mutationKey : ["login"]
    })

    const login = async (LoginCredentials : LoginCredentials ) => {
        
        const formData = new FormData()
        formData.append("nm_email", LoginCredentials.nm_email)
        formData.append("nm_senha", LoginCredentials.nm_senha)

        try {
            const response : {codigo : string, chave : string, usuario : IUser} = await LoginMutate(formData)
            setUserData(response.usuario)
            const parsedToString = JSON.stringify(response)
            localStorage.setItem("@ecotech-dados", parsedToString)

        } catch (exception : unknown) {
            console.error(exception)
        }
    }

    const  signup = async (credentials : ISignup) => {
        console.log(credentials)
    } 
    const logout = () => {
        setUserData(null)
        localStorage.removeItem("@ecotech-dados")
        
    }

    useEffect(() => {   
        const isFullfilledLocalstorage =  localStorage.getItem("@ecotech-dados")
        if(isFullfilledLocalstorage) {
            const storageParsed = JSON.parse(isFullfilledLocalstorage)
            
            setUserData(storageParsed.usuario)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            signup,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    )

}