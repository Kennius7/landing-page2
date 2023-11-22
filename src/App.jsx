import { useState, useEffect } from "react";
import { mainContext } from "./context/mainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import ScrollToTop from "./ScrollToTop";
import Dashboard from "./components/Dashboard";



function App() {
  const courses = [
    { id: 0, name: 'Web Design Basics', formerPrice: "100,000", price: "30,000", duration: '4 weeks', },
    { id: 1, name: 'Advanced Web Design', formerPrice: "200,000", price: "40,000", duration: '4 weeks', },
    { id: 2, name: 'Front End Development (React)', formerPrice: "300,000", price: "45,000", duration: '8 weeks', },
    { id: 3, name: 'Back End Development (Node.js)', formerPrice: "300,000", price: "50,000", duration: '8 weeks', },
    { id: 4, name: 'Mobile App Development (React Native)', formerPrice: "350,000", price: "50,000", duration: '8 weeks', },
    { id: 5, name: 'Python', formerPrice: "200,000", price: "40,000", duration: '6 weeks', },
  ];

  const timeVariable1 = new Date("01/31/2024 09:00:00");
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
      <mainContext.Provider value={{ hours, minutes, seconds, days, courses}}>
        <BrowserRouter>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/dashboard" element={ <Dashboard /> } />
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </>
  )
}

export default App
