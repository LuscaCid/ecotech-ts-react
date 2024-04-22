import { NavLink } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../Contexts/Auth";

export function EmployeeHeader () {
    const userLogged= useContextSelector(AuthContext, (context) => {
        return context.userData
    })
    return (
        <header className="text-2xl font-bold text-zinc-200 flex border-b p-10 border-zinc-700 bg-zinc-800 items-center justify-between">
            <div className="flex gap-4 items-center justify-between">
                <NavLink className="text-5xl " to="/">
                    Ecotech
                </NavLink>
                <span className="bg-zinc-700 rounded-md p-3">Olá {userLogged?.nm_usuario}</span>
            </div>
            <menu>
                <ul className="flex gap-3 ">
                    <li><NavLink className='p-3 rounded-md border-green-700 border hover:bg-green-600 transition duration-200' to="">Materiais</NavLink></li>
                    <li><NavLink className='p-3 rounded-md border-green-700 border hover:bg-green-600 transition duration-200' to="">Usuarios</NavLink></li>
                    <li><NavLink className='p-3 rounded-md border-green-700 border hover:bg-green-600 transition duration-200' to="">Recebimentos</NavLink></li>
                    <li><NavLink className='p-3 rounded-md border-green-700 border hover:bg-green-600 transition duration-200' to="">Estoque</NavLink></li>
                </ul>
            </menu>
        </header>
    )

}
