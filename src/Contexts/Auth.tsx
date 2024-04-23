import { createContext } from "react";
import { LoginQuery } from "../Queries/Login.queries";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

interface IUser {
    nm_usuario : string
    chave : string
    nu_cargo : number
    qt_ecosaldo : number
    codigo : string
}

interface ISignup {}

export interface LoginCredentials  {
    nm_email : string
    nm_senha : string
}

interface IAuthContext {
    userData : IUser | undefined
    login : (LoginCredentials: LoginCredentials) => Promise<IUser | void>  
    signup : (SignupCredentials : ISignup) => Promise<void>
    logout : () => void
}


export const AuthContext = createContext({} as  IAuthContext)

interface props {
    children : ReactNode
}

export function AuthContextProvider ({children} : props) {

    const [userData , setUserData ] = useState<IUser | undefined>(undefined)
    
    const {mutateAsync : LoginMutate } = useMutation({
        mutationFn : LoginQuery,
        mutationKey : ["login"]
    })

    const login = async (LoginCredentials : LoginCredentials ) => {
        
        const formData = new FormData()
        formData.append("nm_email", LoginCredentials.nm_email)
        formData.append("nm_senha", LoginCredentials.nm_senha)

        try {
            const response : IUser = await LoginMutate(formData)
            if(response.codigo == "logado") {
                setUserData(response)

                const parsedToString = JSON.stringify(response)
                localStorage.setItem("@ecotech-dados", parsedToString)
            }
            //senao, mostrar uma caixinha amigavel de erro
            

        } catch (exception : unknown) {
            console.error(exception)
        }
    }

    const  signup = async (credentials : ISignup) => {
        console.log(credentials)
    } 
    const logout = () => {
        setUserData(undefined)
        localStorage.removeItem("@ecotech-dados")
        
    }

    useEffect(() => {   
        const isFullfilledLocalstorage =  localStorage.getItem("@ecotech-dados")
        if(isFullfilledLocalstorage) {
            const storageParsed = JSON.parse(isFullfilledLocalstorage)

            console.log(storageParsed)
            setUserData(storageParsed)
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