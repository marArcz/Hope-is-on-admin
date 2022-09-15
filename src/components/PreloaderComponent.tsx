import React from 'react'

type Props = {
    message?:string,
    show:boolean,

}

const PreloaderComponent = ({message = "Please wait...", show}: Props) => {
    return (
        <div className={`preloader-wrapper ${show? "show":""}`} >
            <div className="content">
                <div className="preloader">
                    <span></span>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default PreloaderComponent