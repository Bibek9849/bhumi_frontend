import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Apply the theme based on the state
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = (confirm) => {
        if (confirm) {
            // Logic to log the user out (e.g., clear tokens, redirect, etc.)
            console.log('Logged out');
        }
        setShowLogoutConfirm(false);
    };

    return (
        <div className="navbar bg-green-100">
            <div className="navbar bg-base-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/home" className="text-white hover:text-black-500">Home</Link></li>
                            <li><Link to="/product" className="text-white hover:text-black-500">Product</Link></li>
                            <li><Link to="/order" className="text-white hover:text-black-500">Order</Link></li>
                            <li><Link to="/about" className="text-white hover:text-black-500">About Us</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <Link to="/home" className="text-green-600 hover:text-green-500">Bhumi</Link>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/home" className="text-black hover:text-black-500">Home</Link></li>
                        <li><Link to="/product" className="text-black hover:text-black-500">Product</Link></li>
                        <li><Link to="/order" className="text-black hover:text-black-500">Order</Link></li>
                        <li><Link to="/about" className="text-black hover:text-black-500">About Us</Link></li>
                    </ul>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl mb-4">Are you sure you want to logout?</h3>
                        <div className="flex justify-between">
                            <button className="btn btn-secondary" onClick={() => handleLogoutConfirm(true)}>Yes</button>
                            <button className="btn btn-primary" onClick={() => handleLogoutConfirm(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-none gap-2">

                <label className="grid cursor-pointer place-items-center">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(prevState => !prevState)}
                        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 dark:bg-base-100" />

                    {/* Sun Icon */}
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-1 row-start-1 dark:stroke-base-500 dark:fill-base-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>

                    {/* Moon Icon */}
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-2 row-start-1 dark:stroke-base-500 dark:fill-base-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <button onClick={handleLogoutClick} className="text-red-500">Logout</button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
