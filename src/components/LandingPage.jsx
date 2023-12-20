// import { useContext, useEffect } from "react";
// import { mainContext } from "../context/mainContext";
import { BulletPoints, CallToAction, CourseList, Home, Intro, Requirement } from "./index";





function LandingPage() {
  // const { setIfLandingLoaded } = useContext(mainContext);

  // useEffect(() => {
  //   setIfLandingLoaded(true);
  // }, [setIfLandingLoaded]);
  

  return (
    <>
        <Home/>
        <Intro/>
        <CourseList/>
        <Requirement/>
        <BulletPoints/>
        <CallToAction/>
    </>
  )
}

export default LandingPage

