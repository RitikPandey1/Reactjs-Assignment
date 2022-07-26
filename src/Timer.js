import { useEffect, useState } from "react";

function Timer({start,penalty,setResult}){
      const [seconds,setSeconds] = useState(0);
       
      // this effect start and stop the timer
      useEffect(()=>{
        var id;
        // start timer
        if(start){
            id = setInterval(()=>{
                setSeconds(seconds + 0.001);
            },1);
         }else{
           // stop timer
            setSeconds(s => s);
         }
         
         // cleanup to avoid memory leak
        return ()=>{
            clearInterval(id);
        }

      },[seconds,start]);

    // this take care of penalty
      useEffect(()=>{
        if(penalty){
            setSeconds(s => s + 0.5);
        }
      },[penalty]);

      // this effect check the best time store locally with recent time and update accordingly.
      useEffect(()=>{
      if(!start && seconds>0){
        var bestTime = JSON.parse(localStorage.getItem('time'));
        
        if(bestTime==null || bestTime > seconds){
            localStorage.setItem('time',JSON.stringify(seconds));
            setResult("Success!");
        }else{
           setResult("Fail!");
        }
      }
      },[start,setResult]);

      return <h2> Time: {seconds.toFixed(3)}s</h2>
}

export default Timer;