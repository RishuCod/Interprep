import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function Questionsection({mockInterviewquestion,activequestionindex}) {


const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(speech)

    }else{
        alert("Something went wrong")
    }
}

  return mockInterviewquestion&& (
    
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {mockInterviewquestion && mockInterviewquestion.map((question,index)=>(
          

<h2 className={`p-2 rounded-full text-xs md:text-sm text-center 
cursor-pointer ${activequestionindex==index && 'bg-black text-white'}`}>
    Question{index+1}
    </h2>

                ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewquestion[activequestionindex]?.question}</h2>

<Volume2 onClick={()=>textToSpeech(mockInterviewquestion[activequestionindex]?.question)} className='cursor-pointer'/>

<div className='border rounded-lg p-5 bg-yellow-300 mt-16'>
    <h2 className='flex gap-2 items-center text-black'>
        <Lightbulb/>
        <strong>Note:</strong>
    </h2>
    <h2 className='text-sm text-black my-2'>Click on record answer when you want to answer the question. At the end of the interview we will give you the feedback along with correct answer for each of the question.</h2>
</div>
    </div>
            
)
}

export default Questionsection
