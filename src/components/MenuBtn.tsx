import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
    to:string,
    icon:string,
    label:string
}

const MenuBtn = (props: Props) => {
    return (
            <Nav.Link as={Link} href={props.to} to={props.to} className="fs-5">
                <div className="d-flex align-items-center">
                    <i className="material-icons me-3">{props.icon}</i>
                    <span className="fs-6 text-capitalize">{props.label}</span>
                </div>
            </Nav.Link>
    )
}

export default MenuBtn