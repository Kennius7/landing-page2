import { useState } from 'react';
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import RegisterHome from "./RegisterHome";



function Register() {
    const { courses } = useContext(mainContext);
    const [isOpen, setIsOpen] = useState(false);
    // const [consoleReport, setConsoleReport] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        courses: '',
    });
    // const formReport = JSON.stringify(formData).toString();

    const [errors, setErrors] = useState({});

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

        // Validate password
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(formData.number)) {
            errors.number = 'Valid number is required';
        }

        if (formData.number === "") {
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setFormData({
            ...formData,
            courses: option,
        });
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Perform form submission logic here
            console.log('Form submitted:', formData);
            // setConsoleReport(formReport);
        } else {
            console.log('Form has errors. Please fix them.');
            // setConsoleReport("Form has errors. Please fix them.");
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
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
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
                        </div>

                        <div className="mb-4">
                            <label htmlFor="courses" className="block text-gray-700 text-sm font-bold mb-2">
                                Courses
                            </label>
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
                            {errors.courses && <p className="text-red-500 text-xs italic mt-2">{errors.courses}</p>}
                        </div>

                        <div className="mt-[50px] text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>

                        {/* <div className="mt-[20px] w-full text-[12px] bg-red-300">
                            {consoleReport}
                        </div> */}
                    </form>
                </div>
            </div>
        </>
    )
}


export default Register

