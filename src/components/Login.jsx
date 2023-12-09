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
            {/* <div className="relative flex justify-center items-center overflow-hidden w-full h-[100vh]">
                
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

            </div> */}
        </>
    )
}

export default Login

