import express from "express";
import { deleteProduct, getAllProducts, createProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;