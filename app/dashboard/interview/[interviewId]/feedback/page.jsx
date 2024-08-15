"use client"
import { db } from '@/utils/db'
import { userans } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
function Feedback({params}) {
    const [feedbacklist,setfeedbacklist]=useState([])
    const router=useRouter()
    let rating=0;
useEffect(()=>{
    getfeedback();
},[])
    const getfeedback=async ()=>{
const result=await db.select()
.from(userans)
.where(eq(userans.mockIdRef,params.interviewId))
.orderBy(userans.id)

        setfeedbacklist(result)
    }
  return (
    <div className='p-10'>
      {feedbacklist?.length==0 ? <h2 className='font-bold text-xl text-gray-500'>No interview feedback Found </h2>:
      <>
      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
   
<h2 className='text-sm text-gray-700'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
 {feedbacklist&&feedbacklist.map((item,index)=>(
    <Collapsible key={index} className='mt-7'>
  <CollapsibleTrigger className='w-full p-2 flex gap-7 bg-secondary rounded-lg my-2 text-left justify-between'>{item.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
  <CollapsibleContent>
  
  <div className='flex flex-col gap-2'>
    <h2 className={`p-2 border rounded-lg ${item.rating<3? "text-red-700":"text-green-700"}`}><strong>Rating:</strong>{item.rating}</h2>
    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.correctAns}</h2>
    <h2 className='p-2 border rounded-lg bg-orange-50 text-sm text-orange-900'><strong>Feedback:</strong>{item.feedback}</h2>

    </div>

  </CollapsibleContent>
</Collapsible>

 ))
 }
 </>
 }

 <Button onClick={()=>router.replace("/dashboard")}>Go Home</Button>
 </div>
  )
}

export default Feedback
