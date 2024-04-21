import React, { ReactNode } from 'react'

type Props = {
  type : "pessoas" | "produtos" | "Recebimentos" | "usuarioLogadoSolicitacoes"
  theadList : Array<string>
  tbodyList : Array<string>
}

export const ListModel = ({type, theadList, tbodyList}: Props) => {
  return (
    <section className='w-[900px] m-auto mt-12 border border-zinc-700 p-3 rounded-md'>
      <h1>
        {type == "Recebimentos" && ( <h1 className='text-2xl text-zinc-900 rounded-md border border-zinc-700 p-2 '></h1> ) }
        {type == "pessoas" && ( <h1 className='text-2xl text-zinc-900 rounded-md border border-zinc-700 p-2 '></h1> ) }
        {type == "usuarioLogadoSolicitacoes" && ( <h1 className='text-2xl text-zinc-900 rounded-md border border-zinc-700 p-2 '></h1> ) }
      </h1>
      <table>
        <thead>
          <tr>
            {theadList.length > 0 && theadList.map(element => (
              <th>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
              tbodyList.length > 0 && tbodyList.map(element => (
                <tr>
                  {tbodyList.map(() => (
                    <td>{element}</td>
                  ))}
                </tr>
              ))
            }
        </tbody>
      </table>
    </section>
    
  )
}
