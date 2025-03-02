import React from "react";
import Background from "../../assets/bac.jpg";
import Navbar from "../../components/navbar";

const AboutUs = () => {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen transition-all">
            <Navbar />
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About Us</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 px-6 md:px-32">
                    Buy seasonal organic recipe boxes, fruit & veg online at Riverford & order fresh
                    organic meat from our expert butchers. Organic farming is an alternative food
                    production method which prioritizes sustainable production practices, respectful
                    use of the countryside, and concern for animal welfare.
                </p>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
                <img
                    src={Background}
                    alt="Fresh Vegetables"
                    className="max-w-4xl w-full rounded-lg shadow-lg"
                />
            </div>

            {/* Features Section */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 px-6 md:px-20">
                <FeatureBox
                    icon="🥗"
                    title="Special Offers"
                    description="Enjoy exclusive deals and discounts on our organic products."
                />
                <FeatureBox
                    icon="❄️"
                    title="Frozen Food"
                    description="High-quality frozen foods to keep your meals fresh and convenient."
                />
                <FeatureBox
                    icon="🧀"
                    title="Eggs and Cheese"
                    description="Fresh dairy products sourced from trusted organic farms."
                />
            </div>
        </div>
    );
};

const FeatureBox = ({ icon, title, description }) => {
    return (
        <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center flex-1 min-w-[250px] transition-all">
            <div className="text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        </div>
    );
};

export default AboutUs;
