import { useMediaQuery } from "@uidotdev/usehooks";
import { Button, Card } from "flowbite-react";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Added useNavigate here
import avatar from "../../../assets/image.png";
import { useClickOutside } from "../../../hooks/use-click-outside.jsx";
import { Header } from "../../../layouts/admin/header.jsx";
import { Sidebar } from "../../../layouts/admin/sidebar.jsx";
import { cn } from "../../../utils/cn.js";
import { fetchOrders } from "../../public/query.js";

const ViewProduct = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    const { data: productList } = fetchOrders();

    console.log("Fetched productList:", productList);

    // Fix: Extract the correct array safely
    const orders = Array.isArray(productList?.data?.data) ? productList.data.data : [];

    // Function to convert image URL to Base64
    const getBase64Image = (url, callback) => {
        let img = new Image();
        img.crossOrigin = "Anonymous"; // To handle CORS issues
        img.src = url;
        img.onload = () => {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
        };
        img.onerror = () => {
            console.error("Failed to load image:", url);
            callback(""); // If error occurs, return empty image
        };
    };

    // Function to generate and download the PDF with image
    const handleDownloadReceipt = (order) => {
        const doc = new jsPDF();
        const imageUrl = `http://localhost:3000/product_type_images/${order.productID?.image}`;

        getBase64Image(imageUrl, (base64Image) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Order Receipt", 20, 20);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Order ID: ${order.orderId?._id || "N/A"}`, 20, 40);
            doc.text(`Product: ${order.productID?.name || "Unknown Product"}`, 20, 50);
            doc.text(`Total Quantity: ${order.total_quantity}`, 20, 60);
            doc.text(`Subtotal: $${order.sub_total}`, 20, 70);

            // If the image exists, add it to the PDF
            if (base64Image) {
                doc.addImage(base64Image, "PNG", 150, 20, 40, 40); // (image, format, x, y, width, height)
            }

            doc.setFont("helvetica", "italic");
            doc.text("Thank you for your purchase!", 20, 90);

            // Save the file
            doc.save(`invoice_${order.orderId?._id || "order"}.pdf`);
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
                <div className="max-w-3xl mx-auto p-6">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Order History</h2>

                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-10">
                            <img
                                src={avatar} // Replace with your actual image path
                                alt="No Orders Found"
                                className="w-64 h-64 object-contain"
                            />
                            <p className="text-gray-500 mt-4 text-lg">No orders found.</p>
                        </div>) : (
                        orders.map((order, index) => (
                            <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow mb-4">
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img
                                                src={`http://localhost:3000/product_type_images/${order.productID?.image}`}
                                                alt={order.productID?.name || "Product Image"}
                                                className="w-28 h-28 rounded-lg mr-4"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">{order.productID?.name || "Unknown Product"}</h3>
                                                <p className="text-gray-500 text-sm">Order ID: {order.orderId?._id || "N/A"}</p>
                                            </div>
                                        </div>
                                        <p className="text-xl font-bold text-blue-600">Rs: {order.sub_total}</p>
                                    </div>
                                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                                        <p><span className="font-semibold">Total Quantity:</span> {order.total_quantity}</p>
                                        <Button className="mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300" onClick={() => handleDownloadReceipt(order)}>
                                            Download Invoice
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
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
