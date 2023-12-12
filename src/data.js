import { 
    features01, features02, features03, features04, features05, 
    features06, webDesignBasicPics, reactPics, reactNativePics, 
    nodePics, pythonPics, laptop, power, dataConnect, study } from "./assets";



const courseDesc = {
    webBasic: "This course covers the rudiments of web design; HTML, CSS and popular CSS frameworks, Bootstrap and TailwindCSS, and then finally Javascript, a proper programming language. If you wish to begin your journey into web based programming, this is your best choice",
    frontEnd: "Want to furnish your skills and become proficient in React? Then this is the course for you. This covers React as a framework of Javascript, after solidying your foundation in web design basics, and establish your front end skills as a web developer. By the end of this course you can apply for any front end role in companies and start ups.",
    backEnd: "In web app development, there is usually the front end or client side of the application, and the back end or server side. If your interest is in server side programming, with NodeJs as the language of choice, then this course is for you. This course covers NodeJs, ExpressJS, and MongoDB.",
    mobile: "Mobile app development is on demand right now and if that's your choice on the path to greatness then this course can guide you to your destination. This course covers React Native, a styled framework similar to React but built for mobile devices. By the end of this course, you can confidently boast of your mobile app building prowess.",
    python: "For those interested in data analysis, data science, and AI, learning Python is a great option. This course covers the rudiments of Python as a programming language and takes you through it from the ground up. By the end of the course, you should be proficient in Python programming as a whole.",
}

const courses = [
    { id: 0, name: 'Web Design Basics', formerPrice: 300000, price: 30000, duration: '4 weeks', alt: 'Web Design Pics', picsRep: webDesignBasicPics, description: courseDesc.webBasic, },
    { id: 1, name: 'Front End Development (React)', formerPrice: 500000, price: 50000, duration: '8 weeks', alt: 'React Pics', picsRep: reactPics, description: courseDesc.frontEnd, },
    { id: 2, name: 'Back End Development (Node.js)', formerPrice: 500000, price: 50000, duration: '8 weeks', alt: 'Back End Pics', picsRep: nodePics, description: courseDesc.backEnd, },
    { id: 3, name: 'Mobile App Development (React Native)', formerPrice: 500000, price: 50000, duration: '8 weeks', alt: 'Mobile design Pics', picsRep: reactNativePics, description: courseDesc.mobile, },
    { id: 4, name: 'Python', formerPrice: 300000, price: 30000, duration: '6 weeks', alt: 'Python Pics', picsRep: pythonPics, description: courseDesc.python },
];

const imageDesc = {
    laptop: "Duo Core Laptop or better",
    data: "Steady data connection",
    power: "Steady power supply (If possible)",
    study: "A dogged willingness to learn",
}

export const requirementData = [
    { id: 0, img: laptop, desc: imageDesc.laptop, },
    { id: 1, img: dataConnect, desc: imageDesc.data, },
    { id: 2, img: power, desc: imageDesc.power, },
    { id: 3, img: study, desc: imageDesc.study, },
]

export const reasonWhySlide = [
    {
      id: 0,
      name: "Expert Tutoring",
      title: "Learn from professionals with years of hands-on experience. Our instructors are passionate about guiding you through the ins and outs of programming, ensuring you gain real-world insights",
      img: features01,
    },
    {
      id: 1,
      name: "Comprehensive Curriculum",
      title: "Stay ahead of the curve with a curriculum designed to cover the latest programming languages, frameworks, and industry trends. From Python to JavaScript, we've got you covered",
      img: features02,
    },
    {
      id: 2,
      name: "Flexible Learning",
      title: "Life is busy, and we get it! Our online classes are structured to fit your schedule. Learn at your own pace, from the comfort of your home, and access course materials 24/7",
      img: features03,
    },
    {
      id: 3,
      name: "Hands-On Projects",
      title: "Put theory into practice with engaging, hands-on projects that reinforce your learning. Build a portfolio of impressive projects to showcase your skills to future employers",
      img: features04,
    },
    {
      id: 4,
      name: "Community Support",
      title: "Join a vibrant community of learners, exchange ideas, and get help when you need it. Our dedicated support team and forums ensure you're never alone on your coding journey",
      img: features05,
    },
    {
      id: 5,
      name: "Career Guidance",
      title: "Looking to land that dream job in tech? Our courses come with valuable career guidance, including resume reviews, interview tips, and networking opportunities",
      img: features06,
    },
];

export const sideBarData = [
  {
    id: 0,
    name: "Home",
  },
  {
    id: 1,
    name: "Profile",
  },
  {
    id: 2,
    name: "Courses",
  },
  {
    id: 3,
    name: "Content",
  },
]

export const rightDropDownData = [
  {
    id: 0,
    name: "Back to Landing Page",
  },
  {
    id: 1,
    name: "Edit Registration Data",
  },
  {
    id: 2,
    name: "Sign Out",
  },
]




export default courses;
export const password = "Shosanboggs7#";