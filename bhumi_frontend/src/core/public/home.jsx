import React from "react";
import Footer from "../../components/footer.jsx";
import Header from "../../components/header.jsx";
import Navbar from "../../components/navbar.jsx";

function Home() {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen transition-all">
            <Navbar />
            <Header />

            {/* Contact Form Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
                    Contact Us
                </h2>
                <p className="text-center text-black dark:text-gray-300 mb-8">
                    We're here to help
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {/* Call Us */}
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="flex justify-center mb-4">
                            <span className="text-4xl text-black dark:text-white">📞</span>
                        </div>
                        <h3 className="text-xl font-semibold text-black dark:text-white">Call Us</h3>
                        <p className="text-black dark:text-gray-300 mt-2">9849943368</p>
                    </div>

                    {/* Live Chat */}
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="flex justify-center mb-4">
                            <span className="text-4xl text-black dark:text-white">💬</span>
                        </div>
                        <h3 className="text-xl font-semibold text-black dark:text-white">Chat Live</h3>
                        <p className="text-black dark:text-gray-300">
                            We're available Sun 7:00pm EST - Friday 7:00pm EST
                        </p>
                        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Chat Now
                        </button>
                    </div>

                    {/* Email Us */}
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="flex justify-center mb-4">
                            <span className="text-4xl text-black dark:text-white">📧</span>
                        </div>
                        <h3 className="text-xl font-semibold text-black dark:text-white">Ask a Question</h3>
                        <p className="text-black dark:text-gray-300">
                            Fill out our form and we'll get back to you in 24 hours.
                        </p>
                        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
