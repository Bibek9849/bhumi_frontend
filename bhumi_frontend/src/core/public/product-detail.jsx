import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer.jsx";
import Navbar from "../../components/navbar.jsx";
import { useProductGetById } from "./query";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useProductGetById(id);

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleAddToCart = () => {
        const exists = cart.some((item) => item._id === product.data._id);
        if (exists) {
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 3000);
            return;
        }

        setCart((prevCart) => {
            const updatedCart = [...prevCart, product.data];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });

        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    if (isLoading)
        return <p className="text-center mt-10 text-lg dark:text-white">Loading product details...</p>;
    if (error)
        return <p className="text-center mt-10 text-red-500 dark:text-red-400">Error fetching product.</p>;
    if (!product)
        return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Product not found.</p>;

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen flex flex-col transition-all">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-all">
                    {/* Image Section */}
                    <div className="relative mb-4">
                        <img
                            src={`http://localhost:3000/product_type_images/${product.data.image}`}
                            alt="Product"
                            className="w-full h-auto object-contain rounded-md"
                        />
                    </div>

                    {/* Title and Description */}
                    <h1 className="text-2xl font-bold text-black dark:text-white">{product.data.name}</h1>
                    <p className="text-black dark:text-gray-300 text-sm mt-1">
                        Category: <strong>{product.data.product_categoryId.name}</strong>
                    </p>
                    <p className="mt-4 text-black dark:text-gray-400 leading-relaxed text-sm">
                        {product.data.description}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-300">
                            Rs {product.data.price}
                        </span>
                        <button
                            className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition"
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart className="mr-1" /> ADD TO CART
                        </button>
                    </div>

                    {/* Success Toast Notification */}
                    {showSuccessToast && (
                        <div className="fixed top-5 right-5 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md border-l-4 border-green-600 dark:border-green-500 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-500">
                            <span className="text-green-600 dark:text-green-400 text-xl">✔</span>
                            <p className="text-gray-800 dark:text-gray-300">Item Added to Cart</p>
                            <button
                                onClick={() => setShowSuccessToast(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg"
                            >
                                ✖
                            </button>
                        </div>
                    )}

                    {/* Error Toast Notification */}
                    {showErrorToast && (
                        <div className="fixed top-5 right-5 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md border-l-4 border-red-600 dark:border-red-500 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-500">
                            <span className="text-red-600 dark:text-red-400 text-xl">✖</span>
                            <p className="text-gray-800 dark:text-gray-300">Product already exists in cart</p>
                            <button
                                onClick={() => setShowErrorToast(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg"
                            >
                                ✖
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
