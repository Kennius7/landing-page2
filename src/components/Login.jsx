import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import RegisterHome from "./RegisterHome";



function Login() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState("");
    const [regData, setRegData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toastNetworkError = "auth/network-request-failed";
    const toastLoginError1 = "auth/invalid-email";
    const toastLoginError2 = "auth/invalid-login-credentials";
    const appNetworkErrorText = "There was a network error. Check your network.";
    const appLoginErrorText = "Your login credentials are incorrect.";

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

    const checkCorrectPassword = () => {
        for (let i = 0; i < regData.length; i++) {
            if (password !== regData[i].password) {
                console.log("No password matches this email!");
                return false;
            }
        }
    }

    const checkIfEmailExist = () => {
        for (let i = 0; i < regData.length; i++) {
            if (email !== regData[i].email) {
                console.log("This email has not been registered before!");
                return false;
            }
        }
    }

    const toastErrorMessageFunction = (error) => {
        if (error.code === toastNetworkError) {
            return appNetworkErrorText;
        }
        if (error.code === toastLoginError1) {
            return appLoginErrorText;
        }
        if (error.code === toastLoginError2) {
            return appLoginErrorText;
        }
        else return "There was an error while signing in."
    }

    const SignInTimeOut = () => {
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 1000);
    }
    const validateForm = () => {
        const errors = {};

        if (checkIfEmailExist() === false) {
            errors.email = "This email has not been registered before!";
            SignInTimeOut();
        }

        if (checkCorrectPassword() === false) {
            errors.password = "Your password is incorrect!";
            SignInTimeOut();
        }

        if (!email.trim() || !emailRegex.test(email)) {
            errors.email = 'Valid email is required';
            SignInTimeOut();
        }

        if (email === "") {
            errors.email = "Please select an email";
            SignInTimeOut();
        }

        if  (password === "") {
            errors.password = "Please select a password";
            SignInTimeOut();
        }

        setErrors(errors);

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    const handleLogIn = async () => {
        setIsLoggedIn(true);

        if (validateForm()) {
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                toast("Sign In successful", { type: "success" });
                setTimeout(() => {
                    setIsLoggedIn(false);
                }, 2000);
                setTimeout(() => {
                    Navigate("/userboard");
                }, 3500)
            })
            .catch((error)=>{
                console.error(error);
                toast(`${toastErrorMessageFunction(error)}`, { type: "error" });
                setTimeout(() => {
                    setIsLoggedIn(false);
                }, 2500);
            })
        }

    }

    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-[1000px]">
                <div className="w-full">
                    <RegisterHome/>
                </div>
                <div className="container mx-auto md:mt-4 xs:mt-8 mt-5">
                    <div className="font-poppins font-semibold sm:w-full w-[92%] text-center 
                        sm:text-[30px] text-[24px] md:mb-[30px] sm:mb-[60px] xs:mb-[40px] 
                        mb-[20px] md:m-2 sm:m-4 m-1">
                        SIGN IN&nbsp;
                            <div className="flex justify-center items-center text-[16px]">
                                (&nbsp;Or Enter as a&nbsp;
                                <div 
                                    onClick={()=>Navigate("/userboard")} 
                                    className="text-blue-500 cursor-pointer">
                                    Guest
                                </div>&nbsp;)
                            </div>
                    </div>

                    <div className="max-w-md mx-auto">

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="johndoe@email.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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

                        <div className='flex justify-center items-center w-full mt-[50px]'>
                            <div className="flex justify-center items-center bg-blue-500 
                                hover:bg-blue-700 focus:bg-blue-700 rounded-[6px] w-[60%] h-[50px]">
                                {
                                    !isLoggedIn
                                        ?   <button 
                                                onClick={handleLogIn}
                                                className="text-white font-bold text-center rounded-[6px] 
                                                focus:outline-none focus:shadow-outline w-full h-full">
                                                Sign In
                                            </button>
                                        :   <div className='flex justify-center items-center rotate'>
                                                <AiOutlineLoading3Quarters size={24} color="white" />
                                            </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mt-[20px]">
                                <div>
                                    Don&apos;t have an account?&nbsp;
                                    <span 
                                        onClick={() => Navigate("/register")} 
                                        className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                        Sign Up.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

