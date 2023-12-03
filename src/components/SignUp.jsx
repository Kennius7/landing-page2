import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/shosanacodemia-logo111.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../FirebaseConfig";



function Register() {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signUpText, setSignUpText] = useState("Sign Up");
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&]/;
    const toastNetworkError = "auth/network-request-failed";
    const appNetworkErrorText = "There was a network error. Check your network.";

    const validatePassword = (regex, password) => {
        const hasRegex = regex.test(password);
        return hasRegex;
    }

    const SignUpTimeOut = () => {
        setTimeout(() => {
            setSignUpText("Sign Up");
        }, 3000);
    }


  const toastErrorMessageFunction = (error) => {
    if (error.code === toastNetworkError) {
      return appNetworkErrorText;
    }
    else return "Unknown error."
  }

    const handleRegister = async () => {
        setSignUpText("Signing Up...");

        if ( name ||  email ||  password) {
            toast("Please fill out all necessary fields", { type: "error" });
            SignUpTimeOut();
            return
        }
        if  (password.length < 8) {
            toast("Password must be at least 8 characters", { type: "error" });
            SignUpTimeOut();
            return
        }
        if (!validatePassword(lowerCaseRegex, password)) {
            toast("Password must have small letters", { type: "error" });
            SignUpTimeOut();
            return
        }
        if (!validatePassword(upperCaseRegex, password)) {
            toast("Password must have capital letters", { type: "error" });
            SignUpTimeOut();
            return
        }
        if (!validatePassword(numberRegex, password)) {
            toast("Password must have numbers", { type: "error" });
            SignUpTimeOut();
            return
        }
        if (!validatePassword(specialCharRegex, password)) {
            toast("Password must have special characters", { type: "error" });
            SignUpTimeOut();
            return
        }


        try {
            await createUserWithEmailAndPassword(auth, email, password);
            signInWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName: name });
            setTimeout(() => {
                setSignUpText("Sign Up");
                toast("Sign up successful", { type: "success" });
            }, 3000);
            setTimeout(() => {
                Navigate("/home");
            }, 3500);
        } catch (error) {
            toast(`${toastErrorMessageFunction(error)}`, { type: "error" });
            SignUpTimeOut();
        }
    }


    return (
        <>
            <div className="relative flex justify-center items-center overflow-hidden w-full h-[100vh]">
                
                <div className="flex justify-start items-center overflow-hidden w-full 
                    md:mt-0 sm:-mt-[200px] xs:mt-0 xxs:-mt-[27%] -mt-[10%]">

                    <div className="md:w-[50%] md:h-[50%] sm:w-[90%] sm:h-[90%] xs:w-[95%] xs:h-[95%] 
                        w-[98%] h-[98%] md:ml-0 sm:-ml-[200px] ml-0">
                        <img src={logo} alt="logo" className="w-full h-full opacity-20"/>
                    </div>
                    
                </div>

                <div className="flex flex-col justify-center items-center w-full absolute z-[2] 
                    md:top-[10%] sm:top-[10%] xs:top-[15%] top-[8%]">

                    <div className="font-sans font-semibold md:text-[26px] sm:text-[40px] text-[30px] w-[80%]
                        md:my-[30px] sm:my-[30px] xs:my-[50px] my-[30px] xs:text-center text-start 
                        text-primary navText3">
                        Sign Up
                    </div>

                    <div className="flex justify-center items-center w-full">

                        <form 
                            name="cbtForm" 
                            className="flex flex-col justify-center items-center md:w-[30%] sm:w-[40%] 
                                xs:w-[60%] w-[80%]">

                            <div className="xs:mb-[20px] mb-[15px] w-full">
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    name="fullName" 
                                    onChange={(e) => {setName(e.target.value)}} 
                                    value={name}
                                    className="w-full text-[16px] p-2 rounded-[7px] bg-slate-100 border-[1px] border-slate-500"/>
                            </div>
                            <div className="xs:mb-[20px] mb-[15px] w-full">
                                <input 
                                    type="email" 
                                    placeholder="Email address" 
                                    name="emailForm" 
                                    onChange={(e) => {setEmail(e.target.value)}} 
                                    value={email}
                                    className="w-full text-[16px] p-2 rounded-[7px] bg-slate-100 border-[1px] border-slate-500"/>
                            </div>
                            <div className="xs:mb-[20px] mb-[10px] w-full relative">
                                <input 
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password" 
                                    name="passwordForm" 
                                    onChange={(e) => {setPassword(e.target.value)}} 
                                    value={password}
                                    className="w-full text-[16px] p-2 rounded-[7px] bg-slate-100 border-[1px] border-slate-500"/>
                                {
                                    passwordVisible 
                                    ? <span 
                                        className="cursor-pointer absolute z-[1] right-[2%] top-[20%] opacity-60"
                                        onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                        <AiFillEye name="eye" size={24} color="black" />
                                        </span> 
                                    : <span 
                                        className="cursor-pointer absolute z-[1] right-[2%] top-[20%] opacity-60"
                                        onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                        <AiFillEyeInvisible name="eye-with-line" size={24} color="black" />
                                        </span> 
                                }
                            </div>

                            <div className="xxs:text-[16px] text-[14px] xxs:tracking-normal tracking-tighter">
                                Have an account already, then&nbsp;
                                <span onClick={()=>Navigate("/login")} 
                                    className="text-yellow-800 font-semibold cursor-pointer">
                                    sign in here.
                                </span>
                            </div>

                            <div className="mt-[20px]">
                                <div className="mt-4">
                                    <button 
                                        type="button" 
                                        className="bg-yellow-800 text-white w-[150px] p-2 rounded-[7px] " 
                                        onClick={handleRegister}>
                                        {signUpText}
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>



            </div>
        </>
    )
}

export default Register


















