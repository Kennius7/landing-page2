import BulletPoints from "./BulletPoints"
import CallToAction from "./CallToAction"
import Home from "./Home"
import Intro from "./Intro"




function LandingPage() {
  return (
    <div>
        <Home/>
        <Intro/>
        <BulletPoints/>
        <CallToAction/>
    </div>
  )
}

export default LandingPage