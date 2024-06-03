import React from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import {MdCreate,MdDelete} from "react-icons/md"
import moment from "moment";

const NoteCard = ({title,date,content,tags,isPinned,onEdit,onDelete,onPinNote}) => {

    //const truncatedContent = note.content.substring(0, 5); // Truncate content to 20 characters

  return (
    <div className='border rounded p-4 bg-white hover:shadow-2xl transition-all ease-in-out shadow-black   ' >
        <div className='flex items-center justify-between  ' >
            <div>
                <h6>
                    {title?.slice(0,30)}
                    {content?.length > 30 && '....'}
                </h6>
                <span className='text-sm text-slate-400 '>
                    {moment(date).format('Do MMM YYYY')}
                </span>
            </div>
            <MdOutlinePushPin  className={` w-[25px]  icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}` } onClick={onPinNote} />
        </div>
        <p className='text-[14px] text-slate-600 mt-2' > 
            {content ?.slice(0,70)}
            {content?.length > 70 && '....'}
        </p>
        <div className="flex items-center justify-between mt-2" >
            <div className="text-sm  text-[#96261e] " >
                {tags.map((item)=>`#${item}  `)}
            </div>
            <div className='flex items-center gap-2' >
                <MdCreate className='icon-btn hover:text-green-600 ' onClick={onEdit} />
                <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete} />
            </div>
        </div>
    </div>
  )
}

export default NoteCard