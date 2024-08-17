
'use client'
import React from 'react'

import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { set } from "mongoose";
import Link from "next/link"
import { useEffect, useState } from "react"

             
            function Home() {
              let [data,setData]=useState([]);
              let handelDatafatch=async()=>{
                try{
                  let res=await fetch('/api/add-topic',{
                    method:'GET'

                  })
                  let result=await res.json();
                  if(result.success){
                    setData(result.data);
                  }
                }
                catch(e){
                  setData([]);
                  console.log('data no gat')
                }
              }

useEffect(()=>{
  handelDatafatch();
},[])

// delte field
let handelDelete=async(id)=>{
    try{
        let res=await fetch('api/add-topic'+'/'+`${id}`,{
            method:'DELETE',
            credentials:'include'
        });
        let result=await res.json();
        if(result.success){
            window.alert('delete succes');
            handelDatafatch();
        }

    }
    catch(e){
        console.log('not deiete')
    }
}

 

              return (
                <center className="flex items-center justify-center flex-col">
                  <div className="mt-10 flex items-center justify-between min-w-[70vw] rounded-lg bg-slate-800 py-[1.75rem] px-[2rem]">
                    <a className="text-gray-300 font-bold text-[2rem]">Tournamax Assignment</a>
                   <Link href='/addPage' > <button className="py-[.8rem] px-[1.2rem] bg-gray-200 text-black font-semibold rounded-lg ml-2">Add Topic</button></Link>
                  </div>
<div className='flex items-center justify-center flex-col min-w-[70vw] '>
    {data?.map((val,i)=>{
        return(
            <div   className='flex w-[100%] justify-between py-[1.7rem] px-[1.2rem] items-start border-[2px] border-gray-600 mt-[2.44rem]'  >

<div className='flex items-start flex-col'>
<a className='text-[1.6rem] font-semibold'>{val.topic}</a>
<a className='text-[1.2rem] font-semibold mt-[.6rem]'>{val.description}</a>
    
              </div>  
              <div className='flex items-center gap-2 '>
<MdOutlineDelete className="text-red-500 text-[2rem]"  onClick={()=>handelDelete(val._id)}/>

<Link href={`/${val._id}`}> <FaRegEdit className=" text-[1.5rem]"/></Link>

              </div>
              </div>
        )
    })}

</div>

                 </center>
              )
            }
            
  
export default Home
