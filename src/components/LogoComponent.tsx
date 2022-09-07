import React from 'react'
import { Image } from 'react-bootstrap'
import Logo from '../images/Frame 1Logo.png';

type Props = {}

const LogoComponent = (props: Props) => {
    return (
        <div className="text-center ">
            <div className="text-start">
                <h2 className='text-start text-success'>Hope Is On</h2>
                <h6 className="my-2 text-secondary">Animal Pet Adoption</h6>
            </div>
            <Image src={Logo} fluid />
            <div className="text-end">
                <h6 className="my-2 text-secondary">Building a friendly world for all.</h6>
            </div>
        </div>
    )
}

export default LogoComponent