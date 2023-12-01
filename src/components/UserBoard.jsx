import logo from "../assets/shosanacodemia-logo111.png";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Charts from "./Charts";



function UserBoard() {

    // const { navLinks, active, setActive, toggle, setToggle, blogAdminUid, auth } = useContext(NavContext);
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

    const getUserInitials = () => {
        // eslint-disable-next-line no-undef
        const initials = displayName.split(" ").map(name => name[0].toUpperCase()).join("");
        // console.log(`The user's initials are ${initials}`);
        return initials;
    }


    return (
        <>
            <div>
                <div className="flex justify-between items-center relative w-full h-[50px] bg-slate-200 mb-[30px]">

                    <div className="flex justify-start items-center">
                        <img 
                            src={logo}
                            alt="logo" 
                            className="md:w-[35px] md:h-[35px] sm:w-[35px] sm:h-[35px] 
                                xs:w-[30px] xs:h-[30px] w-[24px] h-[24px] rounded-[50%]" 
                        />
                        <div className="font-poppins font-semibold text-start md:text-[16px] sm:text-[20px] 
                            xs:text-[16px] text-[13px] sm:pl-[10px] pl-[6px]">
                            Shosan Code Hub
                        </div>
                    </div>

                    <div className="flex justify-around items-center mr-3">
                        <div className={`flex justify-center items-center hover:text-yellow-300 font-bold 
                            rounded-[50%] duration-500 cursor-pointer bg-red-700 p-1 mr-2 text-blue-300`}>
                            {"KO" || getUserInitials()}
                        </div>
    
                        <div className="flex ml-2">
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
                            <div className={`flex flex-col justify-start items-start absolute z-1 -bottom-[110%] 
                                right-[1%] bg-yellow-200 rounded-[7px] w-[120px] h-[60px] pl-1 pt-1 
                                ${caretVisible ? "block" : "hidden"}`}>
                                <div className="w-[80px] h-[30px]">
                                    <button className="bg-slate-200 rounded-[7px] border-[1px] 
                                        border-red-700 text-center text-[14px] w-full h-full">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-[50%] h-[200px]">
                    <Charts />
                </div>
            </div>
        </>
    )
}


export default UserBoard
