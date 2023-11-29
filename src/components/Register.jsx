import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import RegisterHome from "./RegisterHome";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
// import { toast } from "react-toastify";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';




function Register() {
    const Navigate = useNavigate();
    const { courses } = useContext(mainContext);
    const formSuccessMessage = "Form submitted successfully!";
    const formErrorMessage1 = "Error submitting form. Please try again.";
    const formErrorMessage2 = "Form has errors. Please fix them.";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        courses: '',
    });
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [submitErrors, setSubmitErrors] = useState("");
    const [regData, setRegData] = useState([]);


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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};

        // Validate name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = 'Valid email is required';
        }

        // Validate phone number
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(parseInt(phone.toString().slice(1)))) {
            errors.number = 'Valid number is required';
        }

        if (phone === "") {
            errors.number = 'Please type in a Phone number';
        }

        // Validate course selection
        if (formData.courses === "") {
            errors.courses = 'Please select a course';
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
        e.preventDefault();
        console.log(parseInt(phone.toString().slice(1)));

        if (validateForm()) {
            const regDataRef = collection(db, "Registrations");
            addDoc(regDataRef, {
                name: formData.name,
                email: formData.email,
                number: parseInt(phone.toString().slice(1)),
                courses: formData.courses,
                createdAt: Timestamp.now().toDate(),
                isPaid: false,
                regID: generateHighestId(),
            })
            .then(() => {
                setSubmitErrors(formSuccessMessage);
                localStorage.setItem("regDataEmail", formData.email);
                localStorage.setItem("regDataName", formData.name);
                localStorage.setItem("regDataAmount", checkCourseAmount());
                localStorage.setItem("regDataCourses", formData.courses);
                Navigate("/payment");
            })
            .catch(() => {
                setSubmitErrors(formErrorMessage1);
            })
        } else {
            setSubmitErrors(formErrorMessage2);
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
                        </div>

                        <div className="mt-[50px] text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                            {
                                submitErrors && 
                                <p className={`${submitErrors === formSuccessMessage 
                                    ? 'text-blue-500' 
                                    : 'text-red-500'} text-xs italic mt-2`}>
                                    {submitErrors}
                                </p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Register

