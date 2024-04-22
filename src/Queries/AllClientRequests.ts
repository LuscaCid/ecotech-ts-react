import BaseURL from "./BaseURL";

export async function AllClientRequests (query : string) {
    const response = await fetch(`${BaseURL.baseURL}/solicitacoes/lista?pesquisa=${query}`,
        {
            headers : {
                Authorization : `Bearer ${BaseURL.getUserKey()}`
            }
        }
    )
    .then(data => data.json())
    return response
}