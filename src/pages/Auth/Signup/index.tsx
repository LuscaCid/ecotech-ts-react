
import LoginAside from "../../../assets/login-aside.svg"
import AddEnd from "../../../assets/add.svg"
import { AuthHeader } from "../../../Components/AuthHeader"

export function Signup () {
  return (
    <div className="body">
      <AuthHeader isLogin={false}/>

      <div className=" bg-zinc-900 flex flex-col items-center justify-center">


        <div className="app mt-20 rounded-lg bg-zinc-800 flex items-center justify-between min-w-[1000px] h-[400px] shadow-lg">
            <aside className="w-1/2 h-full bg-gradient-to-r from-green-500 to-zinc-800 rounded-l-lg border-r border-zinc-700 relative">
                <div className=" hidden p-4 border border-green-700 rounded-lg">
                    <h2 className="text-zinc-200 text-2xl border-b border-green-700 pb-2">Lista de endereços adicionados</h2>
                    <div id="lista-enderecos" className="mt-4 overflow-y-auto max-h-40">
                        {/* Conteúdo da lista de endereços */}
                    </div>
                </div>
                <h1 className="text-white text-6xl border-b-2 border-white pb-1 mb-4 absolute bottom-2 left-2">W5I</h1>
                <img className="image w-24 absolute bottom-2 right-2" src={LoginAside} alt="" />
            </aside>

            <form id="form-registro" className="w-1/2 h-full flex flex-col  px-8 py-6 rounded-r-lg bg-zinc-800">
                <legend className="text-zinc-100 text-4xl border-b border-green-500 pb-2 mb-4 font-semibold">Cadastro</legend>
                <div className="input-wrapper">
                    <label htmlFor="usuario" className="sr-only">Nome de usuário</label>
                    <input
                        type="text"
                        name="usuario"
                        id="usuario"
                        placeholder="Usuário"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100  text-2xl mb-4"
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="senha" className="sr-only">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        placeholder="Senha"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100  text-2xl mb-4"
                    />
                </div>
                <h2 className="text-zinc-100 text-2xl border-b border-green-500 pb-2 mb-4">Adicione ao menos um endereço</h2>
                <div className="inputs grid grid-cols-3 gap-4 ">
                    <div className="input-wrapper">
                        <label htmlFor="cep" className="sr-only">CEP</label>
                        <input
                            type="text"
                            name="cep"
                            id="cep"
                            placeholder="CEP"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl " 
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="bairro" className="sr-only">Bairro</label>
                        <input
                            type="text"
                            name="bairro"
                            id="bairro"
                            placeholder="Bairro"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl"  
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="rua" className="sr-only">Nome da rua</label>
                        <input
                            type="text"
                            name="rua"
                            id="rua"
                            placeholder="Rua"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl"  
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="estado" className="sr-only">Estado Federal</label>
                        <input
                            type="text"
                            name="estado"   
                            id="estado"
                            placeholder="Estado"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl"  
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="numero" className="sr-only">Numero da casa</label>
                        <input
                            type="number"
                            name="numero"
                            id="numero"
                            placeholder="Número da casa"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl"  
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="cidade" className="sr-only">Cidade</label>
                        <input
                            type="text"
                            name="cidade"
                            id="cidade"
                            placeholder="Cidade"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-3 px-4 text-zinc-100 text-2xl"  
                        />
                    </div>
                </div>
                <button id="btn-registrar" type="submit" className="mt-4 bg-green-600 py-3 px-6 rounded-md text-white font-semibold text-lg transition duration-200 hover:bg-green-700">Registrar</button>
            </form>
        </div>
    </div>

    </div>
  )
}