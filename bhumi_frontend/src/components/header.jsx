import React from "react";
import avatar from "../assets/avatar.png";

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center bg-green-50 p-8">
            <div className="max-w-lg text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                    Experience Farm-Fresh Goodness, Straight from the{" "}
                    <span className="text-green-700">Fields</span>
                </h1>
                <p className="mt-4 text-gray-600">
                    Buy Fresh, Support Farmers, and Embrace Sustainable Living
                </p>
                <button href="/product" className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800">
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
