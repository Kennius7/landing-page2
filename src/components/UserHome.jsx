import { RegHomeUser } from "../components";
import Charts from "./Charts";
import courses from "../data";



function UserHome() {
  return (
    <>
      <div className="w-full h-full">

        <div className="w-full">
          <RegHomeUser/>
        </div>

        <div className="flex justify-start items-end w-full">
          <div className="font-semibold text-slate-700 text-start md:text-[30px] sm:text-[40px] 
            xs:text-[30px] text-[25px]">
            Hello, Guest.
          </div>
        </div>
        <div className="flex justify-center items-start w-full">
          <div className="w-[40%]">
            <Charts />
          </div>
          <div className="flex justify-center items-center w-[60%] mb-[30px] bg-red-200">
            <ul className="flex flex-col justify-between items-center w-full">
                {
                    courses.map((course) => (
                        <li key={course.id} 
                            className="flex flex-col justify-center items-start md:w-[98%] sm:w-[49%] 
                            w-[98%] xs:mb-[20px] mb-[30px]">
                            <div className="flex justify-start items-center">
                                <img 
                                    src={course.picsRep} 
                                    alt={course.alt} 
                                    className="w-[30px] h-[30px] m-1" />
                                <div className="font-semibold font-sans md:text-[22px] sm:text-[20px] 
                                    xs:text-[19px] text-[17px]">
                                    {course.name}
                                </div>
                            </div>
                            <div className="flex justify-start items-center w-full">
                                <div className="font-sans italic -tracking-[0.5px] leading-[16px] 
                                  md:w-[96%] sm:w-[98%] xs:w-[90%] w-[94%] md:text-[14px] 
                                  xs:text-[16px] text-[14px] xs:ml-[40px] ml-[20px]">
                                    {course.description}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
          </div>
        </div>
        
        

      </div>
    </>
  )
}

export default UserHome