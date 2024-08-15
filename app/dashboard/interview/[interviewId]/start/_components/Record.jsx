"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/geminiAIModel'
import { userans } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { Mic, WebcamIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

export default function Record({mockInterviewquestion,activequestionindex,interviewData}) {
    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
const [useranswer,setuseranswer]=useState("")
const {user}=useUser()
const [loading,setloading]=useState(false)

useEffect(()=>{
results.map((result)=>{
    setuseranswer(prevans=>prevans+result?.transcript)
  

})
},[results])
useEffect(()=>{
if(!isRecording&& useranswer.length>10)
{
  UpdateUserAnswer()
}

},[useranswer])
const Startstoprecording= async ()=>{
  if(isRecording){
   
    stopSpeechToText()
    }else{
    startSpeechToText()
  }
}


const UpdateUserAnswer= async()=>{
  setloading(true)
  const feedback="question:"+mockInterviewquestion[activequestionindex]?.question+
  ",User Answer:"+useranswer+",Depends on question and user answer for given interviw question please give us rating and feedback as area of improvement in just 3 to 5 lines to imporve it in json format with rating field and feedback field"

  const resultfeedback=await chatSession.sendMessage(feedback)
  const mockJsonresponse=(resultfeedback.response.text()).replace("```json","").replace("```","")
const jsonfeedback=JSON.parse(mockJsonresponse)
const resp=await db.insert(userans).values({
mockIdRef:interviewData?.mockId,
question:mockInterviewquestion[activequestionindex]?.question,
correctAns:mockInterviewquestion[activequestionindex]?.answer,
userAns:useranswer,
feedback:jsonfeedback?.feedback, 
rating:jsonfeedback?.rating,
userEmail:user?.primaryEmailAddress?.emailAddress,
createdAt:moment().format("DD-MM-YYYY")

})
if(resp){
toast("user answer recorded successfully")
setuseranswer("")
setResults([])
}

setloading(false)
}

  return (
   <div >
   <div className='flex flex-col justify-center items-center mt-20 mb-5 rounded-lg p-5 bg-black'>
      
      <WebcamIcon className='h-60 my-7 w-96 p-10 bg-secondary rounded-lg border '/>
      <Webcam style={{height:300,width:"55%",zIndex:10, position: 'absolute'}} mirrored={true}/>
    </div>
<div className='flex items-center justify-center flex-col'>
  <Button className="mb-20" disabled={loading} onClick={Startstoprecording}>
    
    {isRecording?<h2 className='text-red-600 flex gap-2'><Mic/>Stop Recording</h2>:<h2 className='flex gap-2'><Mic/>Start Recording</h2>}</Button>



</div>
    </div>
  )
}
