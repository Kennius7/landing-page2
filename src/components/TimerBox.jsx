import { AiOutlineLoading3Quarters } from "react-icons/ai";




// eslint-disable-next-line react/prop-types
export const TimerBox = ({ timeLimit, timeSegment }) => {
    return (
        <>
            {
                timeLimit < 2 || timeLimit === null || isNaN(timeLimit)
                ?   <div className='flex justify-center 
                        items-center rotate'>
                        <AiOutlineLoading3Quarters 
                            size={40} 
                            color="white"/>
                    </div>
                :   <span className="font-poppins font-semibold 
                        text-white text-center sm:text-[40px] 
                        xs:text-[24px] text-[25px]">
                        {timeSegment || "0"}
                    </span>
            }
        </>
    )
}



