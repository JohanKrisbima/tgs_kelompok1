import express from "express";
import { getProduct, showAdd, addProduct, deleteProduct, viewUpdate, updateProduct } from "../controller/Product.js";
import { getDashboard } from "../controller/Dashboard.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/product", getProduct);
router.get("/addProduct", showAdd);

router.post("/product/add", addProduct);

// router.get("/product/delete/:id", deleteProduct);

router.delete("/products/delete/:id", deleteProduct);

router.get("/products/update/:id", viewUpdate);

router.put("/product/update/:id", updateProduct);

export default router;
