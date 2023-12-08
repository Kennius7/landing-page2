import webDesignBasicPics from "./assets/logos-edits-html5.webp";
import reactPics from "./assets/logos-edits-react.webp";
import nodePics from "./assets/logos-edits-nodejs.webp";
import reactNativePics from "./assets/logos-edits-react-native.webp";
import pythonPics from "./assets/logos-edits-python.webp";


const courseDesc = {
    webBasic: "This course covers the rudiments of web design; HTML, CSS and popular CSS frameworks, Bootstrap and TailwindCSS, and then finally Javascript, a proper programming language. If you wish to begin your journey into web based programming, this is your best choice",
    frontEnd: "Want to furnish your skills and become proficient in React? Then this is the course for you. This covers React as a framework of Javascript, after solidying your foundation in web design basics, and establish your front end skills as a web developer. By the end of this course you can apply for any front end role in companies and start ups.",
    backEnd: "In web app development, there is usually the front end or client side of the application, and the backe end or server side. If your interest is in server side programming, with NodeJs as the language of choice, then ths course is for you. This course covers NodeJs, ExpressJS, and MongoDB.",
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


export default courses;
