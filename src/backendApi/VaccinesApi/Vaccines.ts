import axios, { AxiosError, AxiosResponse } from "axios";
import { VaccineModel } from "../../Models/TypeModels";

const vaccines = {
    getAll : async(categoryId:number):Promise<VaccineModel[]> =>{
        return await axios.get(`/vaccines/${categoryId}/getAll`)
        .then(res => res.data)
    },
    insert : async(name:any, categoryId:number):Promise<AxiosResponse | AxiosError> => {
        return await axios.post("/vaccines/insert",{
            name,
            categoryId
        })
        .then(res => res)
        .catch(err => err)
    }
}

export default vaccines;