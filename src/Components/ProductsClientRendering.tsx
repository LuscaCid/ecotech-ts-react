import EcoCoin from "../assets/coin.svg"
import AddToCart from "../assets/cart-add.svg"

export type Product = {
  id_produto : number
  nm_produto : string
  vl_eco : number
  nm_imagem : string
  vl_brl : number
  ds_produto : string
}

interface Props {
  productsList : Array<Product>
}

export function ClientProductsListRendering ( {productsList }: Props) {
  return (
    <>
      {
        productsList.length > 0 && productsList.map(produto => (
          <article className="group" key={produto.id_produto}>
            <div className="bg-transparent  h-[400px] max-w-96 w-fit rounded-lg flex flex-col gap-1 hover:bg-zinc-800 transition duration-200 ">
              <div className="overflow-hidden">
                <img 
                className="group-hover:scale-110 min-h[360px] transition duration-300 w-96 h-96 rounded-t-lg "
                src={produto.nm_imagem} 
                />
              </div>
              
              <div  className="p-2 text-zinc-100 flex flex-col gap-2">
                <h2 className="text-4xl">{produto.nm_produto}</h2>
                <p className="text-2xl">{produto.ds_produto}</p>
                <span  className="text-2xl flex items-center ">
                  <img src={EcoCoin}/> <p className=" text-3xl text-green-400"/> ${produto.vl_eco} <p className="ml-2"> ecos</p>
                </span>
                <button  className="botao-carrinho flex items-center justify-between rounded-md p-4 transition duration-150 bg-green-600 text-zinc-100 font-bold text-2xl hover:bg-green-700">
                  Adicionar <img src={AddToCart} alt=""/>
                </button>
              </div>
            </div>
          </article>
        ))
      }
    </>
  )
}