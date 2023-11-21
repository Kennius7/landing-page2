



function CourseList() {

    const courses = [
        { id: 0, name: 'Web Design Basics', formerPrice: "100,000", price: "30,000", duration: '4 weeks', },
        { id: 1, name: 'Advanced Web Design', formerPrice: "200,000", price: "40,000", duration: '4 weeks', },
        { id: 2, name: 'Front End Development (React)', formerPrice: "300,000", price: "50,000", duration: '8 weeks', },
        { id: 3, name: 'Back End Development (Node.js)', formerPrice: "300,000", price: "50,000", duration: '8 weeks', },
        { id: 4, name: 'Python Programming Language', formerPrice: "200,000", price: "40,000", duration: '6 weeks', },
    ];


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-slate-50 w-full h-[600px]">
                <div className="font-poppins font-semibold w-[95%] text-start text-[30px]">
                    Course List
                </div>
                <table className="w-[95%]">
                    <thead className="w-full">
                        <tr className="bg-blue-200 h-[60px]">
                            <th className="font-poppins text-start text-[20px]">S/N</th>
                            <th className="font-poppins text-start text-[22px]">Course</th>
                            <th className="font-poppins text-start text-[22px]">Former Price</th>
                            <th className="font-poppins text-start text-[22px]">Price</th>
                            <th className="font-poppins text-start text-[22px]">*Duration</th>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-slate-100">
                        {courses.map((course) => (
                            <tr 
                                key={course.id} 
                                className={`bg-yellow-100 h-[50px]
                                    ${course.id === course.length - 1 ? "mb-0" : "mb-[20px]"}`}>

                                <td className="font-poppins text-start text-[20px] w-[5%] pl-[10px]">
                                    {course.id + 1}
                                </td>
                                <td className="font-poppins text-start text-[20px] w-[50%]">
                                    {course.name}
                                </td>
                                <td className="font-mono text-start text-[20px] w-[15%] line-through italic">
                                    N{course.formerPrice}
                                </td>
                                <td className="font-mono text-start text-[20px] w-[15%] italic">
                                    N{course.price}
                                </td>
                                <td className="font-poppins text-start text-[20px] w-[15%]">
                                    {course.duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start items-center mt-[20px] w-[95%] h-[40px]">
                    <div className="font-sans italic text-start font-semibold w-[80%] text-[16px]">
                        <span className="font-bold text-[22px]">*</span>
                        The duration is based on a 6 hour weekly schedule, either during the weekdays 
                        or the weekend. You can freely negotiate a personalized schedule just for you.
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseList


