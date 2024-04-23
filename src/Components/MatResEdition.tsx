//precisa-se ter a variavel que vai verificar se o modal esta aberto, e um objeto que vai renderizar os dados para edicao

import { SetStateAction } from "react"
import { CircleX, Edit } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import BaseURL from "../Queries/BaseURL"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMaterial, deleteResiduo } from "../Queries/Materials.queries"


export type ModalDataRenderingMaterial ={
    id_material : number
    vl_eco : string
    nm_material : string
    sg_medida : string
}
export type ModalDataRenderingResiduo = {
    nm_residuo : string
    id_residuo : number
}

interface Props <T extends ModalDataRenderingMaterial | ModalDataRenderingResiduo>{
    isOpen : boolean
    setIsOpenModal : React.Dispatch<SetStateAction<boolean>>
    modalData : T

}

const EditionResiduosForm = z.object({
    new_nm_residuo : z.string()
})
type FormEditionResiduosSchemaType = z.infer<typeof EditionResiduosForm>

const EditionMaterialsForm = z.object({
    nm_material : z.string(),
    vl_eco : z.number(),
    sg_medida : z.string()

})
type EditionMaterialsFormType = z.infer<typeof EditionMaterialsForm>

export function MatResModalEdition ({ isOpen, modalData, setIsOpenModal } : Props<ModalDataRenderingMaterial | ModalDataRenderingResiduo>) {

    const queryClient = useQueryClient()

    const { register, handleSubmit, reset } = useForm<FormEditionResiduosSchemaType>({
        resolver : zodResolver(EditionResiduosForm),

    })

    const {
        register : registerMaterial, 
        handleSubmit : handleSubmitMaterial, 
        reset : resetMaterial
    } = useForm<EditionMaterialsFormType>({
        resolver : zodResolver(EditionMaterialsForm),
        defaultValues : {
            nm_material : "",
        }
    })

    const { mutateAsync : deleteResiduoMutation } = useMutation({
        mutationFn : deleteResiduo,
        mutationKey : ["delete-residuo"],
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["residuos"]})
        }
    })
    const { mutateAsync : deleteMaterialMutation } = useMutation({
        mutationFn : deleteMaterial,
        mutationKey : ["delete-material"],
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["materials"]})
        }
    })
    const {mutateAsync : editResiduoMutation } = useMutation({
        mutationFn : handleEditFormResiduo,
        mutationKey : ["edit-residuo"],
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["residuos"]})
        }
    })

    async function handleEditFormResiduo(data : FormEditionResiduosSchemaType) {
        console.log(data)
        if("nm_residuo" in modalData) {
            const old_nm_residuo = modalData.nm_residuo
            modalData.nm_residuo = data.new_nm_residuo
            
            //only for updates instant
            
            const form = new FormData()
            
            form.append("nm_residuo", old_nm_residuo)
            form.append("nm_novo", modalData.nm_residuo)

            const response = await fetch(`${BaseURL.baseURL}/residuos/editar`, {
                method : "POST",
                body : form,
                headers : {
                    Authorization : `Bearer ${BaseURL.getUserKey()}`
                }
            }).then(data => data.json())
            //poderia usar o queru
            console.log(response)
        }
        
        //residuos/editar
        /**
         * nm_residuo
         * nm_residuo_novo
         * 
         * returns 
         * inexistente => nao foi encontrado pelo antigo nome
         * existente => caso o novo nome ja exista
         * falha
         * atualizado
         */
        reset()
    } 

    async function handleEditFormMaterial(data : EditionMaterialsFormType) {
        console.log(data)
        if("nm_material" in modalData) {

            modalData.nm_material = data.nm_material
            modalData.vl_eco = String(data.vl_eco)
            modalData.sg_medida = data.sg_medida
            //only for updates instant
            
            const form = new FormData()
            form.append("id_material", String(modalData.id_material))
            form.append("nm_material", modalData.nm_material)
            form.append("vl_eco", String(data.vl_eco))
            form.append("sg_medida", modalData.sg_medida)

            const response = await fetch(`${BaseURL.baseURL}/materiais/editar`, {
                method : "POST",
                body : form,
                headers : {
                    Authorization : `Bearer ${BaseURL.getUserKey()}`
                }
            }).then(data => data.json())
            //poderia usar o queru
            console.log(response)
            resetMaterial()
        }
        
        //materias/editar
        /**
         * nm_material
         * nm_novo
         * vl_eco
         * sg_medida
         * 
         * returns 
         * inexistente => nao foi encontrado pelo antigo nome
         * existente => caso o novo nome ja exista
         * falha
         * atualizado
         */
        reset()
    } 

    function handleDeleteMaterial (id_material : string){
        deleteMaterialMutation(id_material)
        setIsOpenModal(!isOpen)

    }
    function handleDeleteResiduo (nm_residuo : string) {
        //dialog modal

        deleteResiduoMutation(nm_residuo)
        setIsOpenModal(!isOpen)

    }

    console.log(isOpen)
    if(modalData) {
        if("nm_residuo" in modalData ){
            return (
                <div className={`${isOpen ? "" : "hidden"} inset-0 flex items-center justify-center fixed z-20  `}>
        
                    <div className="absolute w-[300px] shadow-lg flex flex-col gap-3  p-5 text-zinc-100 text-2xl z-50 bg-zinc-800 rounded-md border border-zinc-700">
                        <button onClick={() => setIsOpenModal(!isOpen)} className="absolute top-2 right-2    hover:opacity-50 transition duration-200">
                            <CircleX size={20}/>
                        </button>
                        
                        <h1 className="text-4xl font-bold">
                            Edição do resíduo
                        </h1>
                        <form 
                        onSubmit={handleSubmit(handleEditFormResiduo)}
                        className="border flex flex-col items-center gap-3 border-zinc-700 rounded-md p-3">
                            <span className="bg-zinc-700 w-full p-2 rounded-sm">
                                codigo identificador: {modalData.id_residuo}
                            </span>
                            <span className="bg-zinc-700 w-full p-2 rounded-sm">
                                Nome do resíduo: {modalData.nm_residuo}
                            </span>
                            <input
                                {...register("new_nm_residuo")} 
                                className="rounded-md w-full bg-zinc-900 text-zinc-200 p-3"
                                type="text" 
                                placeholder="Editar o nome do resíduo"
                                value={modalData.nm_residuo}
                            />
                            <button 
                                className="border border-zinc-700 w-full p-2 rounded-md items-center justify-between flex flex-row-reverse font-bold" 
                                type="submit">
                                <Edit size={24}/> <span>Editar</span>
                            </button>
                        </form>
                        <button
                            onClick={() => handleDeleteResiduo(modalData.nm_residuo)}
                            className="bg-red-500 rounded-md p-3 hover:bg-red-600 transition duration-100 font-bold">
                            Deletar
                        </button>
                    </div>
                    
                </div>
            )
        }
        if("nm_material" in modalData){
            return (
                <div className={`${isOpen ? "" : "hidden"} inset-0 flex items-center justify-center fixed z-20  `}>
        
                    <div className="absolute w-[300px] shadow-2xl flex flex-col gap-3  p-5 text-zinc-100 text-2xl z-50 bg-zinc-800 rounded-md border border-zinc-700">
                        <button onClick={() => setIsOpenModal(!isOpen)} className="absolute top-2 right-2    hover:opacity-50 transition duration-200">
                            <CircleX size={20}/>
                        </button>
                        
                        <h1 className="text-4xl font-bold">
                            Edição do Material
                        </h1>
                        <form 
                        onSubmit={handleSubmitMaterial(handleEditFormMaterial)}
                        className="border flex flex-col items-center gap-3 border-zinc-700 rounded-md p-3">
                            <span className="bg-zinc-700 border border-zinc-900 w-full p-2 rounded-md flex justify-between">
                                 <span>Id:</span> {modalData.id_material}
                            </span>
                            <span className="bg-zinc-700 border border-zinc-900 w-full p-2 rounded-md flex justify-between">
                                <span>Nome:</span> {modalData.nm_material}
                            </span>
                            <span className="bg-zinc-700 border border-zinc-900 w-full p-2 rounded-md flex justify-between">
                                <span>Valor:</span> {modalData.vl_eco} ecos
                            </span>
                            <span className="mb-8 bg-zinc-700 border border-zinc-900 w-full p-2 rounded-md flex justify-between">
                                <span>Medida:</span> {modalData.sg_medida}
                            </span>
                            <input
                                {...registerMaterial("nm_material")} 
                                className="rounded-md w-full bg-zinc-900 text-zinc-200 p-3"
                                type="text" 
                                value={modalData.nm_material}
                                placeholder="Editar o nome do Material"
                            />
                             
                        
                             <input
                                {...registerMaterial("vl_eco" , {valueAsNumber : true} )} 
                                className="rounded-md w-full bg-zinc-900 text-zinc-200 p-3"
                                type="number" 
                                value={modalData.vl_eco}
                                placeholder="Editar o valor em eco"
                            />
                            <select
                                {...registerMaterial("sg_medida")} 
                                className="rounded-md w-full bg-zinc-900 text-zinc-200 p-3"
                                value={"Kg"}
                               
                            >
                                <option value="Kg">Kg</option>
                                <option value="L">L</option>
                            </select>
                            <button 
                                className="border border-zinc-700 w-full p-2 rounded-md items-center justify-between flex flex-row-reverse font-bold" 
                                type="submit">
                                <Edit size={24}/> <span>Editar</span>
                            </button>
                        </form>
                        <button 
                        onClick={() => handleDeleteMaterial(String(modalData.id_material))}
                        className="bg-red-500 rounded-md p-3 hover:bg-red-600 transition duration-100 font-bold">
                            Deletar
                        </button>
                    </div>
                </div>
            )
        }
    }
    

}