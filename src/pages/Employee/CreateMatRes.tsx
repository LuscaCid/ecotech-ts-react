import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addMaterial, addResiduo, getResiduals } from "../../Queries/Materials.queries"
import { MouseEventHandler, useState } from "react"
import { EmployeeHeader } from "../../Components/EmplyeeHeader"
import { GenericalList } from "../../Components/GenericList"
import { getMaterials } from "../../Queries/Materials.queries"
import { SkeletonTable } from "../../Components/TableSkeleton"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ResiduosSchema = z.object({
  nm_residuo : z.string().min(3)
})
export type ResiduosSchemaType = z.infer<typeof ResiduosSchema>

//schema for residuos form

const MaterialsSchema = z.object({
  nm_material : z.string(),
  vl_eco : z.number(),
  sg_medida : z.string(),
  id_residuo : z.string()
  /**
   * nm_material
   * vl eco
   * id_re
   * sg_medida
   * 
   */
})
export type MaterialsSchemaType = z.infer<typeof MaterialsSchema>

export function CreateMatResPage () {

  const queryClient =  useQueryClient()

  //apenas para controlar o nome do residuo selecionado no select

  const {handleSubmit : handleSubmitMaterials, register : registerMaterial } = useForm<MaterialsSchemaType>({
    resolver : zodResolver(MaterialsSchema),
    defaultValues : {
      nm_material : "",
      sg_medida : "",
    }
  })

  const {handleSubmit, register } = useForm<ResiduosSchemaType>({
    resolver : zodResolver(ResiduosSchema),
    defaultValues : {
      nm_residuo : ""
    }
  })
  
  const {data : residualsList, isSuccess : isSuccessResiduos} = useQuery({
    queryKey : ["residuos"],
    queryFn : () => getResiduals(),
    staleTime : Infinity,

  })

  const {data : materialsList, isSuccess : isSuccessMaterials} = useQuery( {
    queryKey : ["materials"],
    queryFn : () => getMaterials(),
    
  })

  const {mutateAsync : addMaterialMutation} = useMutation({
    mutationFn : addMaterial,
    mutationKey : ["Material"],
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["materials"]})
      //refetch data from getMaterials when adding an new residuo 
    }
  })

  const {mutateAsync : addResiduoMutate} = useMutation({
    mutationFn : addResiduo,
    mutationKey : ["addResiduo"],
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["residuos"]})
      //refetch data from getMaterials when adding an new residuo 
    }
  })

  const [residuosIsOpen, setResiduosIsOpen] = useState<boolean>(true)

  function handleChangeScreen(event : any) {
    const buttonName : "residuoButton" | "materialButton" = event.target.name
    console.log(buttonName)
    if(buttonName == "residuoButton") 
    {
      setResiduosIsOpen(true)
    } else if (buttonName == "materialButton") 
    {
      setResiduosIsOpen(false) 
    }
  }

  async function handleCreateResiduo(data : ResiduosSchemaType) {
    addResiduoMutate(data)
  }

  async function handleCreateMaterial (data : MaterialsSchemaType) {
    //tratamento de dados pois no value do select ha tanto o id quanto o nome do residuo
    const [ id_residuo, nm_residuo ] = data.id_residuo.split(',')
    const newData : MaterialsSchemaType & {nm_residuo : string} = {
      id_residuo : id_residuo.trim(),
      nm_residuo : nm_residuo.trim(),
      vl_eco : data.vl_eco,
      sg_medida : data.sg_medida.trim(),
      nm_material : data.nm_material
    }
    addMaterialMutation(newData)

  }
  // funcao para buscar os valores possiveis para criar um material
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
          <button onClick={handleChangeScreen} name="residuoButton" className={`${residuosIsOpen ? "text-green-600" : " text-zinc-200 "}  p-3 border-b  border-zinc-700 font-bold text-2xl w-full transition duration-150 active:text-green-500`}>
            Residuo
            </button>
          <button onClick={handleChangeScreen} name="materialButton" className={`${residuosIsOpen ?  "text-zinc-200 " : "text-green-600"} p-3 border-b border-zinc-700 font-bold text-2xl w-full transition duration-150 active:text-green-500 `}>
            Material
          </button>
        </nav>
        <div  className= {`${residuosIsOpen ? "" : "hidden"}  p-4 relative w-full h-full flex flex-col gap-4 items-center`}>
          <div className= {` px-5 py-8 text-zinc-200 absolute inset-0 left-44 text-2xl rounded-md border border-zinc-600 flex bg-zinc-700 `}>
            <form onSubmit={handleSubmit(handleCreateResiduo)} className="flex flex-col gap-4 w-full h-full" >
              <label className="text-3xl font-bold border-b border-zinc-800" htmlFor="numero">Adicionar novo tipo de resíduo</label>
              <input {...register("nm_residuo")} type="text" id="nome-residuo" className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Nome" required />
              <button type="submit" className="absolute right-5 left-5 bottom-2 font-bold rounded-md p-2 bg-green-500 hover:bg-green-600 transition duration-200">Criar resíduo</button>    
            </form>
          </div>
        </div>

        <div id="tela-material" className={`${residuosIsOpen ? "hidden" : ""} p-4 w-full flex flex-col h-full gap-4 items-start`}>
          <div className="px-5 py-8 text-zinc-200 absolute inset-0 left-44 text-2xl rounded-md border border-zinc-600 flex bg-zinc-700">
            <form onSubmit={handleSubmitMaterials(handleCreateMaterial)} className="flex flex-col gap-1 w-full" >
              <label className="text-3xl font-bold" >Adicione um material</label>
              <input type="text" {...registerMaterial("nm_material")} className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Nome" />
              <select  {...registerMaterial("id_residuo")} className="rounded-md p-3 bg-zinc-900 border-zinc-600 border">
                <option value="Selecione" >Selecione</option>
                {
                  isSuccessResiduos && residualsList!.map((element) => 
                    (
                      <option className="text-zinc-100" key={element.id_residuo} value={`${element.id_residuo}, ${element.nm_residuo}`}>{element.nm_residuo}</option>
                    ) 
                )} 
              </select>
              <input type="number" {...registerMaterial("vl_eco", {valueAsNumber : true})} className="rounded-md p-3 bg-zinc-900 border-zinc-600 border" placeholder="Valor em ecos" />
              <select {...registerMaterial("sg_medida")} className="rounded-md p-3 bg-zinc-900 text-zinc-200 border-zinc-600 border">
                <option value="kg">Kg</option>
                <option value="lt">L</option>
              </select>
              <button type="submit" className="absolute right-5 left-5 bottom-2 font-bold rounded-md p-2 bg-green-500 hover:bg-green-600 transition duration-200">Criar Material</button>
            </form>
          </div>
        </div>
      </main>
      <footer className="w-[800px] flex flex-col my-4 m-auto mt-2 rounded-md border-zinc-600 border gap-2 p-2">
        <header className="border max-h-[390px]  overflow-y-auto border-zinc-700 rounded-md p-3 flex flex-col gap-5">
          <h2 className="text-zinc-100 text-3xl font-bold">Lista Resíduos</h2>
          <input type="text" placeholder="Pesquisar por Resíduo" className="w-full p-3 text-2xl text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-md" />
          {/* elemento renderizado */}
          {
            isSuccessResiduos ?  <GenericalList type="MatRes" theadList={["Id Resíduo", "Nome do resíduo", "Editar"]}  tbodyList={residualsList}/> : (<SkeletonTable />)/**  */ 
          }
        </header>
        {/* secao renderizar materiais */}
        {/* secao renderizar residuos */}
        <footer className="border max-h-[390px] overflow-y-auto border-zinc-700 rounded-md p-3 flex flex-col gap-5">
          <h2 className="text-zinc-100 text-3xl font-bold">Lista materiais</h2>
          <input type="text" placeholder="Pesquisar por Material" className="w-full p-3 text-2xl text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-md" />
          {
            isSuccessMaterials ? <GenericalList type="MatRes" tbodyList={materialsList} theadList={["id Material" , "Nome do Material", "medida", "id residuo", "Ecos", "Editar"]} /> : (<SkeletonTable />)
          }
        </footer>    
      </footer>
    </div>
  )
}