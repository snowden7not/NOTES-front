import React, { useState } from 'react'
import ProfileInfo from '../../components/cards/ProfileInfo'
import {useNavigate} from "react-router-dom"
import SearchBar from '../searchbar/SearchBar';

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const [searchQuery,setSearchQuery]=useState("");
  const navigate = useNavigate();

  const onLogout=() => {
    localStorage.clear();
    navigate("/");
  }

  const handleSearch=() => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch=()=>{
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className='bg-white flex items-center justify-between sm:px-6  max-sm:px-3 py-2 drop-shadow gap-3 '>
        <h2 className='text-xl max-sm:text-[17px] font-medium text-black py-2' >
            Notes
        </h2>
        <SearchBar value={searchQuery} onChange={({target})=>{setSearchQuery(target.value)}} handleSearch={handleSearch} onClearSearch={onClearSearch} userInfo={userInfo}/>
        
        <ProfileInfo userInfo={userInfo}   onLogout={onLogout} />
    </div>
  )
}

export default Navbar;