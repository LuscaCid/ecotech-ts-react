import React, { ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'
import Coin from "../../assets/coin.svg"
import { getMateriais, getResiduos } from '../../Queries/Admin.queries'
import { useMutation, useQuery } from '@tanstack/react-query'

export interface IResiduos {
  nm_residuo : string
  id_residuo : number
}

export interface IMateriais {

}
/**
 * 
 * {
                    materials!.length > 0 && materials!.map((element) => {
                    return (
                      <option value={element.id_residuo}>{element.nm_residuo}</option>
                    )
                    })
                  }
 * 
 * 
 * renderizar os options buscados acima
 * 
 * {data!.length > 0 && data!.map((element) => {
    return (
      <option value={element.id_residuo}>{element.nm_residuo}</option>
    )
  })}
 * 
 */


const Requests = () => {
 
  const {data, isFetched } = useQuery({
    queryKey : ["getResiduos"],
    queryFn : () => getResiduos(),
    staleTime : Infinity,
  })

  const { mutateAsync : getMaterialsMutation } = useMutation({
    mutationKey : ["getMateriais"],
    mutationFn : () => getMateriais(),

  })

  async function changeResiduos (e : ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value)
  }

  if(isFetched) console.log(data)
  
  return (
    <div className="bg-zinc-900">
    <header className="items-center pt-10 pb-20 py-2 w-full px-9 bg-zinc-800 flex justify-between border-b border-zinc-600">
        <div className="flex gap-10 items-center">
          <NavLink to="/" className="text-4xl font-bold text-white">EcoTech</NavLink> 
          <span className="text-2xl font-bold text-zinc-100 rounded-md bg-zinc-700 px-4 py-3">Ola, <span id="saudacao">Lucas</span></span>  
        </div>
        <div className="flex gap-2 ">
          
          <NavLink to="/bonus" className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700  hover:bg-green-700 bg-green-600  duration-100">
            Loja 
          </NavLink>
          <a href="./solicitacao.html" className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-700 bg-green-600  duration-100">
            Gerar solicitação
          </a>
          <button className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-600  duration-100">
            Logout
          </button>
        </div>
      </header>
    <main className="grid grid-cols-2  my-12 min-w-[400px] w-[1200px] h-[400px] m-auto  border border-zinc-700 text-zinc-100 text-2xl rounded-md bg-zinc-800 p-4 ">
        
      <form id="formulario" className="relative flex-col flex  border border-zinc-700 ">
          <h2  className="p-2 text-3xl border-b border-zinc-700 mb-2 ">Solicitação de Entrega de Resíduos</h2>
          <div className="p-1 flex flex-col gap-1">
              <label className="text-zinc-200 font-bold" htmlFor="material">Residuo:</label>
              <select onChange={changeResiduos} id="residuo" className="text-zinc-200 rounded-md p-2 bg-zinc-900 border border-zinc-700 " name="residuo">
                  <option value="Selecione">Selecione</option>
                  {
                    data!.length > 0 && data!.map((element) => {
                    return (
                      <option value={element.id_residuo}>{element.nm_residuo}</option>
                    )
                    })
                  }
              </select>
          </div>
          <div className="p-1 flex flex-col gap-1">
              <label className="text-zinc-200 font-bold" htmlFor="material">Material:</label>
              <select className="text-zinc-200 rounded-md p-2 bg-zinc-900 border border-zinc-700 " id="material" name="material">
                  <option value="Selecione">Selecione</option>
                  
              </select>
          </div>
          
          <div className="p-2 flex flex-col gap-1 ">
              <label className="text-zinc-200 font-bold" htmlFor="numero">Quantidade:</label>
              <input className="text-zinc-200 rounded-md p-2 bg-zinc-900 border border-zinc-700 " placeholder="Quantidade em kg ou lt" type="number" id="numero" name="numero" required/>
          </div>
            
          <button id="adicionar_solicitacao" className="m-2 absolute font-bold right-0 left-0 bottom-0 rounded-md border-zinc-700 p-2 border hover:bg-zinc-700 transition duration-150" type="submit">
              Adicionar Solicitação 
          </button>
      </form>
      <aside  className="border-r border-b border-zinc-700 relative">
          <h2 className="p-2 border-t text-3xl px-2 border-b border-r-0 border-zinc-700">Lista de Solicitações para coleta de Materiais</h2>
          <form id="enviar-array-backend">
              <div id="renderizar-solicitacoes" className=" flex flex-col p-3 gap-3 overflow-y-auto max-h-[270px]">
              </div>
              
                
          <div id="total-eco-div" className="hidden text-3xl flex items-center ">
            <h2 className="mx-2 font-bold text-2xl">
              Total em Eco:
            </h2>
            <span id="total-eco">
              399
            </span>
            <img src={Coin} alt=""/>
          </div>     
              <button className="rounded-md border font-bold hover:bg-zinc-700 transition duration-150 border-zinc-700 p-2 absolute bottom-2 right-2 left-2 ">
                  Enviar dados
              </button>
            </form>
        </aside>
    </main>

</div>
  )
}

export {Requests}