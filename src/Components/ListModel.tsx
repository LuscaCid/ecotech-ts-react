import { useRef, useState } from "react"
import { ClientRequest } from "../pages/Client/Home"

/**
 * tbodylist vai possuir um array e nele, cada posicao considera-se como sendo um trow
 * logo, a ideia eh criar um array a partir das chaves do objeto com Object.keys
 * e dessa forma criar o td a percorrendo a partir deste Object.keys => Array<>
 */

type Props = {
  type : "pessoas" | "produtos" | "Recebimentos" | "usuarioLogadoSolicitacoes"
  theadList : Array< string>
  tbodyList : Array<ClientRequest >
}

export const ListModel = ({type, theadList, tbodyList}: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
 
  function handleOpenReceived (element : any) {
    console.log(element)
    if(type == "Recebimentos") 
    {
      setIsOpen(!isOpen)
    } else return
  }
  
  function handleAcceptClientRequest() {

  }

  return (
    <section className='w-[800px] m-auto border border-zinc-700 p-3 rounded-md mb-2'>
      
      <ModalAcceptation isOpen={isOpen} modalContent={{id_solicitacao : 2, nm_codigo : "dasd", nm_usuario : "asdd"}} /> 
      
      <div className="mb-3">
        {type == "Recebimentos" &&  <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Lista de Recebimentos</h1> }
        {type == "pessoas" &&  <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Clientes cadastrados</h1>  }
        {type == "usuarioLogadoSolicitacoes" &&   <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Minhas solicitações</h1>  }
      </div>

      {
        tbodyList.length > 0 ? (
          <table className="border-spacing-3 border-spacing-y-9 ">
          <thead className="w-full  text-left bg-zinc-950 rounded-md">
            <tr className="w-full">
              {theadList.length > 0 && theadList.map(element => (
                <th key={element} className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody className=" border-collapse w-full max-h-[400px]">
              {
                tbodyList.length > 0 && tbodyList.map((element) =>{
                  const keys = Object.keys(element)
                  
                  return (
                    <tr onClick={() => handleOpenReceived(element)} className="cursor-pointer hover:opacity-80 transtion duration-200  even:bg-zinc-800 odd:bg-zinc-700 " key={element.id_solicitacao}>
                    {keys.map((_, index) => {
                      const actualKey = keys[index]
                      const value = element[actualKey]
                      return (
                        <td key={Math.round(Math.random() * 23000)} className='my-4  p-4 text-2xl text-zinc-100 font-bold'>
                          {value}
                        </td>
                      )
                    })}
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

interface RequestPropsForModal {
  id_solicitacao : number 
  nm_codigo : string
  nm_usuario : string
} 

interface ModalProps {
  isOpen : boolean
  modalContent: RequestPropsForModal
}
function ModalAcceptation({isOpen, modalContent }: ModalProps) {
  
  let hiddenClassname = "hidden bg-zinc-800 rounded-md border border-zinc-700 p-4 text-zinc-200 flex justify-between items-center text-2xl font-bold mb-3"

  if(isOpen) {
    hiddenClassname = "bg-zinc-800 rounded-md border border-zinc-700 p-4 text-zinc-200 flex justify-between items-center text-2xl font-bold mb-3";

  } else if(!isOpen) hiddenClassname = "hidden bg-zinc-800 rounded-md border border-zinc-700 p-4 text-zinc-200 flex justify-between items-center text-2xl font-bold mb-3"
  
  return (
    <article className={hiddenClassname} >
        <span>
          Para o usuário: {modalContent.nm_usuario}
        </span>
        <h1>

          Solicitação selecionada: {modalContent.nm_codigo}
        </h1>
        <div className="flex gap-3">
          <button  className="rounded-md bg-red-500 border border-red-600 p-4 text-zinc-200 font-bold hover:bg-red-700 transition duration-150 ">
            Negar
          </button>
          <button className="rounded-md bg-green-500 border border-green-600 p-4 text-zinc-200 font-bold hover:bg-green-700 transition duration-150">
            Negar
          </button>
        </div>

      </article>
  )
}