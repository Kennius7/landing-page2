import { useState, useEffect } from "react";
import { mainContext } from "./context/mainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { monthFunct, dayFunct, hourFunct, minuteFunct, secFunct } from "./data";
import { LandingPage, Register, Dashboard, PaymentPage, UserBoard, Login, SignUp } from "./components";
import axios from "axios";



function App() {
  const [DB_SavedDate, setDB_SavedDate] = useState("");
  const deadlineVariable = new Date(DB_SavedDate);
  const todayVariable = new Date;
  const timeTodayCounted = todayVariable.valueOf();
  let futureCounted = deadlineVariable.valueOf();
  const fetchTimeout = 3000;

  const [isFetched, setIsFetched] = useState(false);

  const futureUTCDate = new Date(futureCounted);
  const getHours = futureUTCDate.getHours();
  const getMinutes = futureUTCDate.getMinutes();
  const getSeconds = futureUTCDate.getSeconds();
  const getDay = futureUTCDate.getDate();
  const getMonth = futureUTCDate.getMonth();
  const getYear = futureUTCDate.getFullYear();
  const futureDate = `${monthFunct(getMonth)}/${dayFunct(getDay)}/${getYear} ${hourFunct(getHours)}:${minuteFunct(getMinutes)}:${secFunct(getSeconds)}`;
  
  const NowUTCDate = new Date;
  const getNowHours = NowUTCDate.getHours();
  const getNowMinutes = NowUTCDate.getMinutes();
  const getNowSeconds = NowUTCDate.getSeconds();
  const getNowDay = NowUTCDate.getDate();
  const getNowMonth = NowUTCDate.getMonth();
  const getNowYear = NowUTCDate.getFullYear();
  const nowDate = `${monthFunct(getNowMonth)}/${dayFunct(getNowDay)}/${getNowYear} ${hourFunct(getNowHours)}:${minuteFunct(getNowMinutes)}:${secFunct(getNowSeconds)}`;



  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [active, setActive] = useState("Home");
  const [menuVisible, setMenuVisible] = useState(false);
  const [ifLandingLoaded, setIfLandingLoaded] = useState(false);

  const ninetyDaysCount = 7776000000;
  let examTimeLimit = (futureCounted - timeTodayCounted)/1000;
  const apiUrlProd = "https://shosan-code-hub-server.netlify.app/.netlify/functions/api/countdown";
  // const apiUrlDev = "http://localhost:3030/countdown";


  const fetchDateData = async () => {
    try {
      const dateFetch = await axios.get(apiUrlProd);
      if (dateFetch.data.date === "" 
        || dateFetch.data.date === null 
        || dateFetch.data.date === undefined 
        || dateFetch.data.date === "Invalid date") {
        setDB_SavedDate(()=>nowDate);
        console.log("Polling...");
        setTimeout(() => {fetchDateData()}, fetchTimeout);
      } else if (dateFetch.data.date !== "" 
        && dateFetch.data.date !== null 
        && dateFetch.data.date !== undefined 
        && dateFetch.data.date !== "Invalid date") {
        console.log("Document data:", dateFetch.data.date);
        setDB_SavedDate(()=>dateFetch.data.date);
        console.log("Success fetching Date...");
        setIsFetched(true);
      }
    } catch (error) {
      console.log("Error fetching Date...");
    }
  }



  const updateDateFunction = async () => {
    try {
      futureCounted = futureCounted + ninetyDaysCount;
      const updatedFetchedDate = new Date(futureCounted);
      const getHours = updatedFetchedDate.getHours();
      const getMinutes = updatedFetchedDate.getMinutes();
      const getSeconds = updatedFetchedDate.getSeconds();
      const getDay = updatedFetchedDate.getDate();
      const getMonth = updatedFetchedDate.getMonth();
      const getYear = updatedFetchedDate.getFullYear();
      const updatedFetchedDateFormatted = `${monthFunct(getMonth)}/${dayFunct(getDay)}/${getYear} ${hourFunct(getHours)}:${minuteFunct(getMinutes)}:${secFunct(getSeconds)}`;
      const updateDateRes = await axios.post(apiUrlProd, { date: updatedFetchedDateFormatted });
      console.log(`${updateDateRes.data.msg}`);
      setIsFetched(false);
      fetchDateData();
    } catch (error) {
      console.log("Error updating Current Date:", error)
    }
  }


  useEffect(() => {
    if (!isFetched) {
      fetchDateData();
    }

    if (examTimeLimit < 1) {
      updateDateFunction();
    }

    const setExamTimerInterval = setInterval(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        examTimeLimit = examTimeLimit - 1;
        setSeconds(()=>Math.floor(examTimeLimit % 60 ));
        setMinutes(()=>Math.floor((examTimeLimit / 60) % 60));
        setHours(()=>Math.floor((examTimeLimit / 3600) % 24));
        setDays(()=>Math.floor(examTimeLimit / 86400));
    }, 1000);


    return () => { clearInterval(setExamTimerInterval) }

  }, [examTimeLimit, DB_SavedDate])


  return (
    <>
      <mainContext.Provider 
        value={{ hours, minutes, seconds, days, active, setActive, menuVisible, setMenuVisible, 
        ifLandingLoaded, setIfLandingLoaded, futureDate, examTimeLimit }}>
        <BrowserRouter>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="/payment" element={ <PaymentPage /> } />
            <Route path="/userboard" element={ <UserBoard /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <SignUp /> } />
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </>
  )
}

export default App
