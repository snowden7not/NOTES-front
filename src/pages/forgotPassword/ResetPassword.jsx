import React from 'react'
import { useState } from "react";
import {  useNavigate, useParams  } from "react-router-dom";
import axiosInstance from '../../utils/axiosinstance';
import PasswordInput from '../../components/input/PasswordInput'

const ResetPassword=()=> {
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const {id, token} = useParams()

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(!password){
        setError("Please enter password.");
        return;
      }
      setError("");

      try{
        const response= await axiosInstance.post(
          `/reset-password/${id}/${token}`, 
          {password: password},
        )
        console.log(response);

        if(response.data && response.data.error){
            setError(response.data.message);
            return;
        }
        if(response.data && response.data.success){
          alert("Password Updated");
          navigate("/");
          return;
        }
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
      <div className="flex  justify-center items-center mt-20">
        <div className="w-96 border-[2px] rounded bg-white px-7 py-10 ">
          <form onSubmit={handleSubmit}>
            <h4 className='text-2xl mb-7 ' >
              Enter new Password
            </h4>
                       
            <PasswordInput value={password} onChange={(e)=>setPassword (e.target.value)} />

            {error && <p className='text-red-500   text-xs pb-1'>
              {error} 
            </p>}

            <button type="submit" className="btn-primary">
              Set
            </button>
          </form>
        </div>
      </div>
    )
}

export default ResetPassword;
