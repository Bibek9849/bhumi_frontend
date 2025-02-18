import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { useClickOutside } from "../../../hooks/use-click-outside.jsx";
import { Header } from "../../../layouts/admin/header.jsx";
import { Sidebar } from "../../../layouts/admin/sidebar.jsx";
import { cn } from "../../../utils/cn.js";
import { useGetCategory, useSaveProduct } from "../../public/query.js";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);
    const { data: categoryList, isLoading: isCategoryLoading } = useGetCategory();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const saveApi = useSaveProduct();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    const submit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append("product_categoryId", data?.category);
        formData.append("name", data?.name);
        formData.append("file", data?.image[0]);
        formData.append("price", data?.price);
        formData.append("quantity", data?.quantity);
        formData.append("description", data?.description);

        saveApi.mutate(formData, {
            onSuccess: (res) => {
                alert("Product added successfully!");
                reset(); // Reset form fields after submission
            },
            onError: (err) => {
                alert("Failed to add product. Please try again.");
                console.error(err);
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
                )}
            />
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                <div className="p-6 bg-white shadow-md rounded-lg m-4">
                    <form onSubmit={handleSubmit(submit)} className="bg-[#5f6d5f] p-8 rounded-lg shadow-xl w-full max-w-md mt-10">
                        <h1 className="mb-3 text-xl font-bold text-white md:text-2xl">Add Product</h1>

                        {/* Category Select */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Select a Category</label>
                            <select
                                className="block w-full py-2 px-3 text-sm text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                {...register("category", { required: "Category is required" })}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Choose a category</option>
                                {isCategoryLoading ? (
                                    <option disabled>Loading categories...</option>
                                ) : (
                                    categoryList?.data?.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                )}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                        </div>

                        {/* Product Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                {...register("name", { required: "Product name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Upload Image */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Upload Image</label>
                            <input
                                type="file"
                                className="w-full text-sm text-gray-900 border border-gray-400 rounded-lg cursor-pointer bg-gray-50"
                                {...register("image", { required: "Image is required" })}
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Price</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                {...register("price", { required: "Price is required", min: 1 })}
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        {/* Quantity */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Quantity</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                {...register("quantity", { required: "Quantity is required", min: 1 })}
                            />
                            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 border border-gray-500 hover:border-white"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>

                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
