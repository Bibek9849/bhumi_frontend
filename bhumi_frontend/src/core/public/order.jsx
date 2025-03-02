import { Button, Card } from "flowbite-react";
import jsPDF from "jspdf";
import React from "react";
import avatar from "../../assets/image.png"; // Image for empty orders
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { fetchOrders } from "./query.js";

const Order = () => {
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
            doc.text(`Subtotal: Rs ${order.sub_total}`, 20, 70);

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
        <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen transition-all">
            <Navbar />
            <div className="max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Order History</h2>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-10">
                        <img
                            src={avatar} // Empty orders image
                            alt="No Orders Found"
                            className="w-64 h-64 object-contain"
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-lg mt-4">No orders found.</p>
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <Card key={index} className="mb-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img
                                            src={`http://localhost:3000/product_type_images/${order.productID?.image}`}
                                            alt={order.productID?.name || "Product Image"}
                                            className="w-24 h-24 rounded-lg mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {order.productID?.name || "Unknown Product"}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Order ID: {order.orderId?._id || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Rs: {order.sub_total}</p>
                                </div>
                                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <p className="text-gray-900 dark:text-gray-300">
                                        <span className="font-semibold">Total Quantity:</span> {order.total_quantity}
                                    </p>
                                    <Button
                                        className="mt-3 bg-green-700 hover:bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-400 transition"
                                        onClick={() => handleDownloadReceipt(order)}
                                    >
                                        Download Invoice
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Order;
