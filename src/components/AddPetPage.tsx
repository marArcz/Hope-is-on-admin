import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import BackendAPI from '../backendApi/BackendAPI';
import { BreedModel, CategoryModel, VaccineModel } from '../Models/TypeModels';
import AddBreedModal from './AddBreedModal';
import AddCategoryModal from './AddCategoryModal';
import Select from 'react-select'
import Creatable, { useCreatable } from 'react-select/creatable';
import { showErrorToast, showSuccessToast } from './ToastNotification';
import axios, { AxiosError, AxiosResponse, ResponseType } from "axios";


type Props = {}

const AddPetPage = (props: Props) => {
  type OptionModel = {
    value: any,
    label: string
  }

  const [categoryId, setCategoryId] = useState<any | number>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("Male")
  const [address, setAddress] = useState("")
  const [categories, setCategories] = useState<CategoryModel[] | []>([])
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddBreed, setShowAddBreed] = useState(false)
  const [breedIds, setBreedIds] = useState<[]>([]);
  const [images, setImages] = useState<any>([])
  const [breeds, setBreeds] = useState<BreedModel[] | []>([])
  const [vaccines, setVaccines] = useState<VaccineModel[]>([])
  const [vaccineOptionList, setVaccineOptionList] = useState<OptionModel[] | []>([])
  const [selectedVaccines, setSelectedVaccines] = useState<OptionModel[] | any>([])
  const [vaccineIds, setVaccineIds] = useState<number[]>([])
  const [isVaccinesLoading, setIsVaccinesLoading] = useState(false)
  const [breedOptionList, setBreedOptionList] = useState<any>([])
  const [categoryOptionList, setCategoryOptionList] = useState<any>([])
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null)
  const [isCategoryLoading, setIsCategoryLoading] = useState(true)
  const [selectedBreeds, setSelectedBreeds] = useState<any>([])
  const [isBreedsLoading, setIsBreedsLoading] = useState(false)


  const loadCategories = () => {
    axios.get<Array<CategoryModel>>("/categories")
      .then((res: any) => {
        let categories: CategoryModel[] = res.data;

        let list: any = categories.map((category, i) => {
          return {
            label: category.name,
            value: category.id
          }
        })

        setCategoryOptionList(list)
        setIsCategoryLoading(false)
      })
  }
  const loadBreeds = async (categoryId: number) => {
    setIsBreedsLoading(true);
    let breeds = await BackendAPI.breeds.getAll(categoryId);
    let list: any = breeds.map((breed, i) => {
      return {
        value: breed.id,
        label: breed.name
      }
    })

    setBreedOptionList(list)

    setIsBreedsLoading(false)
  }

  const loadVaccines = async (categoryId: number) => {
    setIsVaccinesLoading(true)
    let vaccines = await BackendAPI.vaccines.getAll(categoryId as number);
    let options: OptionModel[] = vaccines.map((vaccine, i) => {
      return {
        label: vaccine.name,
        value: vaccine.id
      }
    })

    setVaccineOptionList(options)
    setIsVaccinesLoading(false)
  }
useEffect(() => {
  let ids = selectedVaccines.map((vaccine:any,i:number)=>{
    return vaccine.value
  })

  setVaccineIds(ids);
}, [selectedVaccines]);

