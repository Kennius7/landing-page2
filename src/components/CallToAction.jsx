import RegisterButton from "./RegisterButton";
import backgroundPics from "../assets/cta-bg.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { password } from "../data";



function CallToAction() {
    const Navigate = useNavigate();
    const passwordAdmin = password;
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
            <div className="w-full relative bg-slate-200 md:h-[700px] sm:h-[600px] xs:h-[500px] h-[500px]">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover object-bottom opacity-20" />
                </div>

                <div className="flex flex-col justify-between items-center absolute z-1 top-[10%] left-0 
                    w-full md:h-[80%] sm:h-[75%] xs:h-[85%] h-[80%]">
                    <div className="font-sans font-semibold text-center md:text-[22px] sm:text-[18px] 
                        xs:text-[16px] text-[15px] md:w-[55%] sm:w-[60%] xs:w-[80%] w-[95%]">
                        The world is ever changing so fast. drifting towards the tech zeitgeist. 
                        Position yourself now and equip yourself to compete with the greats in tech 
                        and embrace a future filled with endless possibilities!
                    </div>

                    <div className="flex flex-col justify-center items-center w-full md:h-[200px] sm:h-[150px] 
                        bg-blue-100/20 h-[200px]">
                        <div className="font-poppins font-semibold text-center md:text-[36px] 
                            sm:text-[30px] xs:text-[24px] text-[20px] md:max-w-[800px] sm:max-w-[700px] 
                            xs:max-w-[500px] max-w-[320px] xs:mb-0 mb-[10px]">
                            Enroll Now for a Coding Transformation!
                        </div>
                        <div className="font-poppins text-center font-semibold text-primary 
                            md:text-[22px] sm:text-[20px] xs:text-[15px] text-[13px] xs:w-full w-[90%] mb-[30px]">
                            Seize this opportunity with a whooping&nbsp;
                            <span className="font-poppins font-semibold text-blue-700 sm:text-[24px] 
                                xs:text-[18px] text-[16px]">
                                90%
                            </span> discount on all courses this season!
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <RegisterButton/>
                        </div>
                    </div>

                    <div className="font-sans font-semibold text-center italic md:text-[20px] 
                        sm:text-[18px] xs:text-[16px] text-[14px] md:w-[40%] sm:w-[60%] xs:w-[80%] 
                        w-[90%] sm:mt-0 mt-[20px]">
                        Don&apos;t miss out on the opportunity to shape your destiny in the digital realm. 
                        Join our online programming classes and become a master of code!
                    </div>
                </div>

                <div className="absolute z-2 bottom-1 right-1 cursor-pointer flex flex-col justify-center 
                    items-end opacity-30">
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

