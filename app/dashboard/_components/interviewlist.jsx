"use client"
import { db } from '@/utils/db'
import MockInterview from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Interviewcard from './interviewcard'

function Interviewlist() {
    const {user}=useUser()
    const [interviewList,setinterviewlist]=useState([])
    useEffect(()=>{

        user&&getinterviewlist();

    },[user])
    const getinterviewlist=async ()=>{
        const result =await db.select().from(MockInterview).
        where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))
       
        setinterviewlist(result)
    }
  return (
    <div>
      {interviewList!=0&&<h2 className='font-medium text-xl'>Previous Mock Interview</h2>}
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
{interviewList&&interviewList.map((interview,index)=>(
    <Interviewcard key={index} interview={interview}/>
))}

   </div>
    </div>
  )
}

export default Interviewlist
