import React from 'react';
import loader from "./infinite-spinner.svg";

const Spinner=()=>{
    return (
        <div className='flex justify-center items-center h-screen'> 
            <img src={loader} width="200" height="200" alt=""/>
        </div>
    )
}

export default Spinner