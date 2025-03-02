import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../public/query";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const forgotPasswordApi = useForgotPassword();

    const submit = (data) => {
        forgotPasswordApi.mutate(data.email, {
            onSuccess: () => {
                alert("Password reset link sent to your email!");
            },
            onError: (error) => {
                console.error("Error:", error.response?.data);
                alert(`Error: ${error.response?.data?.message || "Failed to send email"}`);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101F3F]">
            <div className="flex w-full max-w-screen-lg">
                {/* Left Side: Logo */}
                {/* <div className="flex-1 flex justify-center items-center">
                    <img src="/assets/logo.png" alt="Logo" className="w-[200px] sm:w-[250px] md:w-[300px]" />
                </div> */}

                {/* Right Side: Form */}
                <div className="flex-1 flex justify-center">
                    <form onSubmit={handleSubmit(submit)} className="bg-[#101F3F] p-6 rounded-lg shadow-xl w-full max-w-md h-[300px] mt-10">
                        <h2 className="text-white text-lg font-medium mb-4 text-center">Forgot Password</h2>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-300 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 text-center">
                            <button type="submit" className="text-black bg-white hover:bg-white hover:text-black font-medium rounded-lg text-sm px-6 py-2.5">
                                Send Reset Link
                            </button>
                        </div>

                        {/* Back to Login */}
                        <div className="mt-4 text-center">
                            <Link to="/" className="text-sm font-medium text-white hover:underline">Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;