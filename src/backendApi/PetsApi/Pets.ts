import { PetModel } from './../../Models/TypeModels';
import axios from "axios";

type PetParam = {
    photos: [];
    name: string;
    description: string;
    age: string;
    address: string;
    gender: string;
    categoryId:number,
    breedId:number,
    vaccines:[]
}

const Pets = {
    error:{},
    getAll: async (categoryId: number | undefined = undefined): Promise<Array<PetModel>> => {
        var pets: PetModel[];
        if (categoryId) {
            pets = await axios.get<Array<PetModel>>(`/pets/${categoryId}`).then(res => res.data)
            return pets
        } else {
            pets = await axios.get<Array<PetModel>>("/pets").then(res => res.data)
            return pets
        }
    },
    insert: async ({name,age,description,gender,address,categoryId,breedId,vaccines,photos}:PetParam):Promise<Boolean> =>{
        return axios.post("/pets/insert",{
            name,
            age,
            description,
            address,
            gender,
            categoryId,
            breedId,
            vaccines,
            photos
        }).then(res => true)
        .catch(res => {
            Pets.error = res
            return false
        })
    }
}

export default Pets