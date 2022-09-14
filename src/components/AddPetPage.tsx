import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import BackendAPI from '../backendApi/BackendAPI';
import { BreedModel, CategoryModel, VaccineModel } from '../Models/TypeModels';
import AddBreedModal from './AddBreedModal';
import AddCategoryModal from './AddCategoryModal';
import Select from 'react-select'
type Props = {}

const AddPetPage = (props: Props) => {
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
  const [breedOptionList, setBreedOptionList] = useState([])

  const loadCategories = () => {
    axios.get<Array<CategoryModel>>("/categories")
      .then((res: any) => {
        setCategories(res.data)
      })
  }
  const loadBreeds = () => {
    if (categoryId !== "") {
      axios.get<Array<BreedModel>>(`/breeds/${categoryId}/getAll`)
        .then((res: any) => {
          setBreeds(res.data)
        })
    }
  }

  const loadVaccines = async () => {
    if (categoryId !== "") {
      let vaccines = await BackendAPI.vaccines.getAll(categoryId);
      setVaccines(vaccines)
    }

  }

  useEffect(() => {
    let list:any= breeds.map((breed, i) => {
      return {
        value: breed.id,
        label: breed.name
      }
    })

    setBreedOptionList(list)
  }, [breeds])



  useEffect(() => {
    loadBreeds()
  }, [categoryId])

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
  const BreedOptions = () => {
    return (
      <>
        <option value="">Select One</option>
        {
          breeds && breeds.map((breed, index) => (
            <option key={index} value={breed.id}>{breed.name}</option>
          ))
        }
        <option value="add">New Breed...</option>
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
  const onBreedSelect = (e: any) => {
    let val = e.target.value;
    if (val === "add") {
      setShowAddBreed(true)
    } else {
      // setBreedId(Number.parseInt(val));
    }
  }
  const onNewCategoryAdded = (categoryId: number | any) => {
    loadCategories();
    setCategoryId(categoryId)
    console.log("new added: ", categoryId)
  }

  const onNewBreedAdded = (breedId: any) => {
    loadBreeds();
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
    axios.post("/pets/insert", {
      name,
      description,
      age,
      gender
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
        {breedIds && breedIds.map((id:number,i:number)=>(
          <p key={i}>{id}</p>
        ))}
      </div>
      <p className='fw-bold'>Pet Details</p>
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
              <Form.Select required onChange={onCategorySelect} value={categoryId}>
                <CategoryOptions />
              </Form.Select>
            </div>
            <div className="mb-3">
              <Form.Label>Breed:</Form.Label>
              {/* <Form.Select disabled={categoryId === ""} required onChange={onBreedSelect} value={breedId}>
                <BreedOptions />
              </Form.Select> */}

              <Select options={breedOptionList} isMulti={true} value={breedIds} onChange={(items) => console.log(items)}/>

            </div>
            <div className="mb-3">
              <Form.Label>Vaccines</Form.Label>
              <Card className='shadow-sm'>
                <Card.Body>
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
                  <hr />

                  <Form.Control type='file' className='d-none' accept='image/*' multiple onChange={onFileSelect} id='file-select' />
                  <Form.Label htmlFor='file-select' className='m-0 btn btn-secondary btn-sm'>Add Image</Form.Label>

                </Card.Body>
              </Card>
            </div>
            <div className="mb-3">
              <Form.Label>Pet Photos</Form.Label>
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
            <div className="mb-3">
              <Form.Label>Pet Photos</Form.Label>
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