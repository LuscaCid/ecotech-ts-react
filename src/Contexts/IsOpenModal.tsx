import { createContext, ReactNode, SetStateAction, useContext, useState } from "react"

interface RequestPropsForModal {
    id_solicitacao : number 
    nm_codigo : string
    nm_usuario : string
  } 
  


interface IsOpenProps {
    isOpen : boolean
    changeIsOpen : (bool : boolean) => void
    modalData : RequestPropsForModal | undefined
    setModalData : React.Dispatch<SetStateAction<RequestPropsForModal | undefined>>
  }
  const IsOpenContext = createContext({} as IsOpenProps)
  
  export function IsOpenContextProvider ({children} : {children : ReactNode}) {
    
    const [modalData, setModalData] = useState<RequestPropsForModal|undefined>(undefined)
  
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const changeIsOpen = (bool : boolean) => {
      setIsOpen(!bool)
    }
  
    return (
      <IsOpenContext.Provider value={
        { 
          isOpen,
          changeIsOpen,
          modalData,
          setModalData
        }
      } >
        {children}
      </IsOpenContext.Provider>
    )
  }

export function useIsOpenContext() {
    const context = useContext(IsOpenContext)
    return context
}