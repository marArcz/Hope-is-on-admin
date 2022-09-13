import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { showErrorToast, showSuccessToast } from './ToastNotification'

type Props = {
    show: boolean,
    handleClose: () => void
    onSuccess: (x:any) => void
}

const AddCategoryModal = ({ show, handleClose, onSuccess }: Props) => {

    const [categoryName, setCategoryName] = useState("");
    const [backdrop, setBackdrop] = useState(false);

    const onFormSubmit = (e:any) => {
        e.preventDefault()
        setBackdrop(true);
        axios.post("/categories/insert", {
            name: categoryName
        })
            .then((res) => {
                showSuccessToast("New category has been added!");
                console.log("categoryInsert: ", res)
                setBackdrop(false)
                onSuccess(res.data.category.id);
                setCategoryName("")
            })
            .catch(res => {
                setBackdrop(false)
                showErrorToast("Error: " + res.message)
            })

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} keyboard={backdrop} backdrop={backdrop ? "static" : undefined}>
                <Modal.Header closeButton>
                    <Modal.Title as={"h5"}>Add New Type</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onFormSubmit}>

                    <Modal.Body>
                        <div className="mb-3">
                            <Form.Label>Type of pet:</Form.Label>
                            <Form.Control autoFocus type='text' required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="success" className={`${backdrop ? "disabled" : ""}`} onClick={handleClose}>
                            {backdrop ? "Please wait..." : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    )
}

export default AddCategoryModal