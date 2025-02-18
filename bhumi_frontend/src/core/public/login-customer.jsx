import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // For navigation
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import { useLoginUser } from "./query";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const loginApi = useLoginUser();
    const navigate = useNavigate();

    const submit = (data) => {
        console.log(data)
        loginApi.mutate(data, {
            onSuccess: (res) => {
                alert("Login successful!");
                console.log("Login Response:", res);

                // Store the token and user details
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));

                // Redirect to dashboard or homepage
                console.log(res.data.role)
                if (res.data.role == "1") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }

            },
            onError: (error) => {
                console.error("Login Error:", error.response?.data);
                alert(`Error: ${error.response?.data?.message || "Invalid credentials"}`);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="flex w-full max-w-screen-lg">
                {/* Left Side: Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <img src={avatar} alt="Avatar" className="w-200" />
                </div>

                {/* Right Side: Login Form */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img alt="Bhumi" src={logo} className="mx-auto h-10 w-auto" />
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(submit)} className="space-y-6">
                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="grow text-white-900 placeholder-white-500"
                                        placeholder="Contact Number"
                                        {...register("contact", { required: "Contact number is required" })}
                                    />
                                </label>
                                {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
                            </div>

                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        type="password"
                                        className="grow text-gray-900 placeholder-gray-500"
                                        placeholder="Password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                </label>
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="flex justify-end">
                                <a href="/forget-pass" className="font-semibold text-green-600 hover:text-green-500">
                                    Forgot password?
                                </a>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500">
                                    {loginApi.isLoading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <a href="/register" className="font-semibold text-green-600 hover:text-green-500">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
