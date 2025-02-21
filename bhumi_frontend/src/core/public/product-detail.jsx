import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer.jsx";
import Navbar from "../../components/navbar.jsx";
import { useProductGetById } from "./query";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useProductGetById(id);

    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (isLoading) return <p className="text-center mt-10 text-lg">Loading product details...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error fetching product.</p>;
    if (!product) return <p className="text-center mt-10 text-gray-500">Product not found.</p>;

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
                    {/* Image Section */}
                    <div className="relative mb-4">
                        <img
                            src={`http://localhost:3000/product_type_images/${product.data.image}`}
                            alt="Product"
                            className="w-full h-auto object-contain rounded-md"
                        />
                    </div>

                    {/* Title and Description */}
                    <h1 className="text-2xl font-bold text-black">{product.data.name}</h1>
                    <p className="text-black text-sm mt-1">Category: <strong>{product.data.product_categoryId.name}</strong></p>
                    <p className="mt-4 text-black leading-relaxed text-sm">{product.data.description}</p>

                    {/* Price and Add to Cart */}
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900">Rs {product.data.price}</span>
                        <button
                            className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition"
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart className="mr-1" /> ADD TO CART
                        </button>
                    </div>
                    {/* Toast Notification */}
                    {showToast && (
                        <div className="fixed top-5 right-5 bg-white shadow-lg border-l-4 border-green-600 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-500">
                            <span className="text-green-600 text-xl">✔</span>
                            <p className="text-gray-800">Item Added to Cart</p>
                            <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-gray-700 text-lg">✖</button>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;