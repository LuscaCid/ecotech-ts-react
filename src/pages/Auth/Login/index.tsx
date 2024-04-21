import React from 'react';
import { AuthHeader } from '../../../Components/AuthHeader';
import EcoImage from "../../../assets/login-aside.svg"
export function Login() {
    return (
     <>
        <AuthHeader isLogin/>

        <div className=" bg-zinc-900  m-auto w-fit mt-20">
            <div className=" rounded-lg bg-zinc-800 flex h-[400px] justify-between w-[1000px] shadow-lg">
                <form className="w-1/2 h-full flex flex-col gap-4 p-5 text-2xl  rounded-l-lg bg-zinc-800">
                    <legend className="text-zinc-100 text-4xl pb-4 border-b border-green-500 mb-4 font-semibold">Login</legend>
                    <div className="input-wrapper">
                        <input
                            type="text"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        className="w-full bg-zinc-800 border-none rounded-md py-4 px-5"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        placeholder="Senha"
                        className="w-full bg-zinc-800 border-none rounded-md py-4 px-5"
                    />
                </div>
                <div className="remember-me text-zinc-100 text-sm">
                    <label htmlFor="lembrar" className="flex items-center">
                        Lembrar de mim?
                        <input
                            id="lembrar"
                            name="lembrar"
                            type="checkbox"
                            className="ml-2"
                        />
                    </label>
                </div>
                <button
                    id="btn-entrar"
                    type="submit"
                    className="bg-green-600 py-4 px-6 rounded-md text-white font-semibold text-lg transition duration-200 hover:bg-green-700"
                >
                    Entrar
                </button>
            </form>
            <aside className="relative bg-gradient-to-l border-l border-zinc-700 p-5 w-1/2 h-full rounded-r-md  from-green-500">
                <h1 className="text-white font-bold absolute bottom-0  text-6xl border-b-1 w-fit border-white pb-1 mb-4">W5I</h1>
                <img className="image w-24 absolute bottom-4 right-4" src={EcoImage } alt="" />
            </aside>
        </div>
    </div>  
    </>
           
    );
}

export default Login;
