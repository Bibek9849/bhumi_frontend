import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useClickOutside } from "../../../hooks/use-click-outside.jsx";
import { Header } from "../../../layouts/admin/header.jsx";
import { Sidebar } from "../../../layouts/admin/sidebar.jsx";
import { cn } from "../../../utils/cn.js";
import { useDeleteProduct, useGetProduct } from "../../public/query.js";

const ViewProduct = () => {
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

    const { data: productList } = useGetProduct();
    const deleteApi = useDeleteProduct();

    const deleteItem = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteApi.mutate(id, {
                onSuccess: () => {
                    alert("Product deleted successfully!");
                },
                onError: (err) => {
                    alert("Failed to delete product. Please try again.");
                    console.error(err);
                }
            });
        }
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
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Product List</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">#</th>
                                    <th className="border border-gray-300 px-4 py-2">Image</th>
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Category</th>
                                    <th className="border border-gray-300 px-4 py-2">Price</th>
                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {productList?.data?.map((product, index) => (
                                    <tr key={product._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <img src={`http://localhost:3000/product_type_images/${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.product_categoryId.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                                        <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                            <button
                                                onClick={() => deleteItem(product._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Outlet for Admin Pages */}
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
