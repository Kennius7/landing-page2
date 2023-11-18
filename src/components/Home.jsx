import backgroundPics from "../assets/home-bg.webp";
import logo from "../assets/shosanacodemia-logo111.png";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";


const Home = () => {
    const { days, hours, minutes, seconds } = useContext(mainContext);
    // 🚀🚀🚀

    return (
        <>
            <div className="w-full relative sm:h-[600px] xs:h-[550px] h-[500px]">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover opacity-40" />
                </div>

                <div className="absolute z-1 top-0 left-0 flex flex-col justify-start items-start w-full h-full">
                    <div className="w-full flex justify-between items-center mb-[80px] sm:p-4 p-1">
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
                        <div className="sm:mb-[6%] xs:mb-[20%] mb-[30%]">
                            <div className="font-poppins font-semibold text-center md:text-[40px] 
                                sm:text-[35px] xs:text-[26px] text-[22px] md:max-w-[800px] sm:max-w-[600px] 
                                xs:max-w-[400px] max-w-[320px] md:tracking-[3px] tracking-normal xs:mb-[6%] 
                                mb-[12%] xs:leading-normal leading-[27px]">
                                Unlock Your Coding Potential with Our Online Programming Classes 
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <button className="bg-blue-800 rounded-[17px] sm:w-[30%] xs:w-[45%] 
                                    w-[50%] sm:h-[45px] xs:h-[40px] h-[35px] box-shadow text-white 
                                    hover:border-[2px] focus:border-[2px] hover:border-yellow-700 
                                    focus:border-yellow-700 duration-1000 sm:text-[20px] xs:text-[16px] 
                                    text-[13px]">
                                        Register Now
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-[100%]">

                            <div className="flex justify-around items-center xs:w-[70%] w-[90%]">

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] sm:w-[100px] sm:h-[100px] xs:w-[70px] xs:h-[70px] 
                                        w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {days}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold 
                                        sm:text-[18px] xs:text-[13px] text-[12px]">
                                        DAY<span className={`${days === 0 || days === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] sm:w-[100px] sm:h-[100px] xs:w-[70px] xs:h-[70px] 
                                        w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {hours}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold 
                                        sm:text-[18px] xs:text-[13px] text-[12px]">
                                        HOUR<span className={`${hours === 0 || hours === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] sm:w-[100px] sm:h-[100px] xs:w-[70px] xs:h-[70px] 
                                        w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {minutes}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold 
                                        sm:text-[18px] xs:text-[13px] text-[12px]">
                                        MINUTE<span className={`${minutes === 0 || minutes === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] sm:w-[100px] sm:h-[100px] xs:w-[70px] xs:h-[70px] 
                                        w-[60px] h-[60px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center sm:text-[40px] xs:text-[24px] text-[25px]">
                                            {seconds}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold 
                                        sm:text-[18px] xs:text-[13px] text-[12px]">
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