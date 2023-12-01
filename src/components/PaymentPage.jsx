import { useNavigate } from "react-router-dom";
import { PaystackButton } from 'react-paystack';
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../FirebaseConfig";
import logo from "../assets/shosanacodemia-logo111.png";




const PaymentPage = () => {
    const Navigate = useNavigate();
    const localStoredEmail = localStorage.getItem("regDataEmail");
    const localStoredName = localStorage.getItem("regDataName");
    const localStoredAmount = localStorage.getItem("regDataAmount");
    const localStoredCourses = localStorage.getItem("regDataCourses");
    const publicKey = "pk_test_cb8876e3a6b1832d49307457a40c1dca20765fe5";
    const whatsappGroupLink = "https://chat.whatsapp.com/FxRGqESDY9NGzwrUs7WXSr";
    const [regData, setRegData] = useState([]);

    useEffect(() => {
        const regDataRef = collection(db, "Registrations");
        const q = query(regDataRef, orderBy("createdAt", "desc"));
    
        onSnapshot(q, (snapshot) => {
            const regDataFireBase = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setRegData(regDataFireBase);
        })
    }, [])

    const checkPaidStatus = () => {
        for (let i = 0; i < regData.length; i++) {
            if (localStoredEmail === regData[i].email) {
                const paidRef = doc(db, "Registrations", regData[i].id);
                updateDoc(paidRef, {isPaid: !regData[i].isPaid});
            }
        }
    }

    const componentProps = {
        reference: (new Date()).getTime(),
        email: localStoredEmail,
        amount: localStoredAmount * 100,
        publicKey: publicKey,
        channels: ['card', 'bank'],
        // banks: ["057", "100", "801"],
        bank: {
            code: "057",
            account_number: "0120000000"
        },
        currency: "NGN",
        text: 'Pay Now',
        onSuccess: (response) => {
            checkPaidStatus();
            alert(`Payment successful. Ref. Number: ${response.reference}`);
            window.open(whatsappGroupLink, '_blank', 'popup');
        },
        onClose: () => alert('Payment canceled by user.'),
        metadata: {
            name: localStoredName,
        },
        label: localStoredName,
    };

    const openWhatsappLink = () => {
        const phoneNumber = '2348055549979';
        const message = 'Hello, how can we help you?';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank', 'noreferrer');
    }




    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-[650px] bg-slate-100">
                <div className="flex justify-between items-center w-full h-[70px] bg-white mb-[30px]">
                    <div className="flex justify-start items-center">
                        <img 
                            src={logo}
                            alt="logo" 
                            className="md:w-[40px] md:h-[40px] sm:w-[35px] sm:h-[35px] 
                                xs:w-[30px] xs:h-[30px] w-[24px] h-[24px] rounded-[50%]" 
                        />
                        <div className="font-poppins font-semibold text-start md:text-[22px] sm:text-[20px] 
                            xs:text-[16px] text-[13px] sm:pl-[10px] pl-[6px]">
                            Shosan Code Hub
                        </div>
                    </div>

                    <div className="flex justify-around items-center w-[30%]">
                        <div className='flex justify-center items-center w-[50%]'>
                            <PaystackButton 
                                className='bg-green-500 rounded-[7px] py-[10px] h-[40px] text-[16px] w-full'
                                {...componentProps} 
                            />
                        </div>

                        <div className="flex justify-center items-center w-[30%]">
                            <button 
                                onClick={()=>Navigate(-1)} 
                                className="bg-red-100 rounded-[10px] w-full h-[40px] text-center text-[16px]">
                                Back
                            </button>
                        </div>
                    </div>
                </div>

                <div className="block text-gray-700 text-[25px] font-bold mb-2">
                    Payment Page
                </div>

                <div className="bg-gray-400 flex justify-center items-center rounded-[10px] 
                    w-[35%] mt-[20px] h-[200px]">
                    <div className="font-sans font-semibold text-primary text-center p-3 text-[18px] w-full">
                        Hello, {localStoredName}. You are about to pay the sum of&nbsp;
                        <span className="text-green-700">NGN {localStoredAmount}</span>, 
                        in order to complete registration for a {localStoredCourses} course.
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center w-full mt-[40px]">
                    <div className="flex justify-center items-center bg-white rounded-[10px] w-[35%]">
                        <div className="font-sans text-gray-700 italic text-center text-[16px] m-[20px]">
                            Once payment is made successfully, you are to get an email verifying payment, 
                            and also be prompted to join the Whatsapp group, Shosan Code Hub, wherein you 
                            will be onboarded for your classes. <br/>If there are any complaints, like payment 
                            errors, or not being able to join the group, you can contact us by clicking 
                            here:<br/>
                            <span 
                                onClick={openWhatsappLink} 
                                className="text-green-700 font-semibold font-poppins cursor-pointer">
                                Shosan Code Hub
                            </span>.
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage
