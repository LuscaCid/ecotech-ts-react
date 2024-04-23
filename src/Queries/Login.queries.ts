
import URlConstant from "./BaseURL"
async function LoginQuery (formData : FormData) {

    const response = await fetch (`${URlConstant.baseURL}/logar`, {
        method : "POST",
        body : formData
    }).then(data => data.json())
    
    return response
}


export {LoginQuery}