import courses from "../data";


function CourseList() {

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-slate-50 w-full sm:h-[1200px] 
                xs:h-[400px] h-[350px]">

                <div className="font-poppins font-semibold text-start sm:w-[95%] xs:w-[98%] w-[99%] 
                    sm:text-[30px] xs:text-[25px] text-[18px] mb-[20px]">
                    Course Information Brochure
                    <hr className="bg-primary w-full h-[2px]"/>
                </div>

                <div className="flex justify-center items-center w-full mb-[30px]">
                    <ul className="flex flex-wrap justify-between items-center w-[90%]">
                        {
                            courses.map((course) => (
                                <li key={course.id} 
                                    className="flex flex-col justify-center items-start w-[45%] my-[20px]">
                                    <div className="flex justify-start items-center">
                                        <img 
                                            src={course.picsRep} 
                                            alt={course.alt} 
                                            className="w-[40px] h-[40px] m-1" />
                                        <div className="font-semibold font-sans text-[22px]">
                                            {course.name}
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center w-full">
                                        <div className="font-sans italic ml-[40px] w-[90%] text-[16px]">
                                            {course.description}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <table className="sm:w-[95%] xs:w-[98%] w-[99%]">
                    <thead className="w-full">
                        <tr className="bg-blue-100 sm:h-[60px] xs:h-[40px] h-[28px]">
                            <th className="font-semibold text-start sm:text-[20px] xs:text-[12px] text-[10px]">S/N</th>
                            <th className="font-semibold text-start sm:text-[22px] xs:text-[13px] text-[11px]">Course</th>
                            <th className="font-semibold text-start sm:text-[22px] xs:text-[13px] text-[11px]">Old Price</th>
                            <th className="font-semibold text-start sm:text-[22px] xs:text-[13px] text-[11px]">New Price</th>
                            <th className="font-semibold text-start sm:text-[22px] xs:text-[13px] text-[11px]">*Duration</th>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-slate-100">
                        {courses.map((course) => (
                            <tr 
                                key={course.id} 
                                className={`bg-yellow-100 sm:h-[50px] xs:h-[30px] h-[25px] border-[1px] border-slate-300
                                    ${course.id === course.length - 1 
                                        ? "mb-0" 
                                        : "sm:mb-[20px] xs:mb-[10px] mb-[20px]"}`}>

                                <td className="font-poppins text-start sm:text-[20px] xs:text-[12px] text-[12px] 
                                    xs:w-[5%] w-[3%] sm:pl-[10px] xs:pl-[2px] pl-[1px]">
                                    {course.id + 1}
                                </td>
                                <td className="text-start sm:text-[20px] xs:text-[13px] text-[11px] 
                                    xs:w-[50%] w-[49%]">
                                    {course.name}
                                </td>
                                <td className="font-mono text-start sm:text-[20px] xs:text-[14px] text-[12px] 
                                    xs:w-[15%] w-[20%] line-through italic">
                                    N{course.formerPrice}
                                </td>
                                <td className="font-mono text-start sm:text-[20px] xs:text-[14px] text-[12px] 
                                    xs:w-[15%] w-[18%] italic">
                                    N{course.price}
                                </td>
                                <td className="font-poppins text-start sm:text-[20px] xs:text-[13px] text-[11px] 
                                    xs:w-[15%] w-[10%]">
                                    {course.duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-start items-center sm:mt-[20px] xs:mt-[5px] mt-[2px] w-[95%] h-[40px]">
                    <div className="font-sans italic text-start sm:font-semibold font-normal w-[94%] sm:text-[16px] 
                        xs:text-[12px] text-[11px]">
                        <span className="font-bold sm:text-[22px] xs:text-[18px] text-[15px]">*</span>
                        The duration is based on a 6 hour weekly schedule, either during the weekdays 
                        or the weekend. You can freely negotiate a personalized schedule just for you.
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseList


