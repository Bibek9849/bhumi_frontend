import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "flowbite-react";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCartImage from "../../assets/card.png"; // Add an empty cart image
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useOderUser } from "./query";

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeItem = (id) => {
        setCartItems((prevCart) => {
            const updatedCart = prevCart.filter((item) => item._id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const discount = 0;
    const totalAmount = totalPrice - discount;

    const { mutate: orderUser } = useOderUser();

    const handleCheckout = () => {
        const userString = localStorage.getItem("user");
        if (!userString) return;
        const user = JSON.parse(userString);
        const userId = user.id || user._id;

        const cartValue = localStorage.getItem("cart");

        const orderData = {
            userId,
            totalQuantity,
            totalPrice,
            orderDate: new Date().toISOString(),
            status: "pending",
            cart: JSON.parse(cartValue),
        };

        let config = {
            publicKey: "test_public_key_11bc2e57406d437ca08a84a1bc30ddd2",
            productIdentity: userId,
            productName: "Shopping Cart Purchase",
            productUrl: "http://localhost:3000",
            eventHandler: {
                onSuccess(payload) {
                    orderUser(orderData, {
                        onSuccess: () => {
                            localStorage.removeItem("cart");
                            setCartItems([]);
                            navigate("/home");
                        },
                        onError: (error) => {
                            console.error("Failed to place order:", error);
                        },
                    });
                },
                onError(error) {
                    console.log("Payment failed:", error);
                },
                onClose() {
                    console.log("Khalti payment popup closed");
                },
            },
            paymentPreference: ["KHALTI"],
        };

        let checkout = new KhaltiCheckout(config);
        checkout.show({ amount: totalPrice * 10 });
    };

    return (
        <div className="bg-green-50 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col transition-all">
            <Navbar />
            <div className="flex-grow flex flex-col items-center p-6">
                <h1 className="text-2xl font-semibold text-green-800 dark:text-green-400">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center mt-10">
                        <img src={EmptyCartImage} alt="Empty Cart" className="w-64 h-64 object-contain" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg mt-4">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                        {/* Cart Items */}
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <Card key={item._id} className="p-4 flex items-center gap-4 w-[400px] bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                                    <img
                                        src={`http://localhost:3000/product_type_images/${item.image}`}
                                        alt={item.name}
                                        className="w-24 h-24 object-contain rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h2>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900 dark:text-gray-300">
                                                Rs {item.price * item.quantity}
                                            </span>
                                            <span className="line-through text-gray-500 dark:text-gray-400 text-sm">
                                                Rs {item.originalPrice}
                                            </span>
                                            <span className="text-green-600 dark:text-green-400 text-sm">{item.discount}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                className="w-12 border rounded-md px-2 text-center bg-gray-100 dark:bg-gray-700 dark:text-white"
                                                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                            />
                                            <Button color="failure" size="sm" onClick={() => removeItem(item._id)}>
                                                <TrashIcon className="w-4 h-4 inline-block mr-1" /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                    <HeartIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-red-500 cursor-pointer" />
                                </Card>
                            ))}
                        </div>

                        {/* Price Details */}
                        <Card className="p-4 w-[300px] bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Price Details</h2>
                            <div className="mt-2 text-gray-700 dark:text-gray-300">
                                <p>Price ({cartItems.length} Items) <span className="float-right">Rs: {totalPrice}</span></p>
                                <p>Total Quantity <span className="float-right">Qty: {totalQuantity}</span></p>
                                <p>Discount <span className="float-right text-green-600 dark:text-green-400">Rs: {discount}</span></p>
                                <p>Delivery Charge <span className="float-right">Rs 0</span></p>
                            </div>
                            <hr className="my-2 dark:border-gray-600" />
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Total Amount <span className="float-right">Rs: {totalAmount}</span></h3>
                            <Button className="w-full mt-4 bg-green-800 dark:bg-green-600 text-white" disabled={cartItems.length === 0} onClick={handleCheckout}>
                                PROCEED TO CHECKOUT
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ShoppingCart;
