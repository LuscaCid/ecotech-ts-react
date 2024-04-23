import { useState } from "react"
import Redirect from "../assets/redirect.svg"
import { MatResModalEdition, ModalDataRenderingMaterial, ModalDataRenderingResiduo } from "./MatResEdition"

interface Props {
    type? : "produtos" | "MatRes"
    tbodyList : any []
    theadList : string []
}

export function GenericalList({tbodyList, theadList, type} : Props) {

  const [isOpen, setIsOpen ] = useState<boolean>(false)
  const [elementSelected, setElementSelected ] = useState<ModalDataRenderingMaterial | ModalDataRenderingResiduo >()
  

    return (
      <section className='w-full m-auto border border-zinc-700 p-3 rounded-md mb-2 max-h-[650px] overflow-y-auto '> 
      <MatResModalEdition isOpen = {isOpen} modalData={elementSelected!} setIsOpenModal={setIsOpen} />
      {
        type && (
            <div className="mb-3">
                {type == "produtos" &&  <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Clientes cadastrados</h1>  }
            </div>
    
        )
      }
     
      {
        tbodyList.length > 0 ? (
          <table className=" border-spacing-3 border-spacing-y-9 w-full ">
          <thead className="w-full  text-left bg-zinc-950 rounded-md">
            <tr className="w-full">
              {theadList.length > 0 && theadList.map(element => (
                <th key={element} className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody className=" border-collapse w-full max-h-[550px] overflow-y-auto ">
              {
                tbodyList.length > 0 && tbodyList.map((element) =>{
                  const keys = Object.keys(element)
                  
                  return (
                    <tr className="transtion duration-200  even:bg-zinc-800 odd:bg-zinc-700 " key={String(Math.round(Math.random() * 230000))}>
                    {keys.map((_, index) => {
                      const actualKey = keys[index]
                      const value = element[actualKey] 
                      return (
                        <td key={Math.round(Math.random() * 23000)} className='my-4 border-spacing-2 p-4 text-2xl text-zinc-100 font-bold'>
                          {value}
                        </td>
                      )
                    })}
                    {type == "MatRes" && (
                      <td>
                        <button onClick={() => {
                          setIsOpen(true)
                          setElementSelected(element)
                      }} className="bg-zinc-900 p-2 hover:bg-zinc-800 rounded-md m-5 ">
                        <img src={Redirect} alt="redirection icon" />
                      </button>
                      </td>
                      
                    )}
                  </tr>
                  )
                })
                
              }
          </tbody>
        </table>
        ) : (<h1 className="text-zinc-200 text-4xl text-nowrap">Nenhum resultado encontrado!</h1>)
        
      }
      </section>
    )
}