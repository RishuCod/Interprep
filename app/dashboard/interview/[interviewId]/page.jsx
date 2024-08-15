"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import MockInterview from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const [interviewdata,setinterviewdata]=useState();
    const[webenabled,setwebenabled]=useState(false)
    useEffect(()=>{
        getinterdetails();
    },[])
    const getinterdetails=async ()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        setinterviewdata(result[0])
    }
  return (
    
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {interviewdata&& <div className='flex flex-col my-7 gap-5 pt-5'>
    <h2 className='text-md '><strong>Job Role/Job position:</strong>{interviewdata.jobPosition}</h2>
    <h2 className='text-md'><strong>Job Description/Tech Stack:</strong>{interviewdata.jobDesc}</h2>

    <h2 className='text-md'><strong>Years of Experiance:</strong>{interviewdata.jobExperiance}</h2>
<div className='p-4  bg-yellow-400 rounded-lg'>

           <h2 className='flex gap-2 items-center'> <Lightbulb/><strong>Information</strong></h2>
<h2 className='mt-3 text-black'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
</div>
    </div>
}
  {webenabled?   <div><Webcam mirrored={true} onUserMedia={()=>setwebenabled(true)} onUserMediaError={()=>setwebenabled(false)}style={{height:325,width:550}}/>

  <Link href={`/dashboard/interview/${params.interviewId}/start`} ><Button className="flex justify-end mt-6">Start Interview</Button>
 </Link>
  </div>: 
<div><WebcamIcon className='h-60 my-7 w-96 p-10 bg-secondary rounded-lg border'/>
   <Button onClick={()=>setwebenabled(true)}  className=' w-96'>Enable Web Cam and Microphone</Button>
   <Link href={`/dashboard/interview/${params.interviewId}/start`} ><Button className="flex justify-end mt-6">Start Interview</Button>
  </Link>
   </div>} 
    </div>
   
    </div>
  )
}

export default Interview
