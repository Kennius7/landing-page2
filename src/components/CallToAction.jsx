import RegisterButton from "./RegisterButton";
import backgroundPics from "../assets/home-bg.webp";



function CallToAction() {
  return (
    <>
        <div className="w-full relative md:h-[800px] sm:h-[600px] xs:h-[550px] h-[500px]">
            <div className="w-full h-full">
                <img src={backgroundPics} className="w-full h-full object-cover opacity-20" />
            </div>

            <div className="flex flex-col justify-center items-center absolute z-1 top-[10%] left-0">
                <div className="text-center text-[28px] w-[50%]">
                    Ready to transform your life through code? Secure your spot today and embrace a 
                    future filled with endless possibilities!
                </div>
                <div className="flex flex-col justify-center items-center w-full mb-[100px] mt-[20px]">
                    <div className="font-poppins font-semibold text-center md:text-[36px] 
                        sm:text-[35px] xs:text-[26px] text-[22px] md:max-w-[800px] sm:max-w-[600px] 
                        xs:max-w-[400px] max-w-[320px] xs:mb-[3%] 
                        mb-[12%] xs:leading-normal leading-[27px]">
                        Enroll Now for a Coding Revolution!
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <RegisterButton/>
                    </div>
                </div>
                <div className="text-center text-[23px] w-[40%]">
                    Don&apos;t miss out on the opportunity to shape your destiny in the digital realm. 
                    Join our online programming classes and unlock the doors to a world of endless opportunities!
                </div>
            </div>
        </div>
    </>
  )
}

export default CallToAction