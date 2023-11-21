import BulletPoints from "./BulletPoints"
import CallToAction from "./CallToAction"
import CourseList from "./CourseList"
import Home from "./Home"
import Intro from "./Intro"




function LandingPage() {
  return (
    <div>
        <Home/>
        <Intro/>
        <CourseList/>
        <BulletPoints/>
        <CallToAction/>
    </div>
  )
}

export default LandingPage