export type MenuItem = {
  to: string;
  icon: string;
  label: string;
};
export type PetPhotoModel = {
  id:number,
  src:string,
  petId:number
}
export type CategoryModel = {
  id:number,
  name:string
}
export type BreedModel = {
  id:number,
  name:string,
  categoryId:number
}

export type PetModel = {
  photos: PetPhotoModel[];
  name: string;
  description: string;
  age: string;
  address: string;
  gender: string;
  category:CategoryModel
}

export type VaccineModel = {
  id:number,
  name:string,
  category:CategoryModel,
}
