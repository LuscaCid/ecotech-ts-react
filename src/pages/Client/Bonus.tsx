import Search from "../../assets/search.svg"
import CoinVertical from "../../assets/coin-vertical-svgrepo-com.svg"
import { ClientProductsListRendering, Product } from "../../Components/ProductsClientRendering"
import { NavLink } from "react-router-dom"

const fakeProducts : Product [] = [
  {
    id_produto : 1,
    nm_produto : "carrin",
    ds_produto : "carrin para disputas acirradas",
    nm_imagem : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0vFD7rv0fqkLL5r37-O47B7gLfCn-q-lvetVb9V75w&s",
    vl_brl : 12,
    vl_eco : 3000
  },{
    id_produto : 2,
    nm_produto : "carrin",
    ds_produto : "carrin para disputas acirradas",
    nm_imagem : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0vFD7rv0fqkLL5r37-O47B7gLfCn-q-lvetVb9V75w&s",
    vl_brl : 12,
    vl_eco : 3000
  },
  {
    id_produto : 3,
    nm_produto : "carrin",
    ds_produto : "carrin para disputas acirradas",
    nm_imagem : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0vFD7rv0fqkLL5r37-O47B7gLfCn-q-lvetVb9V75w&s",
    vl_brl : 12,
    vl_eco : 3000
  },
  {
    id_produto : 4,
    nm_produto : "carrin",
    ds_produto : "carrin para disputas acirradas",
    nm_imagem : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0vFD7rv0fqkLL5r37-O47B7gLfCn-q-lvetVb9V75w&s",
    vl_brl : 12,
    vl_eco : 3000
  }
]

export function BonusPage () {
  return (
    <>
      <header className="items-center pt-10 pb-20 py-2 w-full px-9 bg-zinc-800 flex justify-between border-b border-zinc-700">
    <div className="flex gap-10 items-center">
      <NavLink to="/" className="text-4xl font-bold text-white">EcoTech</NavLink>
      <span className="text-2xl text-zinc-100 rounded-md bg-zinc-700 px-4 py-3 font-bold">Ola, Lucas</span>  
      <form id="formulario-busca-produto" className="flex gap-3">
        <input id="pesquisar" className="rounded-md bg-zinc-900 w-96 px-4 text-2xl text-zinc-200" placeholder="Pesquisar" type="text"/>
        <button type="submit" className="hover:bg-zinc-700 p-2 rounded-md transition duration-200">
          <img src={Search} alt="icone de loopa para buscar produto"/>
        </button>
      </form>
    </div>
    
    <div className="flex gap-3 ">
      <span className="flex gap-1 items-center mr-4 bg-zinc-700 px-3 pr-5 rounded-md">
        <img src={CoinVertical} alt="icone de moeda"/>
        <p id="ecocoins" className="text-3xl text-zinc-200 ">500</p>
      </span>
      <NavLink to="/requests" className="flex items-center justify-center rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-700 bg-green-600  duration-100">
        Gerar solicitação
      </NavLink>
      <button className="rounded-md p-4 text-2xl font-bold text-white border border-zinc-700 hover:bg-green-600  duration-100">
        Logout
      </button>
    </div>
  </header>
  <div className="flex gap-2 items-start">
    
    <main id="renderizador-produtos" className="w-[800px] min-w-[750px] p-4 grid grid-cols-3 gap-3 items-center border border-zinc-800 rounded-md ml-20 mt-6 mb-2 overflow-y-auto">
      <ClientProductsListRendering productsList={fakeProducts} />
    </main>
    <aside className=" w-full text-zinc-100 flex flex-col gap-2 mt-6 rounded-md  border mr-20 border-zinc-800 h-[420px] max-h-[450px] min-h-[400px] p-4">
      <header className="flex items-center gap-2 border border-zinc-800 text-3xl hover:bg-zinc-800 p-2 rounded-md transition duration-200">
        Total no carrinho: <span id="total-ecos"> </span> 
      </header> 
    
      <div className="max-h-[330px]  overflow-y-auto mb-2">
      <table className="border-collapse text-zinc-100 first:rounded-t-md last:rounded-s-md w-full">
          <tbody id="renderizador-carrinho" className="w-full text-2xl flex flex-col gap-2">
          </tbody>  
        </table>
      </div>
      <button id="botao-comprar" className=" disabled:opacity-5 disabled:hover:bg-none disabled:cursor-not-allowed self-end w-full p-4 transition duration-150 text-2xl font-bold  rounded-md bg-none border border-zinc-800 hover:bg-green-600">
        Comprar
      </button>
    </aside>   
  </div>
  

    </>
    
  )
}