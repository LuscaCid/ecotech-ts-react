import { EmployeeHeader } from "../../Components/EmplyeeHeader";

export function ProductsPage() {
  return (
    <>
      <EmployeeHeader />
      <main className="p-4 rounded-md text-zinc-100 bg-zinc-800 border max-w-[800px] m-auto mt-12 border-zinc-700">
      <h2 className="text-3xl font-bold">Cadastro de Produto</h2>
      <div className="input-container">
        <form 
          className="rounded-md border border-zinc-700 p-3 flex flex-col gap-2"
        >
          <label htmlFor="link-imagem">Link da Imagem:</label>
          <input type="url" className="rounded-md bg-zinc-900 border-zinc-800 border p-3 text-zinc-200 " required />

          <label htmlFor="nome">Nome do produto:</label>
          <input type="text" className="rounded-md bg-zinc-900 border-zinc-800 border p-3 text-zinc-200 " required />

          <label htmlFor="descricao">Descrição do produto:</label>
          <textarea className="rounded-md bg-zinc-900 border-zinc-800 border p-3 text-zinc-200  resize-none h-40" required></textarea>

          <label htmlFor="preco">Preço:</label>
          <input type="number" min="0" step="0.01" className="half-width" required />

          <label htmlFor="quantidade">Quantidade:</label>
          <input type="number" min="0" className="half-width" required />

          <button type="submit">Cadastrar Produto</button>
        </form>
      </div>
    </main>
    </>
  )
}