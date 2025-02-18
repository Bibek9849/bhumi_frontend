import React from "react";
import avatar from "../../assets/avatar.png";


const ForgetPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101F3F]">
            <div className="flex w-full max-w-screen-lg">
                {/* Left Side: Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={avatar}
                        alt="Logo"
                        className="w-[200px] sm:w-[250px] md:w-[300px]" // Responsive logo size
                    />
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 flex justify-center">

                    <form className="bg-[#101F3F] p-6 rounded-lg shadow-xl w-full max-w-md h-[400px] mt-10 shadow-[10px_8px_4px_0px_rgba(255, 253, 231, 0.8)]">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot your password?
                        </h1>
                        <p className="font-light text-gray-500 dark:text-gray-400">


                            Don't fret! Just type in your email and we will send you a code to reset your password!


                        </p>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@gmail.com"
                                required
                            />
                        </div>


                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="text-black bg-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center border-2 border-transparent hover:border-black"
                            >
                                Reset password
                            </button>
                        </div>



                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;