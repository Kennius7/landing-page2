import backgroundPics from "../assets/home-bg.webp";
import logo from "../assets/shosanacodemia-logo111.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/mainContext";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TimerBox } from "./TimerBox";
import { getFullDayFunction, getFullMonthFunction, getYear, getdateNumber } from "../data";




const Home = () => {
    const { days, hours, minutes, seconds, examTimeLimit, futureDate } = useContext(mainContext);
    const Navigate = useNavigate();
    // 🚀🚀🚀

    return (
        <>
            <div className="w-full relative md:h-[380px] sm:h-[450px] xs:h-[370px] h-[300px]">
                <div className="w-full h-full">
                    <img src={backgroundPics} className="w-full h-full object-cover opacity-40" />
                </div>

                <div className="absolute z-1 top-0 left-0 flex flex-col justify-start items-start 
                    w-full h-full">
                    <div className="w-full flex justify-between items-center mb-[40px] md:p-2 sm:p-4 p-1">
                        <div 
                            onClick={()=>Navigate("/")} 
                            className="flex justify-start items-center cursor-pointer">
                            <img 
                                src={logo}
                                alt="logo" 
                                className="md:w-[30px] md:h-[30px] sm:w-[35px] sm:h-[35px] 
                                    xs:w-[30px] xs:h-[30px] w-[24px] h-[24px] rounded-[50%]" 
                            />
                            <div className="font-poppins font-semibold text-start md:text-[18px] sm:text-[20px] 
                                xs:text-[16px] text-[13px] sm:pl-[10px] pl-[6px]">
                                Shosan Code Hub
                            </div>
                        </div>
                        <div>
                            {
                                examTimeLimit < 2 || examTimeLimit === null || isNaN(examTimeLimit) 
                                ?   <div className="font-sans font-semibold text-end md:text-[18px] 
                                        sm:text-[17px] xs:text-[13px] text-[11px] text-slate-800 
                                        italic sm:leading-normal xs:leading-[16px] 
                                        leading-[13px]">
                                        Our next online class commencing
                                        <br className="sm:hidden block"/>
                                        &nbsp;date will be communicated soon.
                                    </div> 
                                :   <div className="font-sans font-semibold text-end md:text-[18px] 
                                        sm:text-[17px] xs:text-[13px] text-[11px] text-slate-800 
                                        italic sm:leading-normal xs:leading-[16px] 
                                        leading-[13px]">
                                        Our next online class commencing date is on {getFullDayFunction(futureDate)},&nbsp;
                                        <br className={`md:hidden block`}/>
                                        the {getdateNumber(futureDate)}th 
                                        of {getFullMonthFunction(futureDate)}, {getYear(futureDate)}&nbsp;
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">

                        <div className="w-full flex flex-col justify-center items-center 
                            md:mb-[2%] sm:mb-[6%] xs:mb-[3%] mb-[2%]">
                            <div className="font-poppins font-semibold text-center md:text-[40px] text-slate-800
                                sm:text-[35px] xs:text-[26px] text-[22px] md:max-w-[800px] sm:max-w-[600px] 
                                xs:max-w-[400px] max-w-[320px] md:mb-[1%] xs:mb-[3%] mb-[4%]">
                                Choose your programming journey 
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-full sm:mt-0 xs:mt-[20px] mt-[25px]">

                            <div className="flex justify-around items-center sm:w-[70%] xs:w-[80%] w-[90%]">

                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex justify-center items-center bg-primary box-shadow 
                                        border-yellow-400 border-[1px] rounded-[20%] sm:w-[100px] 
                                        sm:h-[100px] xs:w-[70px] xs:h-[70px] w-[60px] h-[60px]">
                                        <TimerBox timeLimit={examTimeLimit} timeSegment={days}/>
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
                                        <TimerBox timeLimit={examTimeLimit} timeSegment={hours}/>
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
                                        <TimerBox timeLimit={examTimeLimit} timeSegment={minutes}/>
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
                                        <TimerBox timeLimit={examTimeLimit} timeSegment={seconds}/>
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
