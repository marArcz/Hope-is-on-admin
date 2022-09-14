import axios from "axios";
import { VaccineModel } from "../../Models/TypeModels";

const vaccines = {
    getAll : async(categoryId:number):Promise<VaccineModel[]> =>{
        return await axios.get("/vaccines/{id}/getAll")
        .then(res => res.data)

    }
}

export default vaccines;