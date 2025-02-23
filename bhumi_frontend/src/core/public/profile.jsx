import React, { useEffect, useState } from "react";
import { useUpdateUser } from "./query"; // Import mutation hook

export default function UpdateProfile() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : {};
    const [formData, setFormData] = useState({
        fullName: user.fullName || "",
        email: user.email || "",
        contact: user.contact || "",
        address: user.address || "",
        image: null,
        imageUrl: user.image || "https://via.placeholder.com/150",
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            fullName: user.fullName || "",
            email: user.email || "",
            contact: user.contact || "",
            address: user.address || "",
            imageUrl: user.image || "https://via.placeholder.com/150",
        }));
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
        updateUser.mutate(
            { ...formData, id: user._id },
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
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/3 bg-white rounded-md shadow p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-28 h-28 mb-4">
                                <img
                                    src={formData.imageUrl}
                                    alt="Profile"
                                    className="rounded-full w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-semibold">
                                {formData.fullName || "Full Name"}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {formData.email || "Email Address"}
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 bg-white rounded-md shadow p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">
                            Update Profile
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="contact" className="block text-gray-700 mb-1">
                                    Contact
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter address"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={updateUser.isLoading}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                            >
                                {updateUser.isLoading ? "Updating..." : "Update Profile"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
