import React from 'react'

interface IProduct {
  nm_produto : string
  ds_produto : string
  nm_imagem : string
  vl_eco : number
  vl_brl : number
  qt_estoque : number
}

type Props = {
  tbodyList : IProduct []
}

const ProductsList = (props: Props) => {
  return (
    <table className=" border-spacing-3 border-spacing-y-9 ">
          <thead className="w-full  text-left bg-zinc-950 rounded-md">
            <tr className="w-full">
              <th className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>
                Id
              </th>
              <th className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>
                Nome
              </th>
              <th className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>
                valor em ecos
              </th>
              <th className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>
                R$
              </th>
              <th className='first:rounded-tl-md last:rounded-tr-md text-2xl border-zinc-800 p-4 text-zinc-100 font-bold'>
                em estoque
              </th>
            </tr>
          </thead>
          <tbody className=" border-collapse w-full max-h-[400px] overflow-y-auto">
            <tr className='my-3 cursor-pointer hover:opacity-80 transtion duration-200  even:bg-zinc-800 odd:bg-zinc-700 '>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
       
  )
}

export {ProductsList}