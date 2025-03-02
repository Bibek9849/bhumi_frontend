import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("darkMode") === "enabled"
    );
    const navigate = useNavigate();

    // Retrieve the user data from localStorage
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : {};
    const defaultImage = "https://via.placeholder.com/150"; // Default avatar

    // Apply the theme based on state & store preference
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [isDarkMode]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = (confirm) => {
        if (confirm) {
            localStorage.clear();
            navigate("/");
        }
        setShowLogoutConfirm(false);
    };

    return (
        <div className="navbar bg-green-100 dark:bg-gray-900 dark:text-white transition-all">
            <div className="navbar bg-base-50 dark:bg-gray-800">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/home" className="text-white hover:text-gray-300">Home</Link></li>
                            <li><Link to="/product" className="text-white hover:text-gray-300">Product</Link></li>
                            <li><Link to="/order" className="text-white hover:text-gray-300">Order</Link></li>
                            <li><Link to="/about" className="text-white hover:text-gray-300">About Us</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <Link to="/home" className="text-green-600 dark:text-green-400 hover:text-green-500">
                            Bhumi
                        </Link>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/home" className="text-black dark:text-white hover:text-gray-600">Home</Link></li>
                        <li><Link to="/product" className="text-black dark:text-white hover:text-gray-600">Product</Link></li>
                        <li><Link to="/order" className="text-black dark:text-white hover:text-gray-600">Order</Link></li>
                        <li><Link to="/about" className="text-black dark:text-white hover:text-gray-600">About Us</Link></li>
                    </ul>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl mb-4 dark:text-white">Are you sure you want to logout?</h3>
                        <div className="flex justify-between">
                            <button className="btn btn-secondary" onClick={() => handleLogoutConfirm(true)}>Yes</button>
                            <button className="btn btn-primary" onClick={() => handleLogoutConfirm(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-none gap-2">
                {/* Theme Toggle Button */}
                <label className="grid cursor-pointer place-items-center">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(prevState => !prevState)}
                        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 dark:bg-gray-700"
                    />
                    <svg className="stroke-current dark:text-white text-gray-800 col-start-1 row-start-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                </label>

                {/* Shopping Cart */}
                <Link to="/cart">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between block dark:text-white">
                                Profile
                            </Link>
                        </li>
                        <li><a className="dark:text-white">Settings</a></li>
                        <button onClick={handleLogoutClick} className="text-red-500 dark:text-red-400">Logout</button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
