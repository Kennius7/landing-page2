import logo from "../assets/shosanacodemia-logo111.png";
import { useState, useContext } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { mainContext } from "../context/mainContext";
import { UserBoardSide, UserContent, UserCourses, UserHome, UserProfile } from "./index";
import { rightDropDownData } from "../data";




function UserBoard() {

    const { active } = useContext(mainContext);
    // const [currentlyLoggedInUser] = useAuthState(auth);
    // const [user] = useAuthState(auth);
    // const location = useLocation();
    // const Navigate = useNavigate();
    const user = "";

    // eslint-disable-next-line no-undef
    const displayName = user?.displayName || "a d";
    // eslint-disable-next-line no-unused-vars
    const [initialsVisible, setInitialsVisible] = useState(false);
    const [caretVisible, setCaretVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [checkText, setCheckText] = useState("Checking...");

    const getUserInitials = () => {
        // eslint-disable-next-line no-undef
        const initials = displayName.split(" ").map(name => name[0].toUpperCase()).join("");
        // console.log(`The user's initials are ${initials}`);
        return initials;
    }


    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-[100dvh]">
                <div className="flex justify-between items-center relative w-full h-[50px] 
                    bg-slate-200">

                    <div className="flex justify-start items-center ml-[6px] md:w-[94%] xs:w-[90%] w-[87%]">
                        <div className="xs:hidden block bounce-element2">
                            {
                                menuVisible 
                                ? <AiOutlineMenuUnfold 
                                    size={20} 
                                    color="brown" 
                                    onClick={() => setMenuVisible(!menuVisible)} /> 
                                : <AiOutlineMenuFold
                                    size={20} 
                                    color="brown" 
                                    onClick={() => setMenuVisible(!menuVisible)} />
                            }
                        </div>
                        <img 
                            src={logo}
                            alt="logo" 
                            className="md:w-[35px] md:h-[35px] sm:w-[35px] sm:h-[35px] 
                                xs:w-[30px] xs:h-[30px] w-[24px] h-[24px] rounded-[50%] xs:ml-0 ml-[5px]" 
                        />
                        <div className="font-poppins font-semibold text-start xs:tracking-normal 
                            tracking-tighter md:text-[18px] sm:text-[20px] xs:text-[16px] 
                            text-[15px] sm:pl-[10px] pl-[6px]">
                            Shosan Code Hub
                        </div>
                    </div>

                    <div className="flex justify-around items-center md:w-[6%] xs:w-[10%] w-[13%]">

                        <div className={`flex justify-center items-center hover:text-yellow-300 font-bold 
                            rounded-[50%] duration-500 cursor-pointer bg-red-700 text-blue-300 
                            xs:p-2 p-0 xs:text-[16px] text-[14px] sm:w-[35px] sm:h-[35px] xs:w-[30px] xs:h-[30px] 
                            w-[26px] h-[26px]`}>
                            {"KO" || getUserInitials()}
                        </div>
    
                        <div className="">
                            <div className="cursor-pointer">
                                {
                                    caretVisible 
                                    ? <AiFillCaretDown 
                                        size={18} 
                                        color="brown" 
                                        onClick={() => setCaretVisible(!caretVisible)} /> 
                                    : <AiFillCaretUp 
                                        size={18} 
                                        color="brown" 
                                        onClick={() => setCaretVisible(!caretVisible)} />
                                }
                            </div>
                            <div className={`flex flex-col justify-center items-center absolute z-1 top-[105%] 
                                right-[1%] bg-slate-100 rounded-[7px] w-[13%] 
                                ${caretVisible ? "block" : "hidden"}`}>
                                {
                                    rightDropDownData.map((item)=> (
                                        <div 
                                            key={item.id} 
                                            onClick={() => setCheckText(item.name)}
                                            className="cursor-pointer bg-slate-200 rounded-[7px] text-end 
                                            text-[12px] pr-2 py-[4px] w-[96%] h-[30px] my-1">
                                            {item.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-row items-start relative w-full h-[92%]">
                    <div className={`xs:static absolute z-1 top-0 left-0 sm:w-[20%] xs:w-[30%] w-[50%] h-full 
                        sidebar duration-[2] ${!menuVisible ? "xs:block hidden" : "block"}`}>
                        <UserBoardSide />
                    </div>
                    <div className="sm:w-[80%] xs:w-[70%] w-full h-[50%]">
                        <div className={`w-full ${active === "Home" ? "block" : "hidden"}`}>
                            <UserHome />
                        </div>
                        <div className={`w-full ${active === "Profile" ? "block" : "hidden"}`}>
                            <UserProfile />
                        </div>
                        <div className={`w-full ${active === "Courses" ? "block" : "hidden"}`}>
                            <UserCourses />
                        </div>
                        <div className={`w-full ${active === "Content" ? "block" : "hidden"}`}>
                            <UserContent />
                        </div>
                    </div>
                </div>
                <div>{checkText}</div>
            </div>
        </>
    )
}


export default UserBoard
