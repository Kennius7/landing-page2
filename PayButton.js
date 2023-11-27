/* eslint-disable react/prop-types */
import { PaystackButton } from 'react-paystack';
// import { useState } from "react";




const PayButton = ({ amount, email }) => {
    const publicKeyCopy = "pk_test_cb8876e3a6b1832d49307457a40c1dca20765fe5";
//   const publicKey = process.env.REACT_APP_PS_PUBLIC_TEST_KEY;
  const publicKey = publicKeyCopy;
  // eslint-disable-next-line no-unused-vars
//   const [reference, setReference] = useState('');

//   const handlePaystackSuccessAction = (reference) => {
//     // handle payment success
//     setReference(reference);
//     alert("transaction successful");
//   }

  const componentProps = {
    email,
    amount,
    publicKey: publicKey,
    text: 'Pay Now',
    onSuccess: () => alert("Payment successful."),
    onClose: () => alert('Payment canceled by user.'),
  };

  return (<PaystackButton {...componentProps} />);
};

export default PayButton;


