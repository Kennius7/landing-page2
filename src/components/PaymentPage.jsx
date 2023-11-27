import { useNavigate } from "react-router-dom";
import { PaystackButton } from 'react-paystack';
// import { useState, useEffect } from "react";



const PaymentPage = () => {
    const Navigate = useNavigate();
    const localStoredEmail = localStorage.getItem("regDataEmail");
    const localStoredName = localStorage.getItem("regDataName");
    const localStoredAmount = localStorage.getItem("regDataAmount");
    const publicKey = "pk_test_cb8876e3a6b1832d49307457a40c1dca20765fe5";
    const componentProps = {
        email: localStoredEmail,
        amount: localStoredAmount * 100,
        publicKey: publicKey,
        text: 'Pay Now',
        onSuccess: () => alert("Payment successful."),
        onClose: () => alert('Payment canceled by user.'),
        metadata: {
            name: localStoredName,
        },
    };



    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-[100dvh]">
                <div className="block text-gray-700 text-[25px] font-bold mb-2">
                    Payment Page
                </div>
                <div className='flex justify-center items-center w-full my-[100px]'>
                    <PaystackButton 
                        className='bg-green-400 rounded-[7px] py-[10px] text-[18px] w-[40%]'
                        {...componentProps} 
                    />
                </div>
                <div className="flex justify-center items-center w-full">
                    <button 
                        onClick={()=>Navigate(-1)} 
                        className="bg-red-200 rounded-[5px] w-[20%] h-[50px] text-center">
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
