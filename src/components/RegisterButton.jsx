import { useNavigate } from "react-router-dom";



function RegisterButton() {
    const Navigate = useNavigate();

    const handleRegister = () => {
        Navigate("/register");
    }

    return (
        <>
            <button onClick={handleRegister}
                className="bg-blue-800 rounded-[17px] md:w-[26%] sm:w-[50%] xs:w-[45%] 
                    w-[50%] sm:h-[45px] xs:h-[40px] h-[35px] box-shadow text-white 
                    hover:border-[2px] focus:border-[2px] hover:border-yellow-700 
                    focus:border-yellow-700 duration-1000 sm:text-[20px] xs:text-[16px] 
                    text-[13px]">
                    Register Now
            </button>
        </>
    )
}

export default RegisterButton