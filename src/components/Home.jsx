import backgroundPics from "../assets/home-bg.webp";
import logo from "../assets/shosanacodemia-logo111.png";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import RegisterButton from "./RegisterButton";



const Home = () => {
    const { days, hours, minutes, seconds } = useContext(mainContext);
    // 🚀🚀🚀

    return (
        <>
            <div className="w-full relative sm:h-[600px] xs:h-[500px] h-[400px]">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover opacity-40" />
                </div>

                <div className="absolute z-1 top-0 left-0 flex flex-col justify-start items-start w-full h-full">

                    <div className="w-full flex justify-between items-center md:mb-[60px] sm:mb-[30px] 
                        xs:mb-[40px] mb-[20px] sm:p-4 p-1">
                        <div className="flex justify-start items-center">
                            <img 
                                src={logo}
                                alt="logo" 
                                className="md:w-[40px] md:h-[40px] sm:w-[35px] sm:h-[35px] 
                                    xs:w-[30px] xs:h-[30px] w-[24px] h-[24px] rounded-[50%]" 
                            />
                            <div className="font-poppins font-semibold text-start md:text-[22px] sm:text-[20px] 
                                xs:text-[16px] text-[13px] sm:pl-[10px] pl-[6px]">
                                Shosan Code Hub
                            </div>
                        </div>
                        <div>
                            <div className="text-end sm:text-[16px] xs:text-[13px] text-[10px]">
                                Registration for January batch <br className={`md:hidden block`}/> 
                                ends on the 31th of January 2024
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">

                        <div className="w-full flex flex-col justify-center items-center 
                            md:mb-[4%] sm:mb-[10%] xs:mb-[12%] mb-[13%]">

                            <div className="font-poppins font-semibold text-center md:text-[39px] 
                                sm:text-[32px] xs:text-[24px] text-[20px] md:max-w-[800px] sm:max-w-[600px] 
                                xs:max-w-[380px] max-w-[320px] md:tracking-[3px] tracking-normal md:mb-[1%] 
                                sm:mb-[1%] xs:mb-[3%] mb-[2%] xs:leading-normal leading-[27px]">
                                Unlock Your Coding Potential with Our Online Programming Classes 
                            </div>
                            <div className="font-poppins font-semibold text-primary text-center 
                                sm:text-[20px] xs:text-[16px] text-[14px] md:mb-[1%] sm:mb-[2%] xs:mb-[3%] 
                                mb-[4%] xs:w-full w-[82%]">
                                Seize this opportunity with a&nbsp;
                                <span className="font-poppins font-semibold text-blue-700 
                                    sm:text-[28px] xs:text-[20px] text-[16px]">
                                    70%
                                </span> discount on all courses!
                            </div>
                            <div className="flex justify-center items-center md:w-full sm:w-[80%] w-[96%]">
                                <RegisterButton/>
                            </div>

                        </div>

                        <div className="flex justify-center items-center w-[100%]">

                            <div className="flex justify-around items-center xs:w-[70%] w-[90%]">

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] sm:w-[100px] 
                                        sm:h-[100px] xs:w-[70px] xs:h-[70px] w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {days}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-bold 
                                        sm:text-[18px] xs:text-[13px] text-[12px] mt-[10px]">
                                        DAY<span className={`${days === 0 || days === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] sm:w-[100px] 
                                        sm:h-[100px] xs:w-[70px] xs:h-[70px] w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {hours}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-bold 
                                        sm:text-[18px] xs:text-[13px] text-[12px] mt-[10px]">
                                        HOUR<span className={`${hours === 0 || hours === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] sm:w-[100px] 
                                        sm:h-[100px] xs:w-[70px] xs:h-[70px] w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {minutes}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-bold 
                                        sm:text-[18px] xs:text-[13px] text-[12px] mt-[10px]">
                                        MINUTE<span className={`${minutes === 0 || minutes === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] sm:w-[100px] 
                                        sm:h-[100px] xs:w-[70px] xs:h-[70px] w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {seconds}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-bold 
                                        sm:text-[18px] xs:text-[13px] text-[12px] mt-[10px]">
                                        SECOND<span className={`${seconds === 0 || seconds === 1 ? "hidden" : "block"}`}>S</span>
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

export default Home
