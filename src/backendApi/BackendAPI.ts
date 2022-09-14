import Categories from "./CategoriesApi/Categories"
import Pets from "./PetsApi/Pets"
import vaccines from "./VaccinesApi/Vaccines"
import breeds from "./BreedsApi/Breeds"

const BackendAPI = {
    pets:Pets,
    vaccines,
    categories:Categories,
    breeds
}

export default BackendAPI