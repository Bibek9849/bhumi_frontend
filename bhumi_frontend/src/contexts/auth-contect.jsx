import React, { createContext, useContext, useEffect, useState } from "react";

// Create the Auth Context
const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Add loading state


    // Load user and token data from localStorage when the app loads
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error(
                "Error loading authentication data from localStorage:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const isLoggedIn = () => user !== null;
    const isadmin = () => user?.role === "1";
    const isuser = () => user?.role === "0";

    const login = ({ userData, authToken }) => {
        try {
            localStorage.setItem("user", JSON.stringify({ fullName: res.data.fullName, email: res.data.email, image: res.data.image, id: res.data.id, contact: res.data.contact }));
            localStorage.setItem("token", authToken);
            setUser(userData);
            setToken(authToken);
        } catch (error) {
            console.error("Error saving authentication data to localStorage:", error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error(
                "Error clearing authentication data from localStorage:",
                error
            );
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isadmin, isuser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to Use Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};