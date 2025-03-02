import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import { useRegisterUser } from "./query";



const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const saveApi = useRegisterUser();

    const submit = (data) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("contact", data.contact);
        formData.append("address", data.address);
        formData.append("password", data.password);

        console.log("Form Data before sending:", Object.fromEntries(formData.entries()));

        saveApi.mutate(data, {
            onSuccess: () => {
                alert("Registration successful!");
            },
            onError: (error) => {
                console.error("Error Response:", error.response?.data);
                alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
            },
        });
    };
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
                <div onSubmit={handleSubmit(submit)} className="flex-1 flex justify-center">
                    <form className="bg-[#101F3F] p-6 rounded-lg shadow-xl w-full max-w-md h-[450px] mt-10 shadow-[10px_8px_4px_0px_rgba(255, 253, 231, 0.8)]">

                        <div className="mb-4">
                            <label
                                htmlFor="text"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Bibek Pandey"
                                required {...register("fullName", { required: "Full Name is required" })} />


                        </div>
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
                                {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } })} />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="contact"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Contact
                            </label>
                            <input
                                type="contact"
                                id="contact"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="9807654321"
                                {...register("contact", { required: "Contact is required" })} />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Address
                            </label>
                            <input
                                type="address"
                                id="address"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Gorkha, Nepal"
                                {...register("address", { required: "Address is required" })} />
                        </div>
                        {/* Password Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                        </div>



                        {/* Login Button */}
                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="text-black bg-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center border-2 border-transparent hover:border-black"
                            >
                                Register

                                {saveApi.isLoading}

                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <a href="/" className="text-sm font-medium text-white">
                                Don't have an account ?
                            </a>
                            <Link to="/" className="text-sm font-medium text-white hover:underline">
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