import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Creating product POST
export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all the fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success:true, data:newProduct });
    } catch (error) {
        console.error("Error creating product : " , error.message);
        res.status(500).json({ success:false, message:"Server error !" })
    }
};


// Deleting product DELETE
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success:false, message:"Invalid Product ID"})
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(300).json({ success:true, message:"Product deleted"})
    } catch (error) {
        console.log("Error deleting product : ", error.message);
        res.status(500).json({ success:false, message:"Server error"})
    }
};


// Get All Products GET
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success:true, data:products })
    } catch (error) {
        console.log("Error reciving all products : ", error.message);
        res.status(500).json({ succcess:false, message:"Server Error" })
    }
};


// Update Prodcut PUT
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success:false, message:"Invalid Product ID"})
    }

    try {
        const updatedProdcut = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success:true, data: updatedProdcut })
    } catch (error) {
        console.log("Error updating product: ", error.message);
        res.status(500).json({ success:false, message:"Failed to update product"})
    }
};