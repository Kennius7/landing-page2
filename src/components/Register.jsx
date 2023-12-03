import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import RegisterHome from "./RegisterHome";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";




function Register() {
    const Navigate = useNavigate();
    const { courses } = useContext(mainContext);
    // const formSuccessMessage = "Form submitted successfully!";
    // const formErrorMessage1 = "Error submitting form. Please try again.";
    // const formErrorMessage2 = "Form has errors. Please fix them.";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
        courses: '',
    });
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    // const [submitErrors, setSubmitErrors] = useState("");
    const [regData, setRegData] = useState([]);
    const [isEmailUsed, setIsEmailUsed] = useState(false);
    const [submitText, setSubmitText] = useState("Submit");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    useEffect(() => {
        const regDataRef = collection(db, "Registrations");
        const q = query(regDataRef, orderBy("createdAt", "desc"));
    
        onSnapshot(q, (snapshot) => {
            const regDataFireBase = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setRegData(regDataFireBase);
        })
    }, [])

    const checkCourseAmount = () => {
        for (let i = 0; i < courses.length; i++) {
            if (formData.courses === courses[i].name) {
                console.log(courses[i].price);
                return courses[i].price;
            }
        }
    }

    const checkEmailUsed = () => {
        for (let i = 0; i < regData.length; i++) {
            if (formData.email === regData[i].email) {
                console.log("This email has been used before!");
                setIsEmailUsed(true);
                return isEmailUsed;
            }
        }
    }

    const SignUpTimeOut = () => {
        setTimeout(() => {
            setSubmitText("Submit");
        }, 3000);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validatePassword = (regex, password) => {
        const hasRegex = regex.test(password);
        return hasRegex;
    }

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
            setIsEmailUsed(false);
            SignUpTimeOut();
        }

        // Validate phone number
        if (!numberRegex.test(parseInt(phone.toString().slice(1)))) {
            errors.number = 'Valid number is required';
            SignUpTimeOut();
        }

        if (phone === "" || phone === "+234") {
            errors.number = 'Please type in a Phone number';
            SignUpTimeOut();
        }

        // Validate course selection
        if (formData.courses === "") {
            errors.courses = 'Please select a course';
            SignUpTimeOut();
        }

        // Validate Password input
        if  (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
            SignUpTimeOut();
        }
        if (!validatePassword(lowerCaseRegex, formData.password)) {
            errors.password = "Password must have small letters";
            SignUpTimeOut();
        }
        if (!validatePassword(upperCaseRegex, formData.password)) {
            errors.password = "Password must have capital letters";
            SignUpTimeOut();
        }
        if (!validatePassword(numberRegex, formData.password)) {
            errors.password = "Password must have numbers";
            SignUpTimeOut();
        }
        if (!validatePassword(specialCharRegex, formData.password)) {
            errors.password = "Password must have special characters";
            SignUpTimeOut();
        }
        if  (formData.password === "") {
            errors.password = "Please select a password";
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

    const handleSubmit = (e) => {
        setSubmitText("Submitting...");
        console.log(formData.name);
        e.preventDefault();
        console.log(parseInt(phone.toString().slice(1)));

        if (validateForm()) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(auth);
            // updateProfile(auth.currentUser, { displayName: formData.name });
            const regDataRef = collection(db, "Registrations");
            addDoc(regDataRef, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                number: parseInt(phone.toString().slice(1)),
                courses: formData.courses,
                createdAt: Timestamp.now().toDate(),
                isPaid: false,
                regID: generateHighestId(),
            })
            .then(() => {
                console.log("Registration successful");
                // setSubmitErrors(formSuccessMessage);
                localStorage.setItem("regDataEmail", formData.email);
                localStorage.setItem("regDataName", formData.name);
                localStorage.setItem("regDataAmount", checkCourseAmount());
                localStorage.setItem("regDataCourses", formData.courses);
                setTimeout(() => {
                    setSubmitText("Submit");
                }, 3000);
                setTimeout(() => {
                    Navigate("/payment");
                }, 5000);
            })
            .catch(() => {
                console.log("Registration Not successful");
                // setSubmitErrors(formErrorMessage1);
            })
        } else {
            console.log("No Registration");
            // setSubmitErrors(formErrorMessage2);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-[1300px]">
                <div className="w-full">
                    <RegisterHome/>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="font-poppins font-semibold w-full text-center text-[30px] mb-[60px] m-4">
                        REGISTRATION
                    </div>
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="johndoe@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border 
                                ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {
                                passwordVisible 
                                ? <span 
                                    className={`cursor-pointer absolute z-[1] right-[2%] top-[52%] 
                                    opacity-40 ${errors.password && '-mt-[12px]'}`}
                                    onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                    <AiFillEye name="eye" size={24} color="black" />
                                    </span> 
                                : <span 
                                    className={`cursor-pointer absolute z-[1] right-[2%] top-[52%] 
                                    opacity-40 ${errors.password && '-mt-[12px]'}`}
                                    onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                    <AiFillEyeInvisible name="eye-with-line" size={24} color="black" />
                                    </span> 
                            }
                            {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label 
                                htmlFor="countryCode" 
                                className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <div className='w-full'>
                                <PhoneInput
                                    defaultCountry="ng"
                                    name="number"
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)} 
                                    inputStyle={{width: "100%", backgroundColour: "green"}}
                                />
                                {errors.number && <p className="text-red-500 text-xs italic mt-2">{errors.number}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="courses" className="block text-gray-700 text-sm font-bold mb-2">
                                Select a course
                            </label>
                            <select
                                name="courses"
                                value={formData.courses}
                                onChange={handleChange}
                                className={`border p-2 rounded-[4px] w-full
                                    ${errors.courses ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                {courses.map(course => (
                                    <option 
                                        key={course.id} 
                                        value={course.name}
                                    >
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                            {errors.courses && <p className="text-red-500 text-xs italic mt-2">{errors.courses}</p>}
                        </div>

                        <div className="mt-[50px] text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                    py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {submitText}
                            </button>
                            {/* {
                                submitErrors && 
                                <p className={`${submitErrors === formSuccessMessage 
                                    ? 'text-blue-500' 
                                    : 'text-red-500'} text-xs italic mt-2`}>
                                    {submitErrors}
                                </p>
                            } */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Register

