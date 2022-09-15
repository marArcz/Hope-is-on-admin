import Categories from "./CategoriesApi/Categories"
import Pets from "./PetsApi/Pets"
import vaccines from "./VaccinesApi/Vaccines"
import breeds from "./BreedsApi/Breeds"
import admin from "./AdminApi/Admin"
const BackendAPI = {
    pets:Pets,
    vaccines,
    categories:Categories,
    breeds,
    admin
}

export default BackendAPI