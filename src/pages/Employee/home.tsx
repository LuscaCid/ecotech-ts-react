import { useQuery } from "@tanstack/react-query";
import { EmployeeHeader } from "../../Components/EmplyeeHeader";
import { ListModel } from "../../Components/ListModel";
import Search from "../../assets/search.svg"
import { AllClientRequests } from "../../Queries/AllClientRequests";
import { useState } from "react";
export default function EmployeeMenu () {

    const [query, setQuery] = useState<string>("")
    const { data : listResponse, isLoading, isSuccess , isError } = useQuery({
        queryKey : ["recebimentos", query] ,
        queryFn : () => AllClientRequests(query)
    })
    
    if(isSuccess) {
        console.log(listResponse)
    }

    return (
        <>
            <EmployeeHeader />
            <div className="w-[760px] m-auto flex flex-col gap-3">
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
                    isSuccess && (<ListModel 
                    type="Recebimentos" 
                    tbodyList={listResponse.dados.lista} 
                    theadList={["Id", "Cliente", "Resíduo" ,"Material", "Quantidade", "Medida em:", "Status", "Data de Solicitação", "Código"]}
                />) 
                }
                
            </div>
            
        </>
    )
}