import { useState, useEffect } from 'react';
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import RegisterHome from "./RegisterHome";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
// import { toast } from "react-toastify";
// import axios from 'axios';
// import countryCodes from "country-codes-list";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';



function Register() {
    const { courses } = useContext(mainContext);
    // const [isOpen, setIsOpen] = useState(false);
    const formSuccessMessage = "Form submitted successfully!";
    const formErrorMessage1 = "Error submitting form. Please try again.";
    const formErrorMessage2 = "Form has errors. Please fix them.";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        countryCode: 'Nigeria (+234)',
        courses: '',
        isPaid: false,
    });
    const [phone, setPhone] = useState("");

    const [errors, setErrors] = useState({});
    const [submitErrors, setSubmitErrors] = useState("");
    const [regData, setRegData] = useState([]);
    // const phoneValidation = usePhoneValidation(phone);
    // const myCountryCodesArray = countryCodes.all();
    // const newCountryCodesArray = myCountryCodesArray.map((country, index) => ({
    //     countryCodes: country.countryCallingCode,
    //     countryName: country.countryNameEn,
    //     id: index + 1,
    // }))
    // const sortedCountryDataArray = newCountryCodesArray.sort((a, b) => a.countryName.localeCompare(b.countryName));


    useEffect(() => {
        const regDataRef = collection(db, "Registrations");
        const q = query(regDataRef, orderBy("createdAt", "desc"));
        // console.log(countryCodes);
        // console.log(myCountryCodesArray);
        // console.log(countryCodesArray);
    
        onSnapshot(q, (snapshot) => {
            const regDataFireBase = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setRegData(regDataFireBase);
        })
    }, [])


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

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const handleOptionClick = (option) => {
    //     setFormData({
    //         ...formData,
    //         courses: option,
    //     });
    //     setIsOpen(false);
    // };

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
        console.log(typeof parseInt(phone.toString().slice(1)));

        if (validateForm()) {
            const regDataRef = collection(db, "Registrations");
            addDoc(regDataRef, {
                name: formData.name,
                email: formData.email,
                number: parseInt(phone.toString().slice(1)),
                courses: formData.courses,
                createdAt: Timestamp.now().toDate(),
                isPaid: true,
                regID: generateHighestId(),
            })
            .then(() => {
                setSubmitErrors(formSuccessMessage);
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
                            {/* <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="border p-2"
                            >
                                {sortedCountryDataArray.map(country => (
                                    <option 
                                        key={country.id} 
                                        value={country.countryCodes}>
                                        {`${country.countryName} (+${country.countryCodes})`}
                                    </option>
                                ))}
                            </select> */}
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

                        {/* <div className="mb-4">
                            <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number (Whatsapp)
                            </label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                placeholder="Whatsapp number preferably"
                                value={formData.number}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors.number && <p className="text-red-500 text-xs italic mt-2">{errors.number}</p>}
                        </div> */}

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
                            {/* {errors.courses && <p className="text-red-500 text-xs italic mt-2">{errors.courses}</p>}
                            <input
                                type="text"
                                id="courses"
                                name="courses"
                                placeholder="Select an option"
                                value={formData.courses}
                                onClick={toggleDropdown}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border 
                                ${errors.courses ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {isOpen && (
                                <div className="origin-top-right absolute left-[34%] mt-2 w-56 rounded-md 
                                    shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        {courses.map((course) => (
                                            <div
                                                key={course.id}
                                                onClick={() => handleOptionClick(course.name)}
                                                className="block text-start pl-3 px-6 py-3 text-sm text-gray-700 
                                                    hover:bg-blue-500 hover:text-white cursor-pointer"
                                            >
                                                {course.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {errors.courses && <p className="text-red-500 text-xs italic mt-2">{errors.courses}</p>} */}
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

