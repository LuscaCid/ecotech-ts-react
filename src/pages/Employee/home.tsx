import { useQuery } from "@tanstack/react-query";
import { EmployeeHeader } from "../../Components/EmplyeeHeader";
import { ListModel } from "../../Components/ListModel";
import Search from "../../assets/search.svg"
import { AllClientRequests } from "../../Queries/AllClientRequests";
import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SkeletonTable } from "../../Components/TableSkeleton";
import { AuthContext } from "../../Contexts/Auth";

export interface IRequestResponse {
    dt_solicitacao : string
    id_solicitacao : number
    nm_material : string
    nm_residuo: string
    nm_usuario  : string
    qt_material: number
    sg_medida: string
    vl_status: number
}

export default function EmployeeMenu () {
    const {logout} = useContext(AuthContext)
    const [query, setQuery] = useState<string>("")
    const { 
        data : listResponse, 
        status 
    } = useQuery({
        queryKey : ["recebimentos", query] ,
        queryFn : () => AllClientRequests(query)
    })
    let formattedArrray = [] ;
    
    if(status == "success") {
        console.log(listResponse)
        if(listResponse.codigo == "login_necessario")logout()
        formattedArrray = listResponse.dados.lista.map((element : IRequestResponse) => {
            let displayStatus = "";
            switch (element.vl_status){
                case 0:
                    displayStatus = "Aguargando"
                    break;
                case 1 :
                    displayStatus = "Aceito"
                    break;
                case -1:
                    displayStatus = "Negado"
            }
            return {
                ...element,
                vl_status : displayStatus,
                dt_solicitacao : formatDistanceToNow(element.dt_solicitacao, {addSuffix : true, locale : ptBR})
            }
        }) 
    } 
    
    return (
        <>
        <EmployeeHeader />
        <div className="w-[1000px] m-auto flex flex-col gap-3">
            <section className="w-full m-auto mt-2 flex gap-2">
                <input
                    className="text-2xl text-white w-full rounded-md p-4 bg-zinc-700 border-zinc-600 border"
                    placeholder="Pesquisar" 
                    id="input-pesquisa"
                    onChange={e => setQuery(e.target.value)}
                    type="text"
                />
                <button id="botao-pesquisa" className="bg-none border border-zinc-800 hover:bg-zinc-700 rounded-md p-2 transition duration-200">
                    <img src={Search} alt="icone de loopa" />
                </button>
            </section>
            
            {
                status  == "success" &&  (<ListModel 
                type="Recebimentos" 
                tbodyList={formattedArrray} 
                theadList={["Id", "Cliente", "Resíduo" ,"Material", "Quantidade", "Medida", "Status", "Data", "Código"]}
            />) 
                
            } 
            {
                status == "pending" && (<SkeletonTable />)
            }
            
           
            
        </div>
        
    </>

    )

}