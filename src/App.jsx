import { useState, useEffect } from "react";
import Home from "./components/Home";
import Intro from "./components/Intro";
import { mainContext } from "./context/mainContext";



function App() {
  const timeVariable1 = + new Date("01/31/2024 09:00:00");
  const timeVariable2 = new Date;
  const timeTodayCounted = timeVariable2.valueOf();
  const futureCounted = timeVariable1.valueOf();
  const timeRemaining = (futureCounted - timeTodayCounted)/1000;
  // const [examTimeLimit, setExamTimeLimit] = useState(timeRemaining);
  
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  useEffect(() => {
    const setExamTimerInterval = setInterval(() => {
        // setExamTimeLimit(() => examTimeLimit - 1);
        setSeconds(()=>Math.floor(timeRemaining % 86400 % 3600 % 60 ));
        setMinutes(()=>Math.floor(timeRemaining % 86400 % 3600 / 60));
        setHours(()=>Math.floor(timeRemaining % 86400 / 3600));
        setDays(()=>Math.floor(timeRemaining / 86400));
    }, 1000);


    // if (timeRemaining === 0) {
    //     setExamTimeLimit(0);
    // }

    return () => {
        setTimeout(() => {
            clearInterval(setExamTimerInterval);
        }, 500);
    }

}, [timeRemaining])


  return (
    <>
      <mainContext.Provider value={{ hours, minutes, seconds, days}}>
        <Home />
        <Intro />
      </mainContext.Provider>
    </>
  )
}

export default App
