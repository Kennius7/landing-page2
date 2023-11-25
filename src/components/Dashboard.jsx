import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";





function Dashboard() {
const Navigate = useNavigate();
const [regData, setRegData] = useState([]);

useEffect(() => {
  const regDataRef = collection(db, "Registrations");
  const q = query(regDataRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
      const regDataFireBase = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      }));
      setRegData(regDataFireBase.reverse());
  })
}, [])

const PaidOccurences = (array, key, value) => {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      count++;
    }
  }

  return count;
}

const handlePaidClick = async (data) => {
  const paidRef = doc(db, "Registrations", data.id);
  if (window.confirm(`Are you sure ${data.name} has paid?`)) {
    try {
      await updateDoc(paidRef, {isPaid: !data.isPaid});
    } catch (error) {
      toast("Error deleting registration data!", { type: "error", position: toast.POSITION.TOP_RIGHT })
      console.log(error);
    }
  }
}

const handleDelete = async (data) => {
  if (window.confirm(`Are you sure you want to delete this entry: ${data.name}?`)) {
    try {
      await deleteDoc(doc(db, "Registrations", data.id)) 
      toast("Registration data deleted successfully", { type: "success", position: toast.POSITION.TOP_RIGHT })
    } catch (error) {
      toast("Error deleting registration data!", { type: "error", position: toast.POSITION.TOP_RIGHT })
      console.log(error);
    }
  }
}


  return (
    <>
        <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
            <div className="font-mono font-semibold text-[25px]">Dashboard</div>
            <div>Number of Applicants: {regData.length}</div>
            <div>Number of Paid Applicants: {PaidOccurences(regData, "isPaid", true)}</div>
            <div>List of Applicants</div>
            
            <table className="sm:w-[95%] xs:w-[98%] w-[99%]">
              <thead className="w-full">
                  <tr className="bg-blue-200 sm:h-[40px] xs:h-[30px] h-[28px]">
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[11px] text-[9px]">
                        S/N
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        Name
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        Number
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        E-mail
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        Course
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        Status
                      </th>
                      <th className="font-semibold text-start sm:text-[15px] xs:text-[12px] text-[10px]">
                        Time Registered
                      </th>
                  </tr>
              </thead>
              <tbody className="w-full bg-slate-100">
                {regData.map((reg) => (
                  <tr 
                    key={reg.regID} 
                    className={`bg-yellow-100 sm:h-[50px] xs:h-[30px] h-[25px] border-[1px] border-slate-300
                        ${reg.regID === reg.length - 1 
                            ? "mb-0" 
                            : "sm:mb-[20px] xs:mb-[10px] mb-[20px]"}`}>

                    <td className="font-poppins text-start sm:text-[13px] xs:text-[12px] text-[12px] 
                        xs:w-[2%] w-[3%] sm:pl-[10px] xs:pl-[2px] pl-[1px]">
                        {reg.regID + 1}
                    </td>
                    <td className="text-start sm:text-[14px] xs:text-[11px] text-[9px] 
                        xs:w-[20%] w-[49%]">
                        {reg.name}
                    </td>
                    <td className="font-mono text-start sm:text-[14px] xs:text-[11px] text-[9px] 
                        xs:w-[8%] w-[20%] italic">
                        {reg.number}
                    </td>
                    <td className="font-mono text-start sm:text-[14px] xs:text-[11px] text-[9px] 
                        xs:w-[20%] w-[18%] italic">
                        {reg.email}
                    </td>
                    <td className="font-poppins text-start sm:text-[14px] xs:text-[11px] text-[9px] 
                        xs:w-[20%] w-[10%]">
                        {reg.courses}
                    </td>
                    <td 
                      onClick={() => handlePaidClick(reg)} 
                      className={`font-poppins text-start cursor-pointer sm:text-[14px] 
                        xs:text-[11px] text-[9px] xs:w-[5%] w-[10%] 
                        ${reg.isPaid === true ? "text-blue-600" : "text-red-600"}`}>
                        {reg.isPaid === true ? "Paid" : "Not Paid"}
                    </td>
                    <td className="xs:w-[10%] w-[10%]">
                        <div className="flex flex-row justify-end">
                          <div className="text-center sm:text-[14px] xs:text-[11px] text-[9px] w-[80%]">
                            {reg.createdAt.toDate().toDateString()}
                          </div>
                          <div 
                            onClick={() => handleDelete(reg)} 
                            className="flex justify-center items-center cursor-pointer w-[20%]">
                            <AiFillDelete name="AiFillDelete" size={24} color="black" />
                          </div>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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