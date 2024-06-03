//rafce
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosinstance";
import Toast from '../../components/toastmessage/Toast'
import EmptyCard from '../../components/empty card/EmptyCard';
import AddNotesImg from "./Add notes-bro.svg"
import NoDataImg from "./9214777.svg";

const Home = () => {
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null
  });

  const [showToastMsg,setShowToastMsg]=useState({
    isShown:false,
    message:"",
    type:"add",
  })

  const [allNotes,setAllNotes]=useState([]);
  const [userInfo,setUserInfo] = useState(null);

  const[isSearch,setIsSearch]=useState(false);
 
  const navigate=useNavigate();

  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({isShown:true, data:noteDetails, type:"edit"});
  }

  const showToastMessage=(message,type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type,

    })
  }

  const handleCloseToast=()=>{
    setShowToastMsg({
      isShown:false,
      message:""
    })
  }

  //get user info
  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }
    catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/");
      }
    }
  }

  //get all notes
  const getAllNotes = async()=>{
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    }
    catch(error){
      console.log("An unexpected error occurred. Please try again");
    }
  }
  
  //delete note
  const deleteNote = async(data)=>{
    const noteId=data._id;

    if(window.confirm("Are you sure you want to delete?")){
      try{
        const response=await axiosInstance.delete("/delete-note/" +noteId );

        if(response.data && !response.data.error){
          showToastMessage("Deleted Note",'delete');
          getAllNotes();
        }
      }
      catch(error){
        if(error.response && error.response.data && error.response.data.message){
          console.log("An unexpected error occured. Please try again");
        }
      }
    }
  }

  //search-notes
  const onSearchNote = async(query)=>{
    try{
      const response=await axiosInstance.get("/search-notes", {
        params: {query},
      })

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  //update pin notes
  const updateIsPinned=async(noteData)=>{
    const noteId=noteData._id;
    try{
      const response=await axiosInstance.put("/update-note-pinned/" +noteId , {isPinned: !noteData.isPinned});

      if(response.data && response.data.note ){
        if(response.data.note.isPinned===true){
          showToastMessage("Pinned");
        }
        else{
          showToastMessage("UNpinned",'delete');
        }
        getAllNotes();
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleClearSearch=()=>{
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() =>{
    getAllNotes();
    getUserInfo();
    return ()=>{};
  },[]);

  return (
    <>
        <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} className="" /> 
      
        <div className='container mx-auto px-[15px]'>
          {allNotes.length>0 ? 
          (<div className='grid xl:grid-cols-3 max-sm:grid-cols-1 sm:grid-cols-2 gap-4 mt-8'>
            {allNotes.map((item,index) => (
              <NoteCard 
                key={item._id}
                title={item.title} 
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned} 
                onEdit={() => handleEdit(item)} 
                onDelete={()=> deleteNote(item)} 
                onPinNote={()=>updateIsPinned(item)} 
              />
            ))}
          </div>) : (
          <EmptyCard imgSrc={isSearch? NoDataImg : AddNotesImg} message={isSearch? `No notes found matching your search.` : `Ready to capture your ideas? Create your first note now!`} />
          )}
        </div>
        
        <button 
          className='sm:w-16 sm:h-16 max-sm:w-11 max-sm:h-11 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600  sm:right-14 sm:bottom-10 max-sm:bottom-10 max-sm:right-10 fixed'
          onClick={()=>{
            setOpenAddEditModal({isShown:true, type:"add", data:null});
          }}>
          <MdAdd className='text-[32px] text-white ' />
        </button>

        <Modal isOpen={openAddEditModal.isShown} onRequestClose={()=>{}} 
          style={{
            overlay:{
              backgroundColor:"rgba(0,0,0,0.2)",},
            }}
            constentLabel=""
            className="sm:w-[70%] max-sm:w-[85%]  sm:max-h-[95%] max-sm:max-h-[85%]  bg-white rounded-md mx-auto my-5 max-sm:mt-[45px]  p-5 max-sm:pt-[10px]  overflow-y-scroll  overflow-x-hidden outline-none  ">
          <AddEditNotes 
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={()=>{
              setOpenAddEditModal({isShown:false, type:"add", date:null});
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>

        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
        
    </>
  )
}

export default Home