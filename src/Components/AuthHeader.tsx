import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  isLogin : boolean
}

export const AuthHeader = (props: Props) => {
  return (
    <header className='flex w-full bg-zinc-800 p-8 border-b border-zinc-700 items-center justify-between'> 
      {
        props.isLogin ? (
          <>
            <NavLink className="p-3 rounded-md border border-green-600 text-2xl text-zinc-200 hover:bg-green-600 transition duration-200 font-bold" to="/">
              EcoTech
            </NavLink>
            <NavLink className="p-3 rounded-md border border-green-600 text-2xl text-zinc-200 hover:bg-green-600 transition duration-200 font-bold" to="/signup">
              Ir para cadastro
            </NavLink>
          </>
        
        ) : (
          <>
            <NavLink className="p-3 rounded-md border border-green-600 text-2xl text-zinc-200 hover:bg-green-600 transition duration-200 font-bold" to="/">
              EcoTech
            </NavLink>
            <NavLink className="p-3 rounded-md border border-green-600 text-2xl text-zinc-200 hover:bg-green-600 transition duration-200 font-bold" to="/login">
              Ir para login
              </NavLink>
          </>
        )
      }
      
    </header>
  )
}