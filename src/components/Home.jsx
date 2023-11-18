import backgroundPics from "../assets/home-bg.webp";
import logo from "../assets/shosanacodemia-logo111.png";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";


const Home = () => {
    const { days, hours, minutes, seconds } = useContext(mainContext);
    // 🚀🚀🚀

    return (
        <>
            <div className="w-full h-[600px] relative">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover opacity-40" />
                </div>

                <div className="absolute z-1 top-0 left-0 flex flex-col justify-start items-start w-full h-full">
                    <div className="w-full flex justify-between items-center mb-[80px] p-4">
                        <div className="flex justify-start items-center">
                            <img 
                                src={logo}
                                alt="logo" 
                                className="w-[40px] h-[40px] rounded-[50%]" 
                            />
                            <div className="font-poppins font-semibold text-start text-[22px] pl-[10px]">
                                Shosan Code Hub
                            </div>
                        </div>
                        <div>
                            <div className={`italic`}>
                                Registration for January Batch ends on the 31th of January 2024
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="mb-[6%]">
                            <div className="font-poppins font-semibold text-center text-[40px] max-w-[800px] 
                                tracking-[3px] mb-[6%]">
                                Unlock Your Coding Potential with Our Online Programming Classes 
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <button className="bg-blue-800 rounded-[17px] w-[30%] h-[45px] box-shadow
                                    text-[20px] text-white hover:border-[2px] focus:border-[2px] 
                                    hover:border-yellow-700 focus:border-yellow-700 duration-1000">
                                        Register Now
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-[100%]">

                            <div className="flex justify-around items-center w-[70%]">

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] w-[100px] h-[100px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center text-[40px]">
                                            {days}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold text-[18px]">
                                        DAY<span className={`${days === 0 || days === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] w-[100px] h-[100px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center text-[40px]">
                                            {hours}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold text-[18px]">
                                        HOUR<span className={`${hours === 0 || hours === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] w-[100px] h-[100px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center text-[40px]">
                                            {minutes}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold text-[18px]">
                                        MINUTE<span className={`${minutes === 0 || minutes === 1 ? "hidden" : "block"}`}>S</span>
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary 
                                        rounded-[20%] w-[100px] h-[100px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center text-[40px]">
                                            {seconds}
                                        </span>
                                    </div>
                                    <span className="flex justify-center items-center font-semibold text-[18px]">
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
