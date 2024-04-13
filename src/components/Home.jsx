import backgroundPics from "../assets/home-bg.webp";
import logo from "../assets/shosanacodemia-logo111.png";
import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import { TimerBox } from "./TimerBox";
import { getFullDayFunction, getFullMonthFunction, getYear, getdateNumber } from "../data";




const Home = () => {
    const { days, hours, minutes, seconds, examTimeLimit, futureDate } = useContext(mainContext);
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
                            {
                                examTimeLimit < 2 || examTimeLimit === null || isNaN(examTimeLimit) 
                                ?   <div className="font-sans font-semibold text-end md:text-[18px] 
                                        sm:text-[17px] xs:text-[13px] text-[11px] text-slate-800 
                                        italic sm:leading-normal xs:leading-[16px] 
                                        leading-[13px]">
                                        Our next online class commencing date will be communicated soon.
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
                            md:mb-[4%] sm:mb-[3%] xs:mb-[4%] mb-[3%]">

                            <div className="font-poppins font-semibold text-center md:text-[39px] 
                                sm:text-[32px] xs:text-[24px] text-[20px] md:max-w-[800px] sm:max-w-[600px] 
                                xs:max-w-[420px] max-w-[320px] md:tracking-[3px] tracking-normal md:mb-[1%] 
                                sm:mb-[1%] xs:mb-[3%] mb-[2%] xs:leading-normal leading-[27px]">
                                Unlock Your Coding Potential with Our Online Programming Classes 
                            </div>
                            <div className="flex flex-wrap justify-center items-center font-poppins font-semibold 
                                text-primary md:mb-[2%] sm:mb-[8%] xs:mb-[14%] mb-[7%] xs:w-full w-[90%]">

                                <div className="text-center sm:text-[20px] xs:text-[16px] text-[16px] 
                                    mr-[10px] xs:tracking-normal tracking-tighter">
                                    Seize this opportunity with a whooping
                                </div>
                                <div className="font-poppins font-semibold text-blue-700 
                                    sm:text-[28px] xs:text-[20px] text-[23px] navText1">
                                    90%
                                </div>
                                &nbsp;
                                <div className="text-center md:w-[250px] sm:w-[230px] xs:w-[180px] w-[180px] 
                                    md:text-[22px] sm:text-[20px] xs:text-[16px] text-[16px] bg-blue-600 
                                    text-yellow-400 rounded-[8px] px-2 py-1 bounce-element xs:ml-[6px] ml-[3px]">
                                    Early Bird discount
                                </div> 
                                <div className="text-center sm:text-[20px] xs:text-[16px] text-[17px] ml-[10px]">
                                    on all courses!
                                </div>

                            </div>

                            <div className="flex justify-center items-center bg-blue-100 rounded-[10px] 
                                border-[1px] border-yellow-500 md:w-[20%] sm:w-[30%] xs:w-[35%] w-[45%]">
                                <div className="font-sans font-bold text-slate-800 sm:text-[26px] 
                                    xs:text-[20px] text-[16px] my-[3px]">
                                    Offer Lasts Till
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-center items-center w-[100%]">

                            <div className="flex justify-around items-center xs:w-[70%] w-[90%]">

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
