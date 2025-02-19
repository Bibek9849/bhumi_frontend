import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "flowbite-react";
import React, { useState } from "react";

const ShoppingCart = () => {
    // Cart state
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Fieldstar 8-Litre Plastic Manual Sprayer for spraying fertilizers in Farms.",
            price: 950,
            originalPrice: 1999,
            discount: "52% off",
            image: "/sprayer.png", // Replace with actual image path
            quantity: 1,
        },
        {
            id: 2,
            name: "FreshDcart Solar Soil Plant Care New 3 In 1 Water Moisture Soil Sensor.",
            price: 589,
            originalPrice: 1010,
            discount: "63% off",
            image: "/soil-sensor.png", // Replace with actual image path
            quantity: 1,
        },
    ]);

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevents negative quantity

        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove item from cart
    const removeItem = (id) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0; // Hardcoded discount (adjust as needed)
    const totalAmount = totalPrice - discount;

    return (
        <div className="p-6 bg-green-50 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-green-800">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Cart Items */}
                <div className="flex flex-col gap-4">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Card key={item.id} className="p-4 flex items-center gap-4 w-[400px]">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                                <div className="flex-1">
                                    <h2 className="text-sm font-semibold">{item.name}</h2>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-lg font-bold">₹{item.price * item.quantity}</span>
                                        <span className="line-through text-gray-500 text-sm">₹{item.originalPrice}</span>
                                        <span className="text-green-600 text-sm">{item.discount}</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            className="w-12 border rounded-md px-2 text-center"
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        />
                                        <Button color="failure" size="sm" onClick={() => removeItem(item.id)}>
                                            <TrashIcon className="w-4 h-4 inline-block mr-1" /> Remove
                                        </Button>
                                    </div>
                                </div>
                                <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    )}
                </div>

                {/* Price Details */}
                <Card className="p-4 w-[300px]">
                    <h2 className="text-lg font-semibold">Price Details</h2>
                    <div className="mt-2 text-gray-700">
                        <p>
                            Price ({cartItems.length} Items) <span className="float-right">Rs: {totalPrice}</span>
                        </p>
                        <p>
                            Discount <span className="float-right text-green-600"> Rs: {discount}</span>
                        </p>
                        <p>
                            Delivery Charge <span className="float-right">Rs 0</span>
                        </p>
                    </div>
                    <hr className="my-2" />
                    <h3 className="font-bold text-lg">
                        Total Amount <span className="float-right">Rs: {totalAmount}</span>
                    </h3>
                    <Button className="w-full mt-4 bg-green-800 text-white" disabled={cartItems.length === 0}>
                        PROCEED TO CHECKOUT
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ShoppingCart;
