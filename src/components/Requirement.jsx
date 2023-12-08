import laptop from "../assets/laptop.png";
import dataConnect from "../assets/router.png";
import power from "../assets/power.png";
import study from "../assets/study.png";



function Requirement() {
  return (
    <>
        <div className="flex flex-col justify-around items-center w-full h-[600px]">
            <div className="flex justify-center items-center w-full">
              <div className="text-center font-semibold sm:text-[30px] xs:text-[25px] text-[18px]">
                  Requirements To Fully Participate In Our Online Classes
              </div>
            </div>
            <div>
              <ul className="flex flex-wrap justify-center items-center">
                <li className="flex flex-row justify-center items-center w-[40%] h-[200px] my-[30px]">
                  <img src={laptop} alt="laptop" className="w-[200px] h-[95%]" />
                  <div className="w-[50%]">
                    Laptop (
                    <span className="font-sans italic">
                      with a Duo Core minimum Laptop specification
                    </span>)
                  </div>
                </li>
                <li className="flex flex-row justify-center items-center w-[40%] h-[200px] my-[30px]">
                  <img src={dataConnect} alt="laptop" className="w-[200px] h-[95%]" />
                  <div>
                    Steady data connection
                  </div>
                </li>
                <li className="flex flex-row justify-center items-center w-[40%] h-[200px] my-[30px]">
                  <img src={power} alt="laptop" className="w-[200px] h-[95%]" />
                  <div>
                    Steady power supply (If possible)
                  </div>
                </li>
                <li className="flex flex-row justify-center items-center w-[40%] h-[200px] my-[30px]">
                  <img src={study} alt="laptop" className="w-[200px] h-[95%]" />
                  <div>
                    A dogged willingness to learn
                  </div>
                </li>
              </ul>
            </div>
        </div>
    </>
    
  )
}

export default Requirement