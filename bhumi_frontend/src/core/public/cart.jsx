import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useCart } from "../../context/CartContext"; // Import Cart Context

const Cart = () => {
    const { cartItems, updateQuantity, removeItem } = useCart();

    return (
        <div className="min-h-screen bg-green-100">
            <Navbar />
            <div className="container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800">Shopping Cart</h1>

                <div className="mt-8">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <p className="font-semibold">{item.name}</p>
                                <p>₹{item.discountedPrice}</p>
                                <button onClick={() => removeItem(item.id)} className="text-red-600">Remove</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Your cart is empty!</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
