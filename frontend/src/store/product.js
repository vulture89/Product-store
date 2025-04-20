// zustand : for glabal state

import { create } from "zustand";

export const useProductState = create((set) => ({
    products: [],

    setProducts: (products) => set({products}),

    createProduct: async (newProduct) => {

        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success:false, message:"Please fill all fields." };
        }

        const res = await fetch('/api/products', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct) // to convert js to json
        });

        const data = await res.json(); // to conver json to js

        set((state) => ({ products: [...state.products, data.data] }));

        return { success:true, message:"New Product added." };

    },

    fetchProducts: async() => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();

        if (!data.success) return { success:false, message:data.message };

        set((state) => ({ products: state.products.filter(product => product._id != pid) }));
        return { success:true, message:data.message };
    },

    updateProduct: async(pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();

        if (!data.success) return { success:false, message:data.message };

        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));    

        return { success:true, message:"Product Updated Successfully" };
    }


}))

// deconstructing
// const { products } = useProductState();

// similiar to this 
// const [state, setState] = useState([])