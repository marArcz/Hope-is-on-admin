import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { CategoryModel } from '../Models/TypeModels'
import AddCategoryModal from './AddCategoryModal'

type Props = {
    handleClose: () => void,
    show: boolean,
    categories: CategoryModel[] | [],
    onAddCategory: () => void
    onCategoryChange: (x: number) => void
    selectedCategory: any | number

}

const AddPetModal = ({ handleClose, show, categories, onAddCategory, selectedCategory, onCategoryChange }: Props) => {
    const [categoryId, setCategoryId] = useState<any | number>("");
    const [name, setName] = useState("");

    const CategoryOptions = () => {
        return (
            <>
                <option value="">Select One</option>
                {
                    categories && categories.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
                    ))
                }
                <option value="add">New Category...</option>
            </>
        )
    }
    const onCategorySelect = (e: any) => {
        let val = e.target.value;
        if (val === "add") {
            onAddCategory()
        } else {
            setCategoryId(Number.parseInt(val));
            onCategoryChange(Number.parseInt(val))
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className=''>
                    <Modal.Title as={"h5"} className="text-dark">Add New Pet</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <div className="mb-3">
                            <Form.Label>Type of animal</Form.Label>
                            <Form.Select required onChange={onCategorySelect} value={selectedCategory}>
                                <CategoryOptions />
                            </Form.Select>
                        </div>

                        <div className="mb-3">

                            <Form.Label>Pet Name</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} type='text' placeholder='Name of pet...' required />
                        </div>
                        <div className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} rows={2} required placeholder='Pet description...' />
                        </div>
                        <div className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type='text' placeholder='eg. 2 months old' required />
                        </div>
                        <div className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select required>
                                {/* <option className='text-black-50'>Select one</option> */}
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' required placeholder='Pet location...' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>

        </>
    )
}

export default AddPetModal