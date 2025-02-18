import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy Loading Components
const Home = lazy(() => import("./core/public/home"));
const Login = lazy(() => import("./core/public/login"));
const ForgetPassword = lazy(() => import("./core/public/forget-password"));
const LoginCustomer = lazy(() => import("./core/public/login-customer"));
const Register = lazy(() => import("./core/public/register"));
const Product = lazy(() => import("./core/public/product"));
const AboutUs = lazy(() => import("./core/public/aboutUs"));
const Order = lazy(() => import("./core/public/order"));
const ProductDetails = lazy(() => import("./core/public/product-detail"));
const Cart = lazy(() => import("./core/public/cart"));
const Layout = lazy(() => import("./core/private/index"));
const Admin = lazy(() => import("./core/public/admin"));
const AddProduct = lazy(() => import("./core/private/product/add_product"));
const AddCategory = lazy(() => import("./core/private/product/add_product_category"));
const ViewCategory = lazy(() => import("./core/private/product/view_product_category"));
const ViewProduct = lazy(() => import("./core/private/product/view_product"));



const queryClient = new QueryClient()

function App() {
    const publicRoutes = [
        { path: "/home", element: <Home /> },
        { path: "/", element: <Login /> },
        { path: "/login-customer", element: <LoginCustomer /> },
        { path: "/register", element: <Register /> },
        { path: "/admin", element: <Admin /> },
        { path: "/product", element: <Product /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/order", element: <Order /> },
        { path: "/product-detail/:id", element: <ProductDetails /> },
        { path: "/forget-pass", element: <ForgetPassword /> },
        { path: "/cart", element: <Cart /> },
        { path: "/add-product", element: <AddProduct /> },
        { path: "/view-product", element: <ViewProduct /> },

        { path: "/add-category", element: <AddCategory /> },
        { path: "/view-category", element: <ViewCategory /> },


        { path: "*", element: <>Unauthorized</> }
    ];

    const privateRoutes = [
        { path: "/admin", element: <Layout /> },

        { path: "*", element: <>Page not found</> }
    ];

    const isAdmin = false;

    return (<>
        <QueryClientProvider client={queryClient}>
            <RouterProvider
                router={createBrowserRouter(isAdmin ? privateRoutes : publicRoutes)} />
        </QueryClientProvider>
    </>

    );
}

export default App;
