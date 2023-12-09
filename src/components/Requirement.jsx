import { requirementData } from "../data";



function Requirement() {
  return (
    <>
        <div className="flex flex-col md:justify-center justify-start items-center w-full 
          md:h-[600px] sm:h-[600px] xs:h-[650px] h-[870px]">
            <div className="flex justify-center items-center w-full md:mt-[10px] sm:mt-[30px] 
              xs:mt-[40px] mt-[30px] xs:mb-[40px] mb-[20px]">
              <div className="text-center font-semibold text-slate-700 sm:text-[30px] 
                xs:text-[23px] text-[18px] sm:w-full xs:w-[80%] w-[90%]">
                  Requirements To Fully Participate In Our Online Classes
              </div>
            </div>

            <ul className="flex xs:flex-row flex-col xs:flex-wrap flex-nowrap justify-around items-center">
              {
                requirementData.map((data)=> (
                  <li key={data.id} 
                    className={`flex justify-center xs:items-center items-end xs:flex-row xs:flex-wrap 
                      flex-nowrap ${data.id === 1 || data.id === 3 ? "flex-row-reverse" : "flex-row"}
                      sm:w-[45%] xs:w-[48%] w-[95%] md:h-[200px] sm:h-[170px] xs:h-[200px] h-[160px] 
                      xs:mb-[30px] mb-[20px]`}>

                    <img 
                      src={data.img} 
                      alt="laptop" 
                      className="md:w-[200px] sm:w-[170px] xs:w-[120px] w-[130px] sm:h-[95%] 
                      xs:h-[60%] h-[80%]" />

                    <div className={`sm:text-[16px] xs:text-[14px] text-[15px] w-[50%] md:ml-0 
                      md:mr-0 xs:mb-0 mb-[15px] ${data.id === 1 || data.id === 3 ? "mr-[5px]" : "ml-[5px]"}`}>
                      {data.desc}
                    </div>

                  </li>
                ))
              }
            </ul>

        </div>
    </>
    
  )
}

export default Requirement