import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import { useRegisterUser } from "./query";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const saveApi = useRegisterUser();
    const [errorMessage, setErrorMessage] = useState("");

    const submit = (data) => {
        saveApi.mutate(data, {
            onSuccess: () => {
                alert("Registration successful!");
            },
            onError: (error) => {
                setErrorMessage(error.response?.data?.message || "Something went wrong");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101F3F]">
            <div className="flex w-full max-w-screen-lg">
                {/* Left Side: Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <img src={avatar} alt="Logo" className="w-[200px] sm:w-[250px] md:w-[300px]" />
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 flex justify-center">
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="bg-[#101F3F] p-6 rounded-lg shadow-xl w-full max-w-md h-auto mt-10 shadow-[10px_8px_4px_0px_rgba(255, 253, 231, 0.8)]"
                    >
                        {/* Full Name */}
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Bibek Pandey"
                                {...register("fullName", { required: "Full Name is required" })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@gmail.com"
                                {...register("email", { required: "Email is required" })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Contact */}
                        <div className="mb-4">
                            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-white">
                                Contact
                            </label>
                            <input
                                type="text"
                                id="contact"
                                placeholder="9807654321"
                                {...register("contact", { required: "Contact is required" })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* API Error Message */}
                        {errorMessage && <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>}

                        {/* Register Button */}
                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                disabled={saveApi.isLoading}
                                className={`text-black bg-white font-medium rounded-lg text-sm px-6 py-2.5 border-2 border-transparent 
                                    ${saveApi.isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-black'}`}
                            >
                                {saveApi.isLoading ? "Registering..." : "Register"}
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div className="mt-4 text-center">
                            <span className="text-sm font-medium text-white">Already have an account?</span>
                            <Link to="/" className="text-sm font-medium text-white hover:underline ml-1">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
