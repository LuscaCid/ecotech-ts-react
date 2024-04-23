import BaseURL from "./BaseURL";

export async function AllClientRequests (query : string) {
    await new Promise(resolver => setTimeout(resolver, 1000))
    const response = await fetch(`${BaseURL.baseURL}/solicitacoes/lista?pesquisa=${query}`,
        {
            headers : {
                Authorization : `Bearer ${BaseURL.getUserKey()}`
            }
        }
    )
    .then(data => data.json())
    console.log(response)
    return response
}