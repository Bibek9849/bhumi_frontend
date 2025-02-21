import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router-dom";
import { useClickOutside } from "../../../hooks/use-click-outside.jsx";
import { Header } from "../../../layouts/admin/header.jsx";
import { Sidebar } from "../../../layouts/admin/sidebar.jsx";
import { cn } from "../../../utils/cn.js";
import { useGetCategoryById, useProductCategory } from "../../public/query.js";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);
    const { mutate, isLoading, isError, error } = useProductCategory();
    const { id } = useParams();
    const { data: getById, isLoading: categoryLoading } = useGetCategoryById(id);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: getById?.data,
        values: getById?.data,
        mode: "all" // Set defaultValues only if data is available
    });

    // Handle form submit
    const submit = (data) => {
        console.log("Raw form data:", data);

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("description", data?.description);

        console.log("Form Data before sending:", Object.fromEntries(formData.entries()));

        mutate(data, {
            onSuccess: () => {
                alert("Product category added successfully!");
                reset(); // Reset form after success
            },
            onError: (err) => {
                console.error("Error adding product category:", err);
                alert("Failed to add product category.");
            },
        });
    };

    // Display loading state if data is still being fetched
    if (categoryLoading) {
        return <div>Loading...</div>;
    }

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

                {/* ✅ Add Product Form */}
                <div className="p-6 bg-white shadow-md rounded-lg m-4" onSubmit={handleSubmit(submit)}>
                    <form className="bg-[#747f74] p-6 rounded-lg shadow-xl w-full max-w-md h-[400px] mt-10 shadow-[10px_8px_4px_0px_rgba(255, 253, 231, 0.8)]">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                            Add Product Category
                        </h1>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                                Name
                            </label>
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                            <input
                                type="text"
                                id="name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder=""
                                required
                                {...register("name", { required: "Product Name is required" })}
                            />
                        </div>

                        {/* Description Field */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder=""
                                required
                                {...register("description", { required: "Description is required" })}
                            />
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="text-black bg-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center border-2 border-transparent hover:border-black"
                                disabled={isLoading}
                            >
                                Add
                            </button>
                        </div>

                        {isError && <p className="text-red-500">Error: {error?.message}</p>}
                    </form>
                </div>

                {/* Outlet for Admin Pages */}
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
