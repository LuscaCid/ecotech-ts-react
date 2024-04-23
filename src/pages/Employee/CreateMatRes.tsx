import { useQuery } from "@tanstack/react-query"
import { getResiduals } from "../../Queries/Materials.queries"
import { useContext } from "react"
import { AuthContext } from "../../Contexts/Auth"
import { EmployeeHeader } from "../../Components/EmplyeeHeader"


export function CreateMatResPage () {
  const {data : residualsList, isError, isSuccess,isFetched} = useQuery({
    queryKey : ["residuos"],
    queryFn : () => getResiduals(),
    
  })
  if(isFetched)console.log(residualsList)
  //
  return (
    <div className="bg-zinc-900">
      <EmployeeHeader />
      <h2 className="w-[800px] my-4 rounded-md bg-zinc-700 p-3 text-zinc-100 text-3xl font-bold m-auto">
        Criacao de Resíduos e de Materiais 
      </h2>
      <main className="relative items-center flex min-w-[300px] w-[800px] shadow-md h-[260px] m-auto mt-3 rounded-md bg-zinc-800 border border-zinc-800">
        <nav className="absolute left-0-0 top-0 bottom-0 w-44 z-20 bg-zinc-950 rounded-md flex flex-col gap-3">
          <h1 className="p-3 text-3xl text-center text-zinc-200 font-bold border-b border-zinc-700">
            Menu
          </h1>
          <button className="p-3 border-b border-zinc-700 font-bold text-2xl w-full transition duration-150 text-zinc-200  active:text-green-500">Residuo</button>
          <button className="p-3 border-b border-zinc-700 font-bold text-2xl w-full transition duration-150 text-zinc-200 active:text-green-500">Material</button>
        </nav>
        <div  className="p-4 relative w-full h-full flex flex-col gap-4 items-center ">
          <div className="px-5 py-8 text-zinc-200 absolute inset-0 left-44 text-2xl rounded-md border border-zinc-600 flex bg-zinc-700">
            <form  className="flex flex-col gap-4 w-full h-full" >
              <label className="text-3xl font-bold border-b border-zinc-800" htmlFor="numero">Adicionar novo tipo de resíduo</label>
              <input type="text" id="nome-residuo" name="nome" className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Nome" required />
              <button type="submit" className="absolute right-2 left-2 bottom-2 font-bold rounded-md p-2 bg-green-500 hover:bg-green-600 transition duration-200">Criar resíduo</button>    
            </form>
          </div>
        </div>

        <div id="tela-material" className={`hidden p-4 w-full flex flex-col h-full gap-4 items-start`}>
          <div className="px-5 py-8 text-zinc-200 absolute inset-0 left-44 text-2xl rounded-md border border-zinc-600 flex bg-zinc-700">
            <form id="formulario-material" className="flex flex-col gap-1 w-full" >
              <label className="text-3xl font-bold" htmlFor="numero">Adicione um material</label>
              <input type="text" id="nome" name="nome" className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Nome" required />
              <select id="residuo" className="rounded-md p-3 bg-zinc-900 border-zinc-600 border">
                <option value="selecione">Selecione o tipo de residuo</option>
                {
                  isSuccess && residualsList!.map((element) => 
                    (
                      <option key={element.id_residuo} value={element.nm_residuo}></option>
                    ) 
                )} 
              </select>
              <input type="number" id="valor" name="valor" className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Valor" required />
              <select className="rounded-md p-3 bg-zinc-900 border-zinc-600 border">
                <option value="selecione">Selecione o tipo de medida</option>
                <option value="kg">Kg</option>
                <option value="lt">L</option>
              </select>
              <button type="submit" className="absolute right-5 left-5 bottom-2 font-bold rounded-md p-2 bg-green-500 hover:bg-green-600 transition duration-200">Criar Material</button>
            </form>
          </div>
        </div>
      </main>
      <footer className="w-[800px] grid grid-cols-2 my-4 m-auto mt-2 rounded-md border-zinc-600 border gap-2 p-2">
        <header className="border max-h-[290px] overflow-y-auto border-zinc-700 rounded-md p-3 flex flex-col gap-5">
          <h2 className="text-zinc-100 text-3xl font-bold">Lista Resíduos</h2>
          {/* elemento renderizado */}
          {
            isSuccess && residualsList.map(element => (
              <section className="rounded-md bg-zinc-800 p-3 flex items-center justify-between">
                <span>{element.id_residuo}</span>
                <span>{element.nm_residuo}</span>
              </section>
            ))
          }
        </header>
        {/* secao renderizar materiais */}
        {/* secao renderizar residuos */}
        <footer  className="border max-h-[290px] overflow-y-auto border-zinc-700 rounded-md p-3 flex flex-col gap-5">
          <h2 className="text-zinc-100 text-3xl font-bold">Lista materiais</h2>
        </footer>    
      </footer>
    </div>
  )
}