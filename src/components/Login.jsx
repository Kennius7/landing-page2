import { useNavigate } from "react-router-dom";
import logo from "../assets/shosanacodemia-logo111.png";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';



function Login() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginText, setLoginText] = useState("Sign in");
    const toastNetworkError = "auth/network-request-failed";
    const toastLoginError1 = "auth/invalid-email";
    const toastLoginError2 = "Firebase: Error(auth/invalid-email)";
    const appNetworkErrorText = "There was a network error. Check your network.";
    const appLoginErrorText = "Your login credentials are incorrect.";

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
        else return "Unknown error."
    }


    const handleLogIn = async () => {
        setLoginText("Signing in...");

        if (!email || !password) {
            toast("Please fill out all necessary fields", { type: "error" });
            setTimeout(() => {
                setLoginText("Sign in");
            }, 3000);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setTimeout(() => {
            setLoginText("Sign In");
            toast("Sign up successful", { type: "success" });
            }, 2500);
            setTimeout(() => {
            Navigate("/home");
            }, 3500);
        } catch (error) {
            toast(`${toastErrorMessageFunction(error)}`, { type: "error" })
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

                <div className="flex flex-col justify-center items-center w-full absolute z-[2] xs:top-[15%] 
                    top-[8%]">

                    <div className="font-semibold md:text-[26px] sm:text-[40px] text-[30px] w-[80%]
                        xs:my-[30px] my-[30px] xs:text-center text-start text-primary navText1">
                        Sign In
                    </div>

                    <div className="flex justify-center items-center w-full">

                        <form 
                            name="cbtForm" 
                            className="flex flex-col justify-center items-center md:w-[32%] sm:w-[40%] 
                                xs:w-[60%] w-[80%]">

                            <div className="xs:mb-[20px] mb-[15px] w-full">
                                <input 
                                    type="email" 
                                    placeholder="Email address" 
                                    name="emailForm" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full text-[16px] p-2 rounded-[7px] bg-slate-100 border-[1px] border-slate-500"/>
                            </div>
                            <div className="xs:mb-[20px] mb-[10px] w-full relative">
                                <input 
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password" 
                                    name="passwordForm" 
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                    className="w-full text-[16px] p-2 rounded-[7px] bg-slate-100 border-[1px] border-slate-500"/>
                                {
                                    passwordVisible 
                                    ? <span 
                                        className="cursor-pointer absolute z-[1] right-[2%] top-[20%] 
                                        opacity-60"
                                        onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                        <AiFillEye name="eye" size={24} color="black" />
                                        </span> 
                                    : <span 
                                        className="cursor-pointer absolute z-[1] right-[2%] top-[20%] 
                                        opacity-60"
                                        onClick={() => {setPasswordVisible(!passwordVisible)}}>
                                        <AiFillEyeInvisible name="eye-with-line" size={24} color="black" />
                                        </span> 
                                }
                            </div>

                            <div className="xxs:text-[16px] text-[14px] xxs:tracking-normal tracking-tighter">
                                Don&apos;t have an account,&nbsp;
                                <span 
                                    onClick={()=>Navigate("/signup")} 
                                    className="text-blue-600 font-semibold cursor-pointer">
                                    sign up here.
                                </span>
                            </div>

                            <div className="mt-[20px]">
                                <div className="mt-4">
                                    <button 
                                        type="button" 
                                        className="bg-blue-600 text-white w-[150px] p-2 rounded-[7px] 
                                        text-[16px]" 
                                        onClick={handleLogIn}>
                                        {loginText}
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

export default Login

