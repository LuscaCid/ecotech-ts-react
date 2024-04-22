import { ClientRequest } from "../pages/Client/Home";
import BaseURLConstants from "./BaseURL";

async function getMyRequests () : Promise<ClientRequest []> {
    console.log(BaseURLConstants.getUserKey)
    const response = await fetch(`${BaseURLConstants.baseURL}/usuario/lista`, {
        headers : {
            Authorization : `Bearer ${BaseURLConstants.getUserKey()}`
        }
    }).then(data => data.json())
    console.log(BaseURLConstants.getUserKey())
    
    return response
}
export {getMyRequests}