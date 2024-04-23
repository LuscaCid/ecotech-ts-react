import { NavLink } from "react-router-dom"
import Inputs from "../../assets/inputs.svg"
import Outputs from "../../assets/outputs.svg"
import Coin from "../../assets/coin.svg"
import Search from "../../assets/search.svg"
import { ListModel } from "../../Components/ListModel"
import { useQuery } from "@tanstack/react-query"
import { getMyRequests } from "../../Queries/ClientHome.queries"
import { useContextSelector } from "use-context-selector"
import { AuthContext } from "../../Contexts/Auth"
import { useContext } from "react"

export interface ClientRequest {
    id_solicitacao : number
    nm_material : string
    qt_material : number
    dt_solicitacao : string
    vl_status : number
}

const fakeRequests : ClientRequest[] = [
    {
        id_solicitacao : 1,
        nm_material : "Garrafa",
        qt_material : 30,
        dt_solicitacao : "19/03/2024",
        vl_status : 0
    },
    {
        id_solicitacao : 2,
        nm_material : "Caixa de papelao",
        qt_material : 12,
        dt_solicitacao : "19/03/2024",
        vl_status : 0
    }
]


export const HomeClient = () => {

  const {logout} = useContext(AuthContext)

  const { data : requestsList ,isFetched, isSuccess } = useQuery({
    queryKey : ["usuario-solicitacoes"],
    queryFn : () => getMyRequests(),
  })
  if(isSuccess) {
    console.log(requestsList)
  }
  /**
   * if(isSuccess){
    
    if(!Array.isArray(requestsList)){
      console.log("logout")
      logout()
    }
  }
   * 
   */
  
  return (
    <div className="bg-zinc-900">
      <header className="items-center pt-10 pb-20 py-2 w-full px-9 bg-zinc-800 flex justify-between border-b border-zinc-600">
        <div className="flex gap-10 items-center">
          <h1 className="text-4xl font-bold text-white">EcoTech</h1>
        </div>
        <div className="flex gap-2 ">
          <NavLink to="/bonus" className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-700 bg-green-600 duration-100">
            Loja 
          </NavLink >
          <NavLink to="/requests" className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-700 bg-green-600 duration-100">
            Gerar solicitação
          </NavLink >
          <NavLink to="/" onClick={logout}  className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-600 duration-100">
            Logout
          </NavLink >
        </div>
      </header>
      <main className="w-full mt-4 flex flex-col gap-4">
        <section className="flex gap-3 m-auto w-fit my-4 text-zinc-300">
          <div className="w-96 rounded-md bg-zinc-700 p-8 text-2xl">
            <div className="flex justify-between w-full items-center mb-5">
              <span>Entradas</span>
              <img src={Inputs} alt="" />
            </div> 
            <span className="text-zinc-100 font-bold text-2xl">700</span>
          </div>
          <div className="w-96 rounded-md bg-zinc-700 p-8 text-2xl">
            <div className="flex justify-between w-full items-center mb-5">
              <span>Saídas</span>
              <img src={Outputs} alt="setinha para baixo" />
            </div> 
            <span className="text-zinc-100 font-bold text-2xl">200</span>
          </div>
          <div className="w-96 rounded-md bg-green-600 p-8 text-2xl">
            <div className="flex justify-between w-full items-center mb-5">
              <span>Total</span>
              <img src={Coin} alt="icone de cifrão representando dinheiro." />
            </div> 
            <span className="text-zinc-100 font-bold text-2xl">500</span>
          </div>
        </section>
        
        <section className="w-[740px] m-auto mt-2 flex gap-2">
          <input
            className="text-2xl text-white w-full rounded-md p-4 bg-zinc-700 border-zinc-600 border"
            placeholder="Pesquisar" 
            id="input-pesquisa"
            type="text"
          />
          <button id="botao-pesquisa" className="bg-none border border-zinc-800 hover:bg-zinc-700 rounded-md p-2 transition duration-200">
            <img src={Search} alt="icone de loopa" />
          </button>
        </section>

        <h1 className="text-zinc-100 font-bold w-[740px] text-3xl rounded-md bg-zinc-700 p-2 m-auto">
          Tabela de Solicitações feitas
        </h1>
        <footer className="w-[750px] m-auto flex flex-col gap-2 p-2 max-h-[320px] overflow-y-auto">
        <ListModel theadList={["Id", "Material", "Quantidade" , "Data Solicitação", "Status"]} type="usuarioLogadoSolicitacoes" tbodyList={fakeRequests}/>
          
        </footer>
      </main>
    </div>
  )
}