import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useClickOutside } from "../../../hooks/use-click-outside.jsx";
import { Header } from "../../../layouts/admin/header.jsx";
import { Sidebar } from "../../../layouts/admin/sidebar.jsx";
import { cn } from "../../../utils/cn.js";
import { useDeleteCategory, useGetCategory } from "../../public/query.js";

const ViewCategory = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    const { data: categoryList } = useGetCategory();
    const deleteApi = useDeleteCategory();
    const deleteItem = (id) => {
        console.log(id)
        deleteApi.mutate(id)
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

                <div className="p-6 bg-white shadow-md rounded-lg m-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Product</h2>

                    <form className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">#</th>
                                        <th className="border border-gray-300 px-4 py-2">Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Description</th>
                                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryList?.data?.map((category, index) => (
                                        <tr key={category._id} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{category.description}</td>
                                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                                <button onClick={() => deleteItem(category._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
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

export default ViewCategory;
