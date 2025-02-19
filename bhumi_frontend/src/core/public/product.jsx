import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useGetList } from "./query";

const Product = () => {
    const { data: productList } = useGetList();
    console.log(productList)

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            {/* Heading for "Our Products" */}
            <h1 className="text-3xl font-semibold text-center my-6">Our Products</h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {productList?.data?.map((product) => (
                    <a
                        key={product._id}
                        href={`/product-detail/${product._id}`}
                        className="card glass w-80 hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <figure>
                            <img
                                src={"http//localhost:3000/product_type_images"}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{product.product_categoryId.description
                                || "No description available"}</p>
                        </div>
                    </a>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Product;
