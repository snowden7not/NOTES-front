import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({userInfo, value, onChange, handleSearch, onClearSearch}) => {

  return (
    userInfo && (<div className='xl:w-80 max-xl:w-60 flex items-center sm:px-4 max-sm:px-[3px]  bg-slate-100 rounded-md '>
        <input type='text'  placeholder='Search Note'  className='w-full text-xs bg-transparent py-[11px] outline-none' value={value} onChange={onChange} />
        {   value && 
            <IoMdClose className='text-xl text-slate-500  cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />
        }
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
    </div>)
  )
}

export default SearchBar