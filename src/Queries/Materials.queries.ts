import { MaterialsSchemaType, ResiduosSchemaType } from "../pages/Employee/CreateMatRes";
import BaseURL from "./BaseURL";
export interface IMaterial {
  id_material : number
  nm_material : string
  vl_eco : number
  nm_residuo : string
}
export interface IResidual {
  nm_residuo : string
  id_residuo : number
}

export async function getMaterials () : Promise<IMaterial[]> {
  const response : IMaterial[] = await fetch(`${BaseURL.baseURL}/materiais/lista`, {
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  return response;
}

export async function getResiduals () : Promise<IResidual[]>{
  const response : IResidual[] = await fetch(`${BaseURL.baseURL}/residuos/lista`, {
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  return response;
}


export async function addResiduo(data : ResiduosSchemaType) {

  const {nm_residuo} = data
  const form = new FormData()
  form.append("nm_residuo", nm_residuo)

  const response = await fetch(`${BaseURL.baseURL}/residuos/adicionar`, {
    method : "POST",
    body: form,
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())
  console.log(response)
}

export async function addMaterial(formData : MaterialsSchemaType & {nm_residuo : string}) {
  const form = new FormData()
  form.append("nm_residuo", formData.nm_residuo)
  form.append("id_residuo", formData.id_residuo)
  form.append("vl_eco", String(formData.vl_eco))
  form.append("sg_medida", formData.sg_medida)
  form.append("nm_material", formData.nm_material)

  
  const response = await fetch(`${BaseURL.baseURL}/materiais/adicionar`, {
    method : "POST",
    body : form,
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  console.log(response)
}


//residuo delete
export async function deleteResiduo(nm_residuo : string) {
 
  const form = new FormData()
  form.append("nm_residuo", nm_residuo)

  const response = await fetch(`${BaseURL.baseURL}/residuos/remover`, {
    method : "POST",
    body : form,
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  console.log(response)
}
//material delete
export async function deleteMaterial(id_material : string) {
 
  const form = new FormData()
  form.append("id_material",id_material)

  const response = await fetch(`${BaseURL.baseURL}/materiais/remover`, {
    method : "POST",
    body : form,
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  console.log(response)
}