"use client"
import { db } from '@/utils/db'
import MockInterview from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Questionsection from './_components/Questionsection'
import Record from './_components/Record'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {
    const [interviewData,setInterviewData]=useState()
    const [mockInterviewquestion,setMockinterviewquestion]=useState()
    const [activequestionindex,setactiveindexquestion]=useState(0)
    useEffect(()=>{
        getinterdetails();
    },[])
    const getinterdetails=async ()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        try{
       const jsonmockresponse=JSON.parse(result[0].jsonMockResp)
       setMockinterviewquestion(jsonmockresponse)
       setInterviewData(result[0])

        }catch(err){
            console.log(err)
        }
       
    }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">

        <Questionsection mockInterviewquestion={mockInterviewquestion} activequestionindex={activequestionindex}/>
        <Record interviewData={interviewData} mockInterviewquestion={mockInterviewquestion} activequestionindex={activequestionindex}/>
      </div>
      <div className='flex justify-center gap-5'>
{activequestionindex>0 &&<Button  onClick={()=>setactiveindexquestion(activequestionindex-1)}> Previous Question</Button>}
{activequestionindex!=mockInterviewquestion?.length-1&&
<Button onClick={()=>setactiveindexquestion(activequestionindex+1)}>Next Question</Button>}
{activequestionindex===mockInterviewquestion?.length-1&&

<Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
<Button>End Interview</Button></Link>}

      </div>
    </div>
  )
}

export default StartInterview
