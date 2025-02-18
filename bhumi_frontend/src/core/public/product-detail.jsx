import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Get ID from URL
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useProductGetById } from "./query";

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const { data: product, isLoading, error } = useProductGetById(id); // Fetch product details

    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 sec
    };
    console.log("Fetched Product:", product);

    if (isLoading) return <p className="text-center mt-10 text-lg">Loading product details...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error fetching product.</p>;
    if (!product) return <p className="text-center mt-10 text-gray-500">Product not found.</p>;

    return (
        <div className="min-h-screen bg-green-100 relative">
            <Navbar />

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-5 right-5 bg-white shadow-lg border-l-4 border-green-600 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-500">
                    <span className="text-green-600 text-xl">✔</span>
                    <p className="text-gray-800">Item Added to Cart</p>
                    <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-gray-700 text-lg">✖</button>
                </div>
            )}

            {/* Product Section */}
            <div className="flex justify-center my-12">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Product Image */}
                        <div className="w-full md:w-1/2 p-4">
                            <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-1/2 p-4">
                            <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
                            <div className="flex items-center mt-2">
                                <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm">{product.rating} ★</span>
                                <span className="ml-3 text-gray-600">Category: <strong>{product.product_categoryId.name}</strong></span>
                            </div>

                            {/* Price Section */}
                            <div className="mt-3">
                                <span className="text-2xl font-bold text-gray-900">Rs {product.price}</span>

                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-4">
                                <button
                                    className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 flex items-center"
                                    onClick={handleAddToCart}
                                >
                                    🛒 Add to Cart
                                </button>
                                <button className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 flex items-center">
                                    ❤️ Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description & Details */}
            <div className="flex justify-center">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
                    {/* Product Description */}
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-xl font-semibold text-gray-800">Product Description</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
                        <ul className="text-gray-600 mt-2">
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>Weight:</strong> {product.weight}</li>
                            <li><strong>Form:</strong> {product.form}</li>
                            <li><strong>Volume:</strong> {product.volume}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
