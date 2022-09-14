import { BreedModel } from './../../Models/TypeModels';
import axios, { AxiosError, AxiosResponse, ResponseType } from "axios";
import { CategoryModel } from "../../Models/TypeModels";

const breeds = {
    insert : async (name:any,categoryId:any):Promise<AxiosResponse | AxiosError> => {
        return await axios.post("/breeds/insert",{
            name,categoryId
        })
        .then(res => res)
        .catch(err => err)
    },
    getAll : async (categoryId:number):Promise<CategoryModel[]> =>{
        return await axios.get(`/breeds/${categoryId}/getAll`)
        .then(res => res.data)
    }
}

export default breeds;