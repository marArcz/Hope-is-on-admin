import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
    icon: string,
    label: string,
    to:string,
    expanded:boolean,
    onClick:() => void
}

const DropdownMenuBtn = ({ icon, label,to,onClick,expanded }: Props) => {
    return (

        <Nav.Link as={Link} to={to} onClick={onClick} className={`w-100 d-flex align-items-center ${expanded?"active-dropdown":""}`}>
            <i className='material-icons me-3'>{icon.toLowerCase()}</i>
            <span>{label}</span>
            <i className='material-icons ms-auto'>{`${expanded? "expand_less":"expand_more"}`}</i>
        </Nav.Link>
    )
}

export default DropdownMenuBtn