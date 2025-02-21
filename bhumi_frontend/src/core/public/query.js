import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";
// =============================== USER ============================================================
export const useRegisterUser = () => {
    return useMutation({
        mutationKey: "Register_User",
        mutationFn: (data) => {
            console.log(data)
            return axios.post("http://localhost:3000/api/users/register", { data })
        }
    });
};

export const useLoginUser = () => {
    return useMutation({
        mutationKey: "Login_User",
        mutationFn: (data) => {
            console.log(data)
            return axios.post("http://localhost:3000/api/users/login", { data })
        }
    });
};
// =============================== CATEGORY =========================================================


export const useProductCategory = () => {
    return useMutation({
        mutationKey: "Product_Category",

        mutationFn: (data) => {
            console.log(data)
            return axios.post("http://localhost:3000/api/category/save", { data })
        }
    });
};
export const useUpdateCategory = () => {
    return useMutation({
        mutationKey: "Update_Category",
        mutationFn: (data) => {
            if (!data.id) {
                throw new Error("ID is required for updating the category");
            }
            console.log("Updating category with ID:", data.id);
            return axios.put(`http://localhost:3000/api/category/${data.id}`, data);
        }
    });
};

export const useGetCategory = () => {
    return useQuery({
        queryKey: "GET_PRODUCT_CATEGORY",
        queryFn: () => {
            return axios.get("http://localhost:3000/api/category")
        }
    });
};

export const useGetCategoryById = (id) => {

    console.log(id)
    return useQuery({
        queryKey: ["GET_Category_BY_ID", id],
        queryFn: () => {
            return axios.get(`http://localhost:3000/api/category/${id}`);
        },
        enabled: !!id
    });
};

export const useDeleteCategory = () => {
    return useMutation({
        mutationKey: "DELETE_CATEGORY",
        mutationFn: async (id) => {

            return axios.delete(`http://localhost:3000/api/category/${id}`);
        }
    });
};


// ===================================== PRODUCT =========================================================================


export const useSaveProduct = () => {
    return useMutation({
        mutationKey: "SAVE_PRODUCT",
        mutationFn: (data) => {
            console.log(data)
            return axios.post("http://localhost:3000/api/product/create", data)
        }
    });
};
export const useGetProduct = () => {
    return useQuery({
        queryKey: "GET_PRODUCT",
        queryFn: () => {
            return axios.get("http://localhost:3000/api/product/getAllProduct")
        }
    });
};



export const useGetList = () => {
    return useQuery({
        queryKey: "GET_PRODUCT",
        queryFn: () => {
            return axios.get("http://localhost:3000/api/product/getAllProduct")
        }
    });
};

export const useProductGetById = (id) => {

    console.log(id)
    return useQuery({
        queryKey: ["GET_PRODUCT_BY_ID", id],
        queryFn: () => {
            return axios.get(`http://localhost:3000/api/product/${id}`);
        },
    });
};
export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: "DELETE_PRODUCT",
        mutationFn: async (id) => {

            return axios.delete(`http://localhost:3000/api/product/${id}`);
        }
    });
};

// ======================================= ORDER ============================================================

export const useOderUser = () => {
    return useMutation({
        mutationKey: "Order_User",
        mutationFn: (data) => {
            console.log(data)
            return axios.post("http://localhost:3000/api/details/save", { data })
        }
    });
};
