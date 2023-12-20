import backgroundPics from "../assets/home-bg.webp";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";




const Home = () => {
    const { days, hours, minutes, seconds } = useContext(mainContext);

    return (
        <>
            <div className="w-full relative md:h-[320px] sm:h-[350px] xs:h-[260px] h-[260px]">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover opacity-40" />
                </div>

                <div className="flex flex-col justify-start items-start absolute z-[1] md:top-[30%] 
                    sm:top-[35%] xs:top-[18%] top-[15%] left-0 w-full h-full">

                    <div className="w-full flex flex-col justify-around items-center md:h-[220px] 
                        sm:h-[200px] xs:h-[220px] h-[270px]">

                        <div className="w-full flex justify-center items-center">
                            <div className="font-poppins xs:font-semibold font-bold text-center md:text-[38px] 
                                sm:text-[28px] xs:text-[23px] text-[21px] md:w-full sm:w-[98%] 
                                xs:w-[70%] w-[98%] xs:leading-none leading-[25px] xs:tracking-normal 
                                -tracking-[1px] text-slate-800">
                                Countdown to our January Classes
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-full sm:mt-0 xs:-mt-[30px] -mt-[30%]">

                            <div className="flex justify-around items-center md:w-[70%] sm:w-[80%] 
                                xs:w-[80%] w-[90%]">

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] md:w-[80px] 
                                        md:h-[80px] sm:w-[85px] sm:h-[85px] xs:w-[60px] xs:h-[60px] 
                                        w-[55px] h-[55px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center md:text-[32px] sm:text-[36px] xs:text-[24px] text-[22px]">
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
                                        border-yellow-400 border-[1px] rounded-[20%] md:w-[80px] 
                                        md:h-[80px] sm:w-[85px] sm:h-[85px] xs:w-[60px] xs:h-[60px] 
                                        w-[55px] h-[55px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center md:text-[32px] sm:text-[36px] xs:text-[24px] text-[22px]">
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
                                        border-yellow-400 border-[1px] rounded-[20%] md:w-[80px] 
                                        md:h-[80px] sm:w-[85px] sm:h-[85px] xs:w-[60px] xs:h-[60px] 
                                        w-[55px] h-[55px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center md:text-[32px] sm:text-[36px] xs:text-[24px] text-[22px]">
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
                                        border-yellow-400 border-[1px] rounded-[20%] md:w-[80px] 
                                        md:h-[80px] sm:w-[85px] sm:h-[85px] xs:w-[60px] xs:h-[60px] 
                                        w-[55px] h-[55px]">
                                        <span className="font-poppins font-semibold text-white 
                                            text-center md:text-[32px] sm:text-[36px] xs:text-[24px] text-[22px]">
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
