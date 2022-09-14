import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { CategoryModel } from '../Models/TypeModels'
import { showErrorToast, showSuccessToast } from './ToastNotification'

type Props = {
  show: boolean,
  handleClose: () => void,
  onSuccess: (x: any) => void,
  categories: CategoryModel[],
  categoryId: any
}

const AddBreedModal = (props: Props) => {
  const [backdrop, setBackdrop] = useState(false);
  const [breed, setBreed] = useState("")
  const [categoryId, setCategoryId] = useState<any | number>(props.categoryId)

  const onFormSubmit = (e: any) => {
    setBackdrop(true)
    e.preventDefault()
    axios.post("/breeds/insert", {
      categoryId,
      name: breed
    })
      .then((res) => {
        setBackdrop(false)
        showSuccessToast("New breed is added!")
        props.onSuccess(res.data.id)
        setBreed("")
        setCategoryId("")
      })
      .catch(res => {
        setBackdrop(false)
        showErrorToast(res.message)

      })
  }

  const onSelect = (e: any) => {
    setCategoryId(Number(e.target.value))
  }

  const BreedOptions = () => {
    return (
      <>
        <option value="">Select One</option>
        {props.categories && props.categories.map((category: CategoryModel, index: number) => (
          <option key={index} value={category.id}>{category.name}</option>
        ))}
      </>
    )
  }

 

  const setDefaultType = () => {

  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} keyboard={backdrop} backdrop={backdrop ? "static" : undefined}>
        <Modal.Header closeButton>
          <Modal.Title as={"h5"}>Add New Type</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onFormSubmit}>
          <Modal.Body>
            <p>CategoryId: {props.categoryId}</p>
            <div className="mb-3">
              <Form.Label>Type:</Form.Label>
              <Form.Select required onChange={onSelect} defaultValue={categoryId}>
                <BreedOptions />
              </Form.Select>
            </div>
            <div className="mb-3">
              <Form.Label>Breed:</Form.Label>
              <Form.Control value={breed} onChange={(e) => setBreed(e.target.value)} type="text" required />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button type='submit' variant="success" className={`${backdrop ? "disabled" : ""}`} onClick={props.handleClose}>
              {backdrop ? "Please wait..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}

export default AddBreedModal