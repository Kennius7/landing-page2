import introPics from "../assets/intro-bg.webp";



const Intro = () => {
    return (
        <>
            <div className="bg-style">
                <div className="relative flex justify-around items-center">
                    <div className="flex justify-center items-center w-[450px] h-[450px]">
                        <img 
                            src={introPics} 
                            alt="intro pics" 
                            className="w-full h-full rounded-[8px] object-cover" 
                        />
                    </div>
                    <div className="flex justify-center items-center w-[40%]">
                        <div className="font-poppins font-semibold text-[28px]">
                            Are you ready to embark on a journey of digital mastery? 
                            Dive into the world of coding with our cutting-edge online programming classes!
                            <br/> <br/>
                            Whether you&apos;re a beginner looking to build a solid foundation or an 
                            experienced developer aiming to level up your skills, we&apos;ve got the 
                            perfect courses for you.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro
