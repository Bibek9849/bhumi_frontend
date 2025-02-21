import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer.jsx";
import Navbar from "../../components/navbar";
import { useGetList } from "./query";

const Product = () => {
    const { data: productList } = useGetList();
    console.log(productList);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Extract unique categories
    const categories = productList?.data
        ? Array.from(new Set(productList.data.map((product) => product.product_categoryId?.name).filter(Boolean)))
        : [];

    let timeoutId = null;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category); // Toggle category selection
        setShowCategoryDropdown(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setShowCategoryDropdown(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShowCategoryDropdown(false);
        }, 200);
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory
        ? productList?.data?.filter((product) => product.product_categoryId?.name === selectedCategory)
        : productList?.data;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div
                className="w-full h-64 md:h-80 bg-cover bg-center flex justify-center items-center text-white text-3xl font-semibold"
                style={{ backgroundImage: 'url(/src/assets/hh.jpg)' }}
            >
            </div>

            {/* Category & Heading Section */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* Category Dropdown */}
                    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <button className="flex items-center gap-2 text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-md border border-black text-black">
                            {selectedCategory ? selectedCategory : 'Select Category'}
                            <FontAwesomeIcon className={showCategoryDropdown ? "rotate-180 transition-transform" : "transition-transform"} icon={faCircleArrowDown} />
                        </button>
                        {showCategoryDropdown && categories.length > 0 && (
                            <ul className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 mt-2 p-2 border border-black z-10">
                                {categories.map((category, index) => (
                                    <li key={index} className="py-2 px-4 hover:bg-gray-200 rounded">
                                        <button className="block w-full text-left text-black" onClick={() => handleCategoryClick(category)}>
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-semibold text-black w-full md:w-auto">Our Products</h1>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product-detail/${product._id}`}
                            className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <img
                                src={`http://localhost:3000/product_type_images/${product.image}`}
                                alt={product.name}
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    {product.product_categoryId?.description || "No description available"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Product;
