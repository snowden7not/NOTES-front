import React from 'react'
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosinstance';

const ForgotPassword= ()=> {
    const [email, setEmail] = useState()
    const [error,setError]=useState(null);

    const navigate = useNavigate()
  
    const handleSubmit = async(e) => { 
      e.preventDefault();

      if(!email){
        setError("Please enter a valid email address.");
        return;
      }
      //console.log(email);

      setError("");

      //forgot-password api call
      try{
        const response= axiosInstance.post("/forgot-password",{
          email: email,
        })
        //console.log(response);
        
        response
        .then(response => {
          if (response.data.error) {
            //console.log(response.data.message);
            setError(response.data.message)
          }
          else{
            alert(response.data.message)
            navigate('/');
          }
        })
        .catch(error => {
          console.error("Error:", error); 
          
        })
      }                                         
      catch(error){
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        }
        else{
          setError("An unexpected error occurred. Please try again");
        }
      }
    }

    return(
      <div className="flex  justify-center items-center mt-20 ">
        <div className="w-96 border-[2px] rounded bg-white px-7 py-10 ">
          <form onSubmit={handleSubmit}>
            <h4 className='text-[24px]  mb-7' >
              Get password reset link
            </h4>
          
            <input
              type="email"
              placeholder="Enter registered Email"
              autoComplete="off"
              name="email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {error && <p className='text-red-500  text-xs pb-1'>
              {error} 
            </p>}

            <button type="submit" className="btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    )
}

export default ForgotPassword;
