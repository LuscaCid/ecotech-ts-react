
import URlConstant from "./BaseURL"
async function LoginQuery (formData : FormData) {

    const response = await fetch (`${URlConstant.baseURL}/usuario/logar`, {
        method : "POST",
        body : formData
    }).then(data => data.json())
    
    return response
}


export {LoginQuery}