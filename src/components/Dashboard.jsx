import { useNavigate } from "react-router-dom";




//! remember to find out how to generate IDs from Matic Drive !//




function Dashboard() {
const Navigate = useNavigate();

  return (
    <>
        <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
            <div className="font-mono font-semibold text-[25px]">Dashboard</div>
            <div>List of Applicants</div>
            <div>Number of Applicants</div>
            <button 
              onClick={()=> Navigate(-1)} 
              className="bg-red-200 rounded-[10px] w-[150px] h-[30px]">
                Back
            </button>
        </div>
    </>
    
  )
}

export default Dashboard