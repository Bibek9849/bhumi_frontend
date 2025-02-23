import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useOderUser } from "./query"; // Adjust the path as necessary

const ShoppingCart = () => {
    // Cart state initialized as empty
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart data from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Update quantity for a specific item
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative or zero quantity

        setCartItems((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Remove a particular item from the cart and localStorage using its id
    const removeItem = (id) => {
        setCartItems((prevCart) => {
            const updatedCart = prevCart.filter((item) => item._id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Calculate total price and total quantity
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    const discount = 0; // Hardcoded discount (adjust as needed)
    const totalAmount = totalPrice - discount;

    // Use the custom hook to call the order API
    const { mutate: orderUser } = useOderUser();

    // Function to handle checkout
    const handleCheckout = () => {
        // Retrieve user details from localStorage (expects user object with "id" or "_id")
        const userString = localStorage.getItem("user");
        if (!userString) {
            console.error("User not found in local storage");
            return;
        }
        const user = JSON.parse(userString);
        const userId = user.id || user._id;

        // Fetch the cardt value from localStorage
        const cardtValue = localStorage.getItem("cart");

        // Build the order data
        const orderData = {
            userId,
            totalQuantity,
            totalPrice,
            orderDate: new Date().toISOString(), // Order date in ISO format
            status: "completed",
            cart: JSON.parse(cardtValue), // Value fetched from localStorage
        };

        console.log(orderData);

        // Call the API using the custom hook
        orderUser(orderData, {
            onSuccess: (data) => {
                console.log("Order placed successfully:", data);
                // Optionally clear the cart after successful checkout
                localStorage.removeItem("cart");
                setCartItems([]);
            },
            onError: (error) => {
                console.error("Failed to place order:", error);
            },
        });
    };

    // Generate cart item elements using a loop
    const cartItemElements = [];
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        cartItemElements.push(
            <Card key={item._id} className="p-4 flex items-center gap-4 w-[400px]">
                <img
                    src={`http://localhost:3000/product_type_images/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                    <h2 className="text-sm font-semibold">{item.name}</h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold">
                            ₹{item.price * item.quantity}
                        </span>
                        <span className="line-through text-gray-500 text-sm">
                            ₹{item.originalPrice}
                        </span>
                        <span className="text-green-600 text-sm">{item.discount}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="w-12 border rounded-md px-2 text-center"
                            onChange={(e) =>
                                updateQuantity(item._id, parseInt(e.target.value))
                            }
                        />
                        <Button
                            color="failure"
                            size="sm"
                            onClick={() => removeItem(item._id)}
                        >
                            <TrashIcon className="w-4 h-4 inline-block mr-1" /> Remove
                        </Button>
                    </div>
                </div>
                <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
            </Card>
        );
    }

    return (
        <div className="p-6 bg-green-50 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-green-800">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Cart Items */}
                <div className="flex flex-col gap-4">
                    {cartItems.length > 0 ? (
                        cartItemElements
                    ) : (
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    )}
                </div>

                {/* Price Details */}
                <Card className="p-4 w-[300px]">
                    <h2 className="text-lg font-semibold">Price Details</h2>
                    <div className="mt-2 text-gray-700">
                        <p>
                            Price ({cartItems.length} Items)
                            <span className="float-right">Rs: {totalPrice}</span>
                        </p>
                        <p>
                            Total Quantity
                            <span className="float-right">Qty: {totalQuantity}</span>
                        </p>
                        <p>
                            Discount
                            <span className="float-right text-green-600">
                                Rs: {discount}
                            </span>
                        </p>
                        <p>
                            Delivery Charge
                            <span className="float-right">Rs 0</span>
                        </p>
                    </div>
                    <hr className="my-2" />
                    <h3 className="font-bold text-lg">
                        Total Amount
                        <span className="float-right">Rs: {totalAmount}</span>
                    </h3>
                    <Button
                        className="w-full mt-4 bg-green-800 text-white"
                        disabled={cartItems.length === 0}
                        onClick={handleCheckout}
                    >
                        PROCEED TO CHECKOUT
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ShoppingCart;
