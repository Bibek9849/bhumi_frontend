import { useMediaQuery } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import weathers from "../../assets/weather.jpeg";
import { useClickOutside } from "../../hooks/use-click-outside";
import { Header } from "../../layouts/admin/header.jsx";
import { Sidebar } from "../../layouts/admin/sidebar.jsx";
import { cn } from "../../utils/cn.js";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);

    // Weather state
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    // Fetch real-time weather from wttr.in (No API Key Required)
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get("https://wttr.in/Kathmandu?format=j1");
                setWeather(response.data);
            } catch (err) {
                setError("Failed to fetch weather data.");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // Dummy hourly forecast data for graph
    const forecastData = [
        { hour: "6 AM", temp: 10 },
        { hour: "9 AM", temp: 14 },
        { hour: "12 PM", temp: 18 },
        { hour: "3 PM", temp: 20 },
        { hour: "6 PM", temp: 16 },
        { hour: "9 PM", temp: 12 },
    ];

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div className={cn(
                "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
            )} />

            <Sidebar ref={sidebarRef} collapsed={collapsed} />

            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6 flex flex-col items-center">

                    {/* Welcome Message */}
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard</h2>
                    <p className="text-gray-500">Get the latest weather updates below</p>

                    {/* Weather Display */}
                    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6">
                        {loading && <p className="text-gray-500">Fetching weather...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {weather && (
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">{weather.nearest_area[0].areaName[0].value}, {weather.nearest_area[0].country[0].value}</h3>
                                <p className="text-gray-600">{weather.current_condition[0].weatherDesc[0].value}</p>
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-4xl font-bold">{weather.current_condition[0].temp_C}°C</span>
                                    <img
                                        src={weathers}
                                        alt="Weather Icon"
                                        className="w-16 h-16 mx-auto"
                                    />
                                </div>
                                <p className="text-gray-500">Feels like {weather.current_condition[0].FeelsLikeC}°C</p>
                                <p className="text-gray-500">Humidity: {weather.current_condition[0].humidity}%</p>
                                <p className="text-gray-500">Wind: {weather.current_condition[0].windspeedKmph} km/h</p>
                            </div>
                        )}
                    </div>

                    {/* Hourly Forecast Graph */}
                    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">Hourly Forecast</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={forecastData}>
                                <XAxis dataKey="hour" />
                                <YAxis domain={[0, 25]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="temp" stroke="#FF5733" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
