import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getStockByDate,
  getPriceByDate,
  createPrice,
  createStock,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Route for getting all products
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Route for creating a product with file upload
router.post("/", upload.single("foto"), createProduct);
router.post("/update/:id", upload.single("foto"), updateProduct);
router.delete("/:id", deleteProduct);
router.post("/price", createPrice);
router.put("/:id/stock", updateStock);
router.post("/stock", createStock);

// Route for getting price by date
router.get("/price/date", getPriceByDate);
router.get("/stock/date", getStockByDate);

export default router;
