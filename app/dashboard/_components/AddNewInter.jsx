'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/geminiAIModel'
import { setLazyProp } from 'next/dist/server/api-utils'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4} from 'uuid'
import MockInterview from '@/utils/schema'
import { db } from '@/utils/db'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
  
function AddNewInter() {
    const [openDialog, setOpendialog]=useState(false)
    const [jobPosition, setjobPosition]=useState()
    const [jobDesc, setjobDesc]=useState()
    const [jobExperiance, setjobExperiance]=useState()
    const [loading,setloading]=useState(false)
    const [jsonResponse,setJsonResponse]=useState([])
   const {user}=useUser()
   const [errors,seterror]=useState(false)
   const router=useRouter()
    const handleSubmit=async (e)=>{
        try{
        setloading(true)
     e.preventDefault()
     const inputPrompt="Job position"+jobPosition+",Job description:"+jobDesc+",Years of experiance:"+jobExperiance+"from the given information give me 10 interview question with answer in json format.give question and ansered as field in JSON  and if job description and job title doesnt matches return empty array and dont give any explatation when it doesnt match give only answer";
    const result=await chatSession.sendMessage(inputPrompt)
    const resultjson=(result.response.text()).replace("```json","").replace("```","") 
    console.log(JSON.parse(resultjson))
    if(JSON.parse(resultjson).length==0) throw new Error("Wrong details and given")

    setJsonResponse(result)
    if(resultjson){
        const resp = await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:resultjson,
            jobPosition,
            jobDesc,
            jobExperiance,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD-MM-yyyy")
        }).returning({mockId:MockInterview.mockId})


if(resp){
    setOpendialog(false)
    seterror(false)
    router.push('/dashboard/interview/'+resp[0]?.mockId)
}
    }else{
        console.log("error")
    }

        setloading(false)
}
catch(err){
    setloading(false)
    //setOpendialog(false)
    seterror(true)
    setOpendialog(false)
    
}
}
    const handleClick =()=>{
        setOpendialog(true)
    }
  return (
    <div>
        <div className='p-5 border rounded-lg bg-secondary hover:scale-100 hover:shadow-md cursor-pointer transition-all' onClick={handleClick} >
      <h2 className='font-bold text-lg'>+Add New</h2>
    </div>
   {errors &&  <Alert className="p-10 mt-10 bg-rose-700 text-slate-200">
    
      <AlertTitle>Something went Wrong </AlertTitle>
      <AlertDescription>
Something went Wrong Please try again later</AlertDescription>
    </Alert>}<Dialog open={openDialog} >
  <DialogTrigger></DialogTrigger>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell use more about your job interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={handleSubmit}>
        <div>
            
            <h2>Add details about your job and the position, job discription and the years of experiance</h2>
        <div className='mt-8 mb-4'>
            <label>Job Role/Job Position</label>
            <Input placeholder="Ex. Software Engineering" required
            onChange={(e)=> setjobPosition(e.target.value)}></Input>
        </div>
        <div className='my-3'>
            <label>Job Desicription/ Tech Stack </label>
            <Textarea placeholder="Ex. Angular, MySql" required
              onChange={(e)=> setjobDesc(e.target.value)}></Textarea>
        </div>
        <div className='my-3'>
            <label>Year of Experiance</label>
            <Input placeholder="Ex. 5" type="number" max="50" required
              onChange={(e)=> setjobExperiance(e.target.value)}></Input>
        </div>
        </div>
      <div className='flex gap-5 justify-end'>
        <Button onClick={()=> setOpendialog(false)} type="button">Cancel</Button>
        <Button type="submit" disabled={loading} >
            {loading ? <><LoaderCircle className='animate-spin'/> "Generating"</>: "Start Interview"}
            </Button>
      </div>
      </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInter
