import { useState, useEffect } from 'react';
import { selectCourses } from '../data';
import RegisterHome from "./RegisterHome";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../FirebaseConfig";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";





function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        courses: '',
    });

    const [errors, setErrors] = useState({});
    const [regData, setRegData] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [isEmailUsed, setIsEmailUsed] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const numberRegex = /[0-9]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const apiUrlDev = "http://localhost:3030/send-email";
    const apiUrlProd = "https://shosan-code-hub-server.netlify.app/.netlify/functions/api/send-email";
    const timeout = 20000;


    useEffect(() => {
        const fetchRegData = () => {
            const regDataRef = collection(db, "Registrations");
            const q = query(regDataRef, orderBy("createdAt", "desc"));
            onSnapshot(q, (snapshot) => {
                const regDataFireBase = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setRegData(regDataFireBase);
                setIsPolling(!isPolling);
            })
        }

        if (regData.length === 0) {
            setTimeout(() => {
                fetchRegData();
                console.log(`Reg Data polling...`)
            }, 3000);
        }

        if (regData.length !== 0) {
            const regDataFetch = regData.length === 0 ? "None" : regData;
            console.log(`Registration data fetched: ${regDataFetch[0].name}`);
        }
    }, [regData, isPolling])

    // const checkCourseAmount = () => {
    //     for (let i = 0; i < courses.length; i++) {
    //         if (formData.courses === courses[i].name) {
    //             console.log(courses[i].price);
    //             return courses[i].price;
    //         }
    //     }
    // }

    const checkEmailUsed = () => {
        for (let i = 0; i < regData.length; i++) {
            if (formData.email === regData[i].email) {
                console.log("This email has been used before!");
                setIsEmailUsed(true);
                return isEmailUsed;
            } else {
                setIsEmailUsed(false);
                return isEmailUsed;
            }
        }
    }
    
    const SignUpTimeOut = () => {
        setTimeout(() => {
            setIsSubmit(false);
            setTimeout(() => {
                setErrors({});
            }, 10000);
        }, 2000);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNumberChange = (input) => {
        setFormData({
            ...formData,
            number: input,
        });
    };
    
    // checkEmailUsed();
    const validateForm = () => {
        const errors = {};

        // Validate name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            SignUpTimeOut();
        }

        // Validate email
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = 'Valid email is required';
            SignUpTimeOut();
        }

        if (checkEmailUsed() === true) {
            errors.email = "This email has been used before!";
            SignUpTimeOut();
        }

        // Validate phone number
        if (!numberRegex.test(parseInt(formData.number.toString().slice(1)))) {
            errors.number = 'Valid number is required';
            SignUpTimeOut();
        }

        if (formData.number === "" || formData.number === "+234") {
            errors.number = 'Please type in a phone number';
            SignUpTimeOut();
        }

        // Validate course selection
        if (formData.courses === "" || formData.courses === "Select a course") {
            errors.courses = 'Please select a course';
            SignUpTimeOut();
        }

        setErrors(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    const generateHighestId = () => {
        if (regData.length === 0) {
            return 0
        } 
        if (regData.length > 0) {
            const ids = regData.map(item => item.regID);
            const highestId = Math.max(...ids);
            return (highestId + 1);
        }
    }

    const sendEmailForm = async () => {
        try {
            const response = await axios.post(apiUrlProd, formData, { timeout })
            console.log(`${response.data.emailMessage}`);
            toast(response.data.formMessage, { type: "success" });
            setTimeout(() => setIsSubmit(false), 4000);
        } catch (error) {
            console.log(error);
            if (error.code === "ECONNABORTED") {
                console.error(`Sending took too long: ${error}`);
                toast(error.data.data.timeoutMessage, { type: "error" });
                setTimeout(() => setIsSubmit(false), 4000);
            } else {
                setIsSubmit(false);
                console.error(`Email sending failed: ${error}`);
                toast(error.data.data.errorMessage, { type: "error" });
                setTimeout(() => setIsSubmit(false), 4000);
            }
        }
    }





    const handleSubmit = (e) => {
        setIsSubmit(true);
        e.preventDefault();
        console.log(formData);

        if (validateForm()) {
            if (navigator.onLine) {
                console.log("App online");
                const regDataRef = collection(db, "Registrations");
                addDoc(regDataRef, {
                    name: formData.name,
                    email: formData.email,
                    number: parseInt(formData.number.toString().slice(1)),
                    courses: formData.courses,
                    createdAt: Timestamp.now().toDate(),
                    isPaid: false,
                    regID: generateHighestId(),
                })
                .then(()=>{
                    sendEmailForm();
                    console.log("Registration successful");
                    toast("Registration successful", { type: "success" });
                    setTimeout(() => { setIsSubmit(false) }, 2000);
                })
                .catch((error)=>{
                    console.log("Error Registering", error);
                    toast("Error Registering", { type: "error" });
                    setTimeout(() => {
                        setIsSubmit(false);
                    }, 2000);
                })

            }
            if (!navigator.onLine) {
                console.log("App offline");
                toast("It seems you're offline", { type: "warning" });
                setTimeout(() => {
                    setIsSubmit(false);
                }, 2000);
            }
        } else {
            console.log("No Registration");
        }
    };

    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-[1100px]">
                <div className="w-full">
                    <RegisterHome/>
                </div>
                <div className="w-[35%] mt-[60px]">
                    <div className="font-poppins font-semibold w-full text-center text-[30px] 
                        mb-[50px] m-4">
                        REGISTRATION
                    </div>
                    <form 
                        className="w-full" 
                        onSubmit={handleSubmit}>

                        <div className="w-full mb-[30px]">
                            <label 
                                htmlFor="name" 
                                className="text-gray-700 text-[16px] font-semibold">
                                Name
                            </label>
                            <div className="w-full h-[50px]">
                                <input type="text" id="name" name="name" 
                                    placeholder="Eg. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`font-sans text-[16px] w-full h-[85%] pl-2 
                                    border rounded-[6px] placeholder:italic placeholder:text-[16px]
                                    ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {
                                    errors.name 
                                        &&  <p className="font-sans text-red-500 text-[15px] italic 
                                            w-full h-[15%] pl-1">
                                                {errors.name}
                                            </p>
                                }
                            </div>
                        </div>

                        <div className="w-full mb-[30px]">
                            <label 
                                htmlFor="email" 
                                className="text-gray-700 text-[16px] font-semibold">
                                Email
                            </label>
                            <div className="w-full h-[50px]">
                                <input type="text" id="email" name="email"
                                    placeholder="Eg. johndoe@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`font-sans text-[16px] w-full h-[85%] pl-2 
                                    border rounded-[6px] placeholder:italic placeholder:text-[16px]
                                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {
                                    errors.email 
                                        && 
                                        <p className="font-sans text-red-500 text-[15px] italic 
                                        w-full h-[15%] pl-1">
                                            {errors.email}
                                        </p>
                                }
                            </div>
                        </div>

                        <div className="w-full mb-[30px]">
                            <label 
                                htmlFor="number" 
                                className="text-gray-700 text-[16px] font-semibold">
                                Phone Number
                            </label>
                            <div className="w-full h-[50px]">
                                <PhoneInput
                                    defaultCountry="ng"
                                    type="number"
                                    id="number"
                                    inputProps={{
                                        name: "number" ,
                                        placeholder: "Include country code, Eg. +23470222...", 
                                        maxLength: 15
                                    }}
                                    value={formData.number}
                                    onChange={handleNumberChange} 
                                    className={`outline-none rounded-[6px] border font-sans 
                                    text-[16px] w-full h-[85%] placeholder:italic placeholder:text-[16px]
                                    ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                                    inputStyle={{
                                        width: "100%", 
                                        height: "100%",
                                        borderTopRightRadius: "6px",
                                        borderBottomRightRadius: "6px",
                                        outline: 0
                                    }}
                                />
                                {
                                    errors.number 
                                        && 
                                        <p className="font-sans text-red-500 text-[15px] italic 
                                        w-full h-[15%] pl-1">
                                            {errors.number}
                                        </p>
                                }
                            </div>
                        </div>

                        <div className="w-full mb-[30px]">
                            <label 
                                htmlFor="courses" 
                                className="text-gray-700 text-[16px] font-semibold">
                                Select a course
                            </label>
                            <div className="w-full h-[50px]">
                                <select
                                    name="courses"
                                    value={formData.courses}
                                    onChange={handleChange}
                                    className={`font-sans text-[18px] italic w-full h-[85%] pl-2 
                                    border rounded-[6px] text-slate-600
                                        ${errors.courses ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    {selectCourses.map(course => (
                                        <option 
                                            key={course.id} 
                                            value={course.name}
                                        >
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                {
                                    errors.courses 
                                        && <p className="font-sans text-red-500 text-[15px] italic 
                                            w-full h-[15%] pl-1">
                                                {errors.courses}
                                            </p>
                                }
                            
                            </div>
                        </div>

                        <div className='flex justify-center items-center w-full mt-[50px]'>
                            <div className="flex justify-center items-center bg-blue-500 
                                hover:bg-blue-700 focus:bg-blue-700 rounded-[6px] w-[60%] h-[50px]">
                                {
                                    !isSubmit
                                        ?   <button
                                                type="submit"
                                                className="text-white font-bold text-center rounded-[6px] 
                                                focus:outline-none focus:shadow-outline w-full h-full">
                                                Submit
                                            </button>
                                        :   <div className='flex justify-center items-center rotate'>
                                                <AiOutlineLoading3Quarters size={24} color="white" />
                                            </div>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}


export default Register

