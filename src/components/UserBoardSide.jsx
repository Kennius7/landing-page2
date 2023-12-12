import { useContext } from "react"
import { sideBarData } from "../data"
import { mainContext } from "../context/mainContext";




function UserBoardSide() {
    const { active, setActive } = useContext(mainContext);


    return (
        <>
            <div className="flex flex-col w-full h-full bg-slate-100">
                {
                    sideBarData.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setActive(item.name)}
                            className={`flex justify-start items-center cursor-pointer rounded-[6px] 
                            duration-500 xs:w-[96%] w-[96%] sm:h-[40px] h-[33px] my-[4px] pl-[10px] 
                            sm:ml-[6px] ml-[3px] sm:text-[16px] text-[14px]
                            ${active === item.name ? "bg-blue-200/50" : "bg-blue-200/20"}`}>
                            {item.name}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default UserBoardSide