import introPics from "../assets/intro-bg.webp";



const Intro = () => {
    return (
        <>
            <div className="flex justify-around items-center w-full md:h-[700px] sm:h-[600px] 
                xs:h-[500px] h-[400px]">
                <div className="bg-style w-full h-full flex justify-around items-center">
                    <div className="relative flex sm:flex-row flex-col sm:justify-around justify-center 
                        items-center">
                        <div className="flex justify-center items-center box-shadow rounded-[10px] 
                            overflow-hidden md:w-[550px] md:h-[450px] sm:w-[400px] sm:h-[350px] 
                            xs:w-[400px] xs:h-[250px] w-[90%] h-[180px]">
                            <img 
                                src={introPics} 
                                alt="intro pics" 
                                className="w-full h-full  object-cover" 
                            />
                        </div>
                        <div className="flex justify-center items-center sm:w-[40%] xs:w-[75%] w-[88%]">
                            <div className="font-poppins font-semibold sm:text-start text-center 
                                md:text-[28px] sm:text-[20px] xs:text-[16px] text-[13px] sm:mt-0 mt-[20px]">
                                Are you ready to embark on a journey of digital mastery? 
                                Dive into the world of coding with our cutting-edge online programming classes!
                                <br/> <br className="sm:block hidden" />
                                Whether you&apos;re a beginner looking to build a solid foundation or an 
                                experienced developer aiming to level up your skills, we&apos;ve got the 
                                perfect courses for you.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro
