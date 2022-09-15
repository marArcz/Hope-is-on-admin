import axios, { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { AdminModel } from './../../Models/TypeModels';
const admin = {
    login: async ({ email, password }: AdminModel): Promise<AxiosResponse | AxiosError> => {
        return await axios.post("/admin/login", {
            email, password
        })
            .then(res => res)
            .catch(err => err)
    },
    signup: async ({ email, password,name }: AdminModel): Promise<AxiosResponse | AxiosError> => {
        return await axios.post("/admin/register", {
            name,email, password
        })
            .then(res => res)
            .catch(err => err)
    },
}

export default admin;