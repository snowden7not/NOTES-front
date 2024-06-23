import React, { useEffect,useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance';
import imgSrc from "./blogging-animate-min.svg"

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);

  const navigate=useNavigate();

  // Separate function to make the backend ping
  const pingBackend = async () => {
    try {
      const response = await axiosInstance.get('/');
      console.log('Backend ping successful:', response.data); // Log the response for debugging purposes (optional)
    } catch (error) {
      console.error('Backend ping failed:', error); // Log the error for debugging purposes
    }
  };

  // Call the pingBackend function on component mount
  useEffect(() => {
    pingBackend();
  }, []);
  
  const handleLogin= async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
        setError("Please enter a valid email address.");
        return;
    }

    if(!password){
        setError("Please enter password.");
        return;
    }

    setError("");

    //login api call
    try{
        const response=await axiosInstance.post("/",{
            email:email,
            password:password,
        });

        if(response.data && response.data.accessToken){
            localStorage.setItem("token",response.data.accessToken);
            navigate('/dashboard');
        }
    }
    //handle login
    catch(error){
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
        }
        else{
            setError("An unexpected error occurred. Please try again");
        }
    }
  };
//<div className='sm:flex flex-col'> </div>
//Not Registered yet? {" "}
  return (
    <>
        <Navbar/>

        <div className='sm:flex items-center justify-center mt-4 pb-[70px] max-sm:px-[20px]' >
            <img src={imgSrc} alt='' className=' sm:w-2/5 w-[95%] mx-auto pb-[20px]'/>

            <div className='sm:w-[30%] w-[95%] border-[2px] rounded bg-white px-7 py-10 mx-auto' >
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7 ' >
                        Login
                    </h4>

                    <input type="text" placeholder='Email' className="input-box" value={email} onChange={(e)=> setEmail(e.target.value)}/>

                    <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)} />

                    {error && <p className='text-red-500 text-xs pb-1'>
                        {error}
                    </p>}

                    <button type='submit' className='btn-primary' >
                        Login
                    </button>
                    
                    <p className='text-sm text-center mt-4 flex flex-col' >
                        <Link to="/forgot-password" className='font-medium text-red-500  underline' >
                            Forgot Password?
                        </Link>
                    </p>

                    <p className='text-sm text-center mt-4 flex flex-col' >
                        <Link to="/signup" className='font-medium text-primary underline' >
                            Create an Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login;
