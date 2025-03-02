import React from "react";
import avatar from "../assets/avatar.png";

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center bg-green-50 dark:bg-gray-800 p-8 transition-all">
            <div className="max-w-lg text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Experience Farm-Fresh Goodness, Straight from the{" "}
                    <span className="text-green-700 dark:text-green-400">Fields</span>
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Buy Fresh, Support Farmers, and Embrace Sustainable Living
                </p>
                <button className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500">
                    View Product
                </button>
            </div>
            <div className="mt-8 md:mt-0">
                <img
                    src={avatar}
                    alt="Farmers"
                    className="w-full max-w-sm"
                />
            </div>
        </header>
    );
}

export default Header;
