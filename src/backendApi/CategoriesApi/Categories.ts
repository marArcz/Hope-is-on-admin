import axios from "axios"

const Categories = {
    error:null,
    insert : async (categoryName:any):Promise<any> => {
        return  axios.post("/categories/insert", {
            name: categoryName
        }).then(res => 
            {
                return res;
            }
            )
        .catch(err => {
            return err;
        })
    }
}

export default Categories