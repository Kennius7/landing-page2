import { useNavigate } from "react-router-dom";
import { PaystackButton } from 'react-paystack';
// import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';



const PaymentPage = () => {
    const Navigate = useNavigate();
    const localStoredEmail = localStorage.getItem("regDataEmail");
    const localStoredName = localStorage.getItem("regDataName");
    const localStoredAmount = localStorage.getItem("regDataAmount");
    const localStoredCourses = localStorage.getItem("regDataCourses");
    const publicKey = "pk_test_cb8876e3a6b1832d49307457a40c1dca20765fe5";
    const whatsappGroupLink = "https://chat.whatsapp.com/FxRGqESDY9NGzwrUs7WXSr";
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
            alert(`Payment successful. Ref. Number: ${response.reference}`);
            window.location.href(whatsappGroupLink);
        },
        onClose: () => alert('Payment canceled by user.'),
        metadata: {
            name: localStoredName,
        },
        label: localStoredName,
    };




    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
                <div className="block text-gray-700 text-[25px] font-bold mb-2">
                    Payment Page
                </div>
                <div className="bg-gray-400 flex justify-center items-center rounded-[10px] 
                    w-[35%] mt-[20px] h-[200px]">
                    <div className="font-sans font-semibold text-primary text-center p-2 text-[20px] w-full">
                        Hello, {localStoredName}. You are about to pay the sum of&nbsp;
                        <span className="text-green-700">NGN {localStoredAmount}</span>, 
                        in order to complete registration for a {localStoredCourses} course.
                    </div>
                </div>
                <div className='flex justify-center items-center w-full mt-[40px]'>
                    <PaystackButton 
                        className='bg-green-500 rounded-[7px] py-[10px] text-[18px] w-[30%]'
                        {...componentProps} 
                    />
                </div>
                <div className="flex justify-center items-center w-full mt-[70px]">
                    <button 
                        onClick={()=>Navigate(-1)} 
                        className="bg-red-100 rounded-[5px] w-[30%] h-[50px] text-center text-[16px]">
                        Back
                    </button>
                </div>

                {/* <div className="flex flex-col justify-center items-center w-full mt-[100px]">
                    <div>
                        <div className="block text-gray-700 text-[25px] font-bold mb-2">
                            Random ID: {randomID}
                        </div>
                    </div>
                    <div>
                        <button 
                            onClick={handleGenerateRandomId} 
                            className="block text-gray-700 text-[25px] font-bold mb-2 
                            bg-yellow-300 p-4 rounded-[7px]">
                            Generate ID
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default PaymentPage
