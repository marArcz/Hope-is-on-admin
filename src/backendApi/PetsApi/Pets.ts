import { PetModel } from './../../Models/TypeModels';
import axios, { AxiosError, AxiosResponse } from "axios";

type PetParam = {
    photos: [];
    name: string;
    description: string;
    age: string;
    address: string;
    gender: string;
    categoryId: number,
    breedIds: number[],
    vaccineIds: number[]
}

const Pets = {
    error: {},
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
    insert: async ({ name, age, description, gender, address, categoryId, breedIds, vaccineIds, photos }: PetParam): Promise<AxiosResponse | AxiosError> => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log("breedIds: ", breedIds)
        console.log("vaccineIds: ", vaccineIds)
        var formData = new FormData();
        formData.append("name", name)
        formData.append("age", age)
        formData.append("description", description)
        formData.append("gender", gender)
        formData.append("address", address)
        formData.append("categoryId", categoryId.toString())
        for (let breedId of breedIds) {
            formData.append("breedId[]", breedId.toString())
        }
        for (let vaccineId of vaccineIds) {
            formData.append("vaccineId[]", vaccineId.toString())
        }
        for (let photo of photos) {
            formData.append("photo[]", photo)
        }

        return axios.post("/pets/insert", formData, config)
            .then(res => res)
            .catch(err => err)
    }
}

export default Pets