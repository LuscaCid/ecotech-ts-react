import { IResiduos } from "../pages/Client/Requests"
import URLConstant from "./BaseURL"
async function getResiduos () : Promise<IResiduos []> {
    const residuos : IResiduos []=  await fetch(`${URLConstant.baseURL}/residuos/lista`, {
        headers : {
            Authorization : `Bearer ${URLConstant.getUserKey()}`
        }
    })
    .then(data => data.json())
    return residuos
}
async function getMateriais () : Promise<IResiduos []> {
    const residuos : IResiduos []=  await fetch(`${URLConstant.baseURL}/materiais/lista`, {
        headers : {
            Authorization : `Bearer ${URLConstant.getUserKey()}`
        }
    })
    .then(data => data.json())
    console.log(residuos)
    return residuos
}


export {getResiduos, getMateriais}