import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import React from "react";
import { useLocation } from 'react-router-dom';

const KhaltiPayments = () => {
    const location = useLocation();
    const { totalPrice } = location.state || { NaN };
    // console.log("Khalti Public Key:", process.env.REACT_APP_KHALTI_PUBLIC_KEY); // Debugging public key
    const khaltiConfig = {
        publicKey: "test_public_key_11bc2e57406d437ca08a84a1bc30ddd2",
        productIdentity: "1234567890",
        productName: "Engineering Service Payment",
        productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
        eventHandler: {
            async onSuccess(payload) {
                console.log("Payment Successful:", payload);
                alert("Payment Successful! Verifying...");

                // Send token & amount to backend for verification
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/verify-khalti-payment/", {
                        token: payload.token,
                        amount: totalPrice,// Amount in paisa (NPR 10 = 1000 paisa)
                    });

                    alert(response.data.message);
                } catch (error) {
                    console.error("Verification Error:", error.response);
                    alert("Payment Verification Failed!");
                }
            },
            onError(error) {
                console.error("Payment Error:", error);
            },
            onClose() {
                console.log("Payment popup closed");
            },
        },
        paymentPreference: ["KHALTI"],
    };
    console.log(khaltiConfig);

    const checkout = new KhaltiCheckout(khaltiConfig);

    return (
        <button onClick={() => checkout.show({ amount: totalPrice })}>
            Pay with Khalti
        </button>
    );
};

export default KhaltiPayments;