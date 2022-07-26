import { useCallback, useEffect, useState } from "react";
import Timer from "./Timer";
import "./app.css";

function App() {
   // "char" state is used to store the random alphabet. 
   const [char,setChar] = useState("");

   // "keyChar" state is used to store the alphabet entered by user.
   const[keyChar,setKeyChar] = useState("");
  
   // "count" state is used to store the number of alphabets shown to user(its value go from 0 to 20).
   const [count,setCount] = useState(1);
  
   // "start" this state variable is used to control the timer.
   const [start,setStart] = useState(false);
  
   // "penalty" this state variable is used to set penalty if user enter wrong alphabet.(There is penalty of 0.5s).
   const[penalty,setPenalty] = useState(false);
  
   // "score" this state variable is used to update the user best time.
   const[score,setScore] = useState(null);
  
   //"result" it is used to render final result message on UI.
   const [result,setResult] = useState("");
  

  // getRandomChar() function generate random alphabets and update the states accordingly.
  const  getRandomChar = useCallback((init)=>{
   
    var n = Math.floor(Math.random() * (112-97) + 97);    
    var ch = String.fromCharCode(n);
    setKeyChar("");
    setChar(ch);
    if(init === false){
      setCount(c => c+1);
    }
  },[]);
    
  
  function keyEvent (e){
    setStart(true);
    setKeyChar(e.key);    
   }

   // effect for setting up event listener and generating initial random alphabet.
  useEffect(()=>{
    getRandomChar(true);
    window.addEventListener('keypress',keyEvent)
    return () => {
      window.removeEventListener("keypress", keyEvent);
  };    
  },[getRandomChar]);
  
  //this effect check no of alphabets,penalty and also generate new alphabet.
  useEffect(()=>{
  function checkChar(){
      
    if(count===21) {
       // stop timmer if no. of alphabets exceed 20. 
      setStart(false);
        return;
     }

    if(count<=20){
      if(char.length!==0 && keyChar.length!==0){
        
        if(char===keyChar){
          setPenalty(false);
          getRandomChar(false);
        }else{
          setPenalty(true);
        }
          
       }
    }

  }
checkChar();        
  },[char,keyChar,count,getRandomChar]);

// this is effect is used to set best time, if timer is stoped then  it set  the recent best time. 
useEffect(()=>{
if(!start){
  setScore(JSON.parse(localStorage.getItem('time')));
}
},[start]);
  

  return (
    <div className="main">
      <h2>Type The Alphabet</h2>
      <p>Typing game to see how fast you type. Timer starts when you do :)</p>

       <p>Number of alphabet left : {21-count}</p> 
      <h3>{penalty ? "Wrong key pressed ! (+0.5sec) " : null}</h3>
      <div className="alpha">
      <h2>{result.length!==0 ? result : char}</h2>

      </div>
      <Timer start={start} penalty={penalty} setResult={setResult}/>
      <h3>My best time : {score === null ? "Play game to set your best time." : score.toFixed(3)+"s!"}</h3>
    </div>
  );
}

export default App;
