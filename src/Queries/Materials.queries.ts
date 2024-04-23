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

export async function getResiduals () {
  const response : IResidual[] = await fetch(`${BaseURL.baseURL}/residuos/lista`, {
    headers : {
      Authorization : `Bearer ${BaseURL.getUserKey()}`
    }
  }).then(data => data.json())

  return response;
}