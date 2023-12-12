import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import RegisterHome from "./RegisterHome";



function Login() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginText, setLoginText] = useState("Sign in");
    const [errors, setErrors] = useState("");
    const [regData, setRegData] = useState([]);

    const toastNetworkError = "auth/network-request-failed";
    const toastLoginError1 = "auth/invalid-email";
    const toastLoginError2 = "Firebase: Error(auth/invalid-email)";
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

    const toastErrorMessageFunction = (error) => {
        if (error.code === toastNetworkError) {
            return appNetworkErrorText;
        }
        if (error.code === toastLoginError1) {
            return appLoginErrorText;
        }
        if (error.message === toastLoginError2) {
            return appLoginErrorText;
        }
        else return "There was an error while signing in."
    }

    const checkCorrectPassword = () => {
        for (let i = 0; i < regData.length; i++) {
            if (password !== regData[i].password) {
                console.log("No password matches this email!");
                return false;
            }
            else {
                console.log("Password exists!")
                return true
            }
        }
    }

    const checkIfEmailExist = () => {
        for (let i = 0; i < regData.length; i++) {
            if (email !== regData[i].email) {
                console.log("This email has not been registered before!");
                return false;
            }
            else {
                console.log("Email exists!")
                return true
            }
        }
    }

    const SignInTimeOut = () => {
        setTimeout(() => {
            setLoginText("Sign In");
        }, 3000);
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
        setLoginText("Signing in...");

        if (validateForm()) {
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                toast("Sign In successful", { type: "success" });
                setTimeout(() => {
                    setLoginText("Sign In");
                }, 2500);
                setTimeout(() => {
                    Navigate("/userboard");
                }, 3500)
            })
            .catch((error)=>{
                toast(`${toastErrorMessageFunction(error)}`, { type: "error" });
                setTimeout(() => {
                    setLoginText("Sign In");
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
                <div className="container mx-auto xs:mt-8 mt-5">
                    <div className="font-poppins font-semibold sm:w-full w-[92%] text-center 
                        sm:text-[30px] text-[24px] sm:mb-[60px] xs:mb-[40px] mb-[20px] sm:m-4 m-1">
                        SIGN IN
                    </div>

                    <div className="max-w-md mx-auto">

                        <div className="mb-8">
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

                        <div className="mt-[50px] text-center">
                            <button
                                onClick={handleLogIn}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                {loginText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

