// import { useState } from "react";

// function Payment() {
//     const [paymentResponse, setPaymentResponse] = useState(null);

//     const initiatePayment = async () => {
//         const url = "https://dev.khalti.com/api/v2/epayment/initiate/";
//         const payload = {
//             return_url: "http://example.com/",
//             website_url: "https://example.com/",
//             amount: 1000, // Amount in paisa (e.g., 1000 paisa = 10 NPR)
//             purchase_order_id: "Order01",
//             purchase_order_name: "test",
//             customer_info: {
//                 name: "Ram Bahadur",
//                 email: "test@khalti.com",
//                 phone: "9800000001",
//             },
//         };

//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     Authorization: "Key live_secret_key_68791341fdd94846a146f0457ff7b455", // Move this to an env variable
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             setPaymentResponse(data);
//             console.log("Khalti Response:", data);
//         } catch (error) {
//             console.error("Payment Error:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Khalti Payment</h2>
//             <button onClick={initiatePayment}>Pay with Khalti</button>
//             {paymentResponse && <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>}
//         </div>
//     );
// }

// export default Payment;
