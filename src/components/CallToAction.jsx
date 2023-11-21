import RegisterButton from "./RegisterButton";
import backgroundPics from "../assets/home-bg.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function CallToAction() {
    const Navigate = useNavigate();
    const passwordAdmin = "Shosanboggs7#";
    const [clicked, setClicked] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");

    const handleChange = (e) => {
        setAdminPassword(() => e.target.value);
    }
    const handleAdminClick = () => {
        setClicked(!clicked);
    }

    const handleSubmit = () => {
        adminPassword === passwordAdmin 
            ? Navigate("/dashboard") 
            : console.log(adminPassword);
        
        setClicked(!clicked);
    }




  return (
    <>
        <div className="w-full relative md:h-[800px] sm:h-[600px] xs:h-[550px] h-[500px]">
            <div className="w-full h-full">
                <img src={backgroundPics} className="w-full h-full object-cover opacity-20" />
            </div>

            <div className="flex flex-col justify-center items-center absolute z-1 top-[10%] left-0">
                <div className="text-center text-[28px] w-[50%]">
                    Ready to transform your life through code? Secure your spot today and embrace a 
                    future filled with endless possibilities!
                </div>
                <div className="flex flex-col justify-center items-center w-full mb-[100px] mt-[20px]">
                    <div className="font-poppins font-semibold text-center md:text-[36px] 
                        sm:text-[35px] xs:text-[26px] text-[22px] md:max-w-[800px] sm:max-w-[600px] 
                        xs:max-w-[400px] max-w-[320px] xs:mb-[3%] 
                        mb-[12%] xs:leading-normal leading-[27px]">
                        Enroll Now for a Coding Revolution!
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <RegisterButton/>
                    </div>
                </div>
                <div className="text-center text-[23px] w-[40%]">
                    Don&apos;t miss out on the opportunity to shape your destiny in the digital realm. 
                    Join our online programming classes and unlock the doors to a world of endless opportunities!
                </div>
            </div>

            <div className="absolute z-2 bottom-1 right-1 cursor-pointer flex flex-col justify-center items-end">
                <div 
                    onClick={handleAdminClick} 
                    className={`${clicked ? "text-slate-300" : "text-slate-50"}`}>
                    Admin Login
                </div>
                <input 
                    type="password" 
                    name="password" 
                    value={adminPassword}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`border-[1px] border-slate-400 w-[150px] h-[20px] placeholder:text-slate-400
                    placeholder:text-end placeholder:text-[12px] text-[12px]
                    ${clicked ? "block" : "hidden"}`}>
                </input>
                <button 
                    onClick={handleSubmit}
                    className={`border-[1px] border-slate-400 text-end text-slate-400 text-[12px] 
                    w-[150px] h-[20px] 
                    ${clicked ? "block" : "hidden"}`}>
                    Submit
                </button>
            </div>
        </div>
    </>
  )
}

export default CallToAction