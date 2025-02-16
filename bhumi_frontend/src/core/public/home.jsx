import React from "react";
import Footer from "../../components/footer.jsx";
import Header from "../../components/header.jsx";
import Navbar from "../../components/navbar.jsx";


function Home() {

    return (

        <div className="bg-white min-h-screen">

            <Navbar />
            <Header />
            <section className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Our Products
                </h2>


                <div className="flex flex-wrap justify-center space-x-4 space-y-4">
                    <a href="/product-detail" className="card glass w-96 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="car!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                        </div>
                    </a>

                    <a href="/product-detail" className="card glass w-96 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="car!" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                        </div>
                    </a>

                </div>
            </section>

            <Footer />
        </div>

    );

}

export default Home;
