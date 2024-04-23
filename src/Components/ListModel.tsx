import { ClientRequest } from "../pages/Client/Home"
import CloseButton from "../assets/close.svg"
import { SetStateAction, useState } from "react"
import BaseURL from "../Queries/BaseURL"
import { X } from "lucide-react"


/**
 * tbodylist vai possuir um array e nele, cada posicao considera-se como sendo um trow
 * logo, a ideia eh criar um array a partir das chaves do objeto com Object.keys
 * e dessa forma criar o td a percorrendo a partir deste Object.keys => Array<>
 */

interface RequestPropsForModal {
  id_solicitacao : number 
  nm_codigo : string
  nm_usuario : string
  isOpen : boolean
  setIsOpen : React.Dispatch<SetStateAction<boolean>>
} 

type Props = {
  type : "pessoas" | "produtos" | "Recebimentos" | "usuarioLogadoSolicitacoes"
  theadList : Array< string>
  tbodyList : Array<ClientRequest >
}

export const ListModel = ({type, theadList, tbodyList}: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<RequestPropsForModal>({} as RequestPropsForModal)
  function handleOpenReceived (element : any) {
    console.log(element)
    setIsOpen(!isOpen)
    setModalData({
      id_solicitacao : element.id_solicitacao,
      nm_codigo : element.nm_codigo,
      nm_usuario : element.nm_usuario,
      isOpen,
      setIsOpen
    })
  }


  return (

    <section className='w-[1000px] relative transition-all duration-200 m-auto border border-zinc-700 p-3 rounded-md mb-2 max-h-[450px] overflow-y-auto '>
        <button
          onClick={() => setIsOpen(!isOpen)} 
          className={`${isOpen ? "" : "hidden"} text-xl   rounded-md absolute z-30 top-3 text-red-500 font-bold`}>
          <X size={23}/>
        </button>
        {
          isOpen && <ModalAcceptation 
          id_solicitacao={modalData.id_solicitacao} 
          nm_codigo={modalData.nm_codigo} 
          nm_usuario={modalData.nm_usuario}
          setIsOpen={setIsOpen}
          isOpen = {isOpen}
          /> 

        }

      
      <div className="mb-3">
        {type == "Recebimentos" &&  <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Lista de Recebimentos</h1> }
        {type == "pessoas" &&  <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Clientes cadastrados</h1>  }
        {type == "usuarioLogadoSolicitacoes" &&   <h1 className='text-2xl text-zinc-200 font-bold rounded-md border border-zinc-700 p-2 '> Minhas solicitações</h1>  }
      </div>

      {
        tbodyList.length > 0 ? (
          <table className=" border-spacing-3 border-spacing-y-9 ">
          <thead className="w-full  text-left bg-zinc-950 rounded-md">
            <tr className="w-full">
              {theadList.length > 0 && theadList.map(element => (
                <th key={element} className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody className=" border-collapse w-full max-h-[400px] overflow-y-auto ">
              {
                tbodyList.length > 0 && tbodyList.map((element) =>{
                  const keys = Object.keys(element)
                  
                  return (
                    <tr onClick={() => handleOpenReceived(element)} className=" cursor-pointer hover:opacity-80 transtion duration-200  even:bg-zinc-800 odd:bg-zinc-700 " key={element.id_solicitacao}>
                    {keys.map((_, index) => {
                      const actualKey = keys[index]
                      const value = element[actualKey] 
                      return (
                        <td key={Math.round(Math.random() * 23000)} className='my-4 border-spacing-2 p-4 text-2xl text-zinc-100 font-bold'>
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



function ModalAcceptation({id_solicitacao,nm_codigo,nm_usuario, isOpen, setIsOpen} : RequestPropsForModal) {
  async function handleAcceptRequest() {
    
    const form = new FormData()

    form.append("id_solicitacao", String(id_solicitacao))

    const response = await fetch(`${BaseURL.baseURL}/solicitacoes/aceitar`, {
      method : "POST",
      body : form,
      headers : {
        Authorization : `Bearer ${BaseURL.getUserKey()}`
      }
    }).then(data => data.json())
    console.log(response)

    setIsOpen(!isOpen)
  }
  async function handleDeclineRequest() {
    
    const form = new FormData()

    form.append("id_solicitacao", String(id_solicitacao))

    const response = await fetch(`${BaseURL.baseURL}/solicitacoes/negar`, {
      method : "POST",
      body : form,
      headers : {
        Authorization : `Bearer ${BaseURL.getUserKey()}`
      }
    }).then(data => data.json())
    console.log(response)
    setIsOpen(!isOpen)
  }
  return (
    <article className={`relative bg-zinc-800 rounded-md border border-zinc-700 p-4 text-zinc-200 flex justify-between items-center text-2xl font-bold mb-3`} >
        <span>
          Para o usuário: {nm_usuario && nm_usuario}
        </span>
        <h1>

          Solicitação selecionada: {nm_codigo && nm_codigo}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleDeclineRequest} 
            className="rounded-md bg-red-500 border border-red-600 p-4 text-zinc-200 font-bold hover:bg-red-700 transition duration-150 ">
            Negar
          </button>
          <button 
            onClick={handleAcceptRequest}
            className="rounded-md bg-green-500 border border-green-600 p-4 text-zinc-200 font-bold hover:bg-green-700 transition duration-150">
            Aceitar
          </button>
        </div>

      </article>
  )
}
