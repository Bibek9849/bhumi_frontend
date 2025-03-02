import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useUpdateUser } from "./query";

export default function UpdateProfile() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : {};

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contact: "",
        address: "",
        image: null,
        imageUrl: "https://via.placeholder.com/150",
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.fullName || "",
                email: user.email || "",
                contact: user.contact || "",
                address: user.address || "",
                imageUrl: user.image || "https://via.placeholder.com/150",
            }));
        }
    }, [userString]);

    const updateUser = useUpdateUser();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files?.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
                imageUrl: URL.createObjectURL(file),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append("fullName", formData.fullName);
        updatedData.append("email", formData.email);
        updatedData.append("contact", formData.contact);
        updatedData.append("address", formData.address);
        if (formData.image) {
            updatedData.append("image", formData.image);
        }

        updateUser.mutate(
            { updatedData, id: user._id },
            {
                onSuccess: (data) => {
                    alert("Profile updated successfully!");
                    localStorage.setItem("user", JSON.stringify(data.data));
                    window.location.reload();
                },
                onError: (err) => {
                    console.error("Update failed:", err);
                    alert("Failed to update profile. Please try again.");
                },
            }
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row gap-8"
            >
                {/* Profile Picture Section */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
                        <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{formData.fullName || "Your Name"}</h2>
                    <p className="text-gray-500">{formData.email || "Your Email"}</p>
                </div>

                {/* Profile Form Section */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Update Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-700 font-medium">Full Name</label>
                            <input
                                type="text" name="fullName" value={formData.fullName}
                                onChange={handleChange} required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-medium">Contact</label>
                            <input
                                type="text" name="contact" value={formData.contact}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-medium">Profile Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-medium">Address</label>
                            <input
                                type="text" name="address" value={formData.address}
                                onChange={handleChange} required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <motion.button
                            type="submit" disabled={updateUser.isLoading}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold shadow-md hover:bg-indigo-700 transition"
                        >
                            {updateUser.isLoading ? "Updating..." : "Update Profile"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