useEffect(() => {
  let ids = selectedBreeds.map((breed:any,i:number)=>{
    return breed.value
  })

  setBreedIds(ids);
}, [selectedBreeds]);



  useEffect(() => {
    setBreedOptionList([])
    setVaccineOptionList([])
    if (categoryId !== "" && categoryId !== undefined) {
      loadBreeds(categoryId as number)
      loadVaccines(categoryId as number)
    }
  }, [categoryId])

  useEffect(() => {
    if (selectedCategory) {
      setCategoryId(selectedCategory.value)
    }
  }, [selectedCategory])



  useEffect(() => {
    loadCategories();
  }, [])


  const CategoryOptions = () => {
    return (
      <>
        <option value="">Select One</option>
        <option value="add">Add new type...</option>

        {
          categories && categories.map((category, index) => (
            <option key={index} value={category.id}>{category.name}</option>
          ))
        }
      </>
    )
  }


  const onCategorySelect = (e: any) => {
    let val = e.target.value;
    if (val === "add") {
      setShowAddCategory(true)
    } else {
      setCategoryId(Number.parseInt(val));
    }
  }

  const onNewCategoryAdded = (categoryId: number | any) => {
    loadCategories();
    setCategoryId(categoryId)
    console.log("new added: ", categoryId)
  }

  const onCreateCategory = async (inputValue: string) => {
    setIsCategoryLoading(true)
    let res = await BackendAPI.categories.insert(inputValue);
    if (res.status === 200) {
      showSuccessToast("New category added!");
      let newOption = {
        label: res.data.category.name,
        value: res.data.category.id
      }
      let optionList = [...categoryOptionList, newOption];
      setCategoryOptionList(optionList);
      setSelectedCategory(newOption)
    } else {
      console.log(BackendAPI.categories.error)
      showErrorToast("Error cannot add category!")
    }
    setIsCategoryLoading(false)
  }

  const onCreateBreed = async (name: string) => {
    setIsBreedsLoading(true)
    let res = await BackendAPI.breeds.insert(name, categoryId);

    if (res.status === 200) {
      showSuccessToast("New Breed added!");
      res = res as AxiosResponse;
      let newBreed = { label: res.data.breed.name, value: res.data.breed.id };
      let selected = [...selectedBreeds, newBreed]
      let newList = [...breeds, newBreed]
      setBreedOptionList(newList)
      setSelectedBreeds(selected);
    } else {
      res = res as AxiosError
      showErrorToast("Error: " + res.message)
    }
    setIsBreedsLoading(false)
  }

  const onCreateVaccine = async (name: string) => {
    setIsVaccinesLoading(true)
    let res = await BackendAPI.vaccines.insert(name, categoryId);

    if (res.status === 200) {
      res = res as AxiosResponse;
      showSuccessToast("New vaccine added!");
      let newVaccine: OptionModel = {
        label: res.data.vaccine.name,
        value: res.data.vaccine.id
      }
      let newOptions = [...vaccineOptionList, newVaccine];
      let selected = [...selectedVaccines, newVaccine];
      setVaccineOptionList(newOptions);
      setSelectedVaccines(selected);
    }
  }

  const onNewBreedAdded = (breedId: any) => {
    loadBreeds(categoryId);
    setShowAddBreed(false)
    // setBreedId(breedId)

  }
  const onFileSelect = (e: any) => {
    let files = e.target.files
    let list = [...images]
    console.log("files: ", files)
    for (let file of files) {
      list.push(file)

    }

    setImages(list)
  }
  const removeImage = (index: number) => {
    let list = images.filter((img: any, i: number) => {
      return i !== index
    })

    setImages(list)
  }
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    BackendAPI.pets.insert({
      name,
      age,
      description,
      gender,
      address,
      categoryId,
      breedIds,
      vaccineIds,
      photos:images
    })
    .then(res =>{
      if(res.status === 200){
        showSuccessToast("New pet added!")
      }else{
        showErrorToast("Error: "+ (res as AxiosError).message)
        console.log("error: ", res)
      }
    })

  }


  return (
    <div className='pt-2 pb-4'>
      <h5 className="mb-3 text-success">
        Add New Pet
      </h5>
      <hr />
      <div className="">
        <p>Breeds:</p>
        {breedIds && breedIds.map((id: number, i: number) => (
          <p key={i}>{id}</p>
        ))}
      </div>
      <p className='fw-bold'>Pet Details</p>
      <h1>CatgoryId: {categoryId}</h1>
      <Row >
        <Col md={6}>
          <Form onSubmit={onFormSubmit}>
            <div className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control autoFocus value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Name of pet...' required />
            </div>
            <div className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as={"textarea"} value={description} onChange={(e) => setDescription(e.target.value)} rows={2} required placeholder='Pet description...' />
            </div>
            <div className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type='text' placeholder='eg. 2 months old' required value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select required value={gender} onChange={(e) => setGender(e.target.value)}>
                {/* <option className='text-black-50'>Select one</option> */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' required placeholder='Pet location...' value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="mb-3">
              <Form.Label>Type of animal:</Form.Label>
              <Creatable  placeholder="Select One..." value={selectedCategory} isLoading={isCategoryLoading} options={categoryOptionList} onCreateOption={onCreateCategory} onChange={setSelectedCategory} />
            </div>
            <div className="mb-3">
              <Form.Label>Breed:</Form.Label>
              <Creatable placeholder="You may select one or more..." isDisabled={selectedCategory === null} isLoading={isBreedsLoading} onCreateOption={onCreateBreed} options={breedOptionList} isMulti={true} value={selectedBreeds} onChange={setSelectedBreeds} />
            </div>
            <div className="mb-3">
              <Form.Label>Vaccines:</Form.Label>
              <Creatable placeholder="You may select one or more..." isDisabled={selectedCategory === null} isLoading={isVaccinesLoading} onCreateOption={onCreateVaccine} options={vaccineOptionList} isMulti={true} value={selectedVaccines} onChange={setSelectedVaccines} />
            </div>

          
            <div className="mb-3">
              <Form.Label>Pet Photos:</Form.Label>
              <Card className='shadow-sm'>
                <Card.Body>
                  <Form.Control type='file' className='d-none' accept='image/*' multiple onChange={onFileSelect} id='file-select' />
                  <Form.Label htmlFor='file-select' className='m-0 btn btn-secondary btn-sm'>Add Image</Form.Label>
                  <hr />
                  <Row>
                    {
                      images && images.map((img: any, index: number) => (
                        <Col md={3} key={index} draggable>
                          <Card className='position-relative'>
                            <div className="text-end mb-2">
                              <Button type="button" onClick={() => removeImage(index)} variant="secondary" className='p-1 py-0 rounded-0 position-absolute end-0 top-0 bg-opacity-25'><i className='m-0 bx bx-x'></i></Button>
                            </div>
                            <Card.Img variant="top" src={URL.createObjectURL(img)} />
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                </Card.Body>
              </Card>
            </div>

            <Button variant='warning' type='submit'>Submit</Button>
            <Button variant='secondary' className='ms-2' type='reset'>Reset</Button>
          </Form>
        </Col>
      </Row>
      <AddCategoryModal show={showAddCategory} handleClose={() => setShowAddCategory(false)} onSuccess={onNewCategoryAdded} />
      <AddBreedModal categoryId={categoryId} categories={categories} show={showAddBreed} handleClose={() => setShowAddBreed(false)} onSuccess={onNewBreedAdded} />
    </div>
  )
}

export default AddPetPage