import {
  storeProductValidation,
  updateProductValidation,
  createPriceValidation,
  createStockValidation,
} from "../validation/validationProduct.js";
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  updateStock as updateStockService,
  getStockByDate as getStockByDateService,
  getLastId as getLastIdService,
  createPrice as createPriceService,
  getPriceByDate as getPriceByDateService,
  createStock as createStockService,
} from "../services/productService.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create product
export const createProduct = async (req, res) => {
  console.log("createProduct");
  await Promise.all(
    storeProductValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { namaBarang, stok, harga } = req.body;
  const foto = req.file ? req.file.path : null;

  // Generate kodeBarang
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const lastId = await getLastIdService();
  const kodeBarang = `BRG/${currentYear}/${currentMonth}/${(lastId + 1)
    .toString()
    .padStart(5, "0")}`;

  try {
    const product = await createProductService({
      namaBarang,
      kodeBarang,
      stok: parseInt(stok),
      harga: parseFloat(harga),
      foto,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update product
export const updateProduct = async (req, res) => {
  await Promise.all(
    updateProductValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { namaBarang, stok, harga } = req.body;
  const newFoto = req.file ? req.file.path : null;

  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If new foto is uploaded, delete the old one
    if (newFoto && product.foto) {
      const filePath = path.join(__dirname, "..", product.foto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", filePath);
        }
      });
    }

    const updatedData = {
      namaBarang,
      stok: parseInt(stok),
      harga: parseFloat(harga),
      foto: newFoto ? newFoto : product.foto,
    };

    // Update product
    const updatedProduct = await updateProductService(
      parseInt(id),
      updatedData
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the foto if it exists
    if (product.foto) {
      const filePath = path.join(__dirname, "..", product.foto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", filePath);
        }
      });
    }

    await deleteProductService(parseInt(id));
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update stock
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const stockAmount = parseInt(stock);
    if (isNaN(stockAmount)) {
      return res.status(400).json({ error: "Invalid stock value" });
    }

    const updatedProduct = await updateStockService(parseInt(id), stockAmount);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPriceByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const priceData = await getPriceByDateService(date);

    if (priceData.length === 0) {
      return res
        .status(404)
        .json({ message: "No prices found for the given date." });
    }

    const response = priceData.map((item) => ({
      namaBarang: item.masterBarang.namaBarang,
      harga: parseFloat(item.harga),
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create price
export const createPrice = async (req, res) => {
  await Promise.all(
    createPriceValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { masterBarangId, harga, tanggalBerlaku } = req.body;

  try {
    const newHarga = await createPriceService({
      masterBarangId: parseInt(masterBarangId),
      harga: String(harga),
      tanggalBerlaku: new Date(tanggalBerlaku),
    });
    res.status(201).json(newHarga);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create stock
export const createStock = async (req, res) => {
  console.log("createStock");
  await Promise.all(
    createStockValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { masterBarangId, stok, tanggalBerlaku } = req.body;

  try {
    const newStock = await createStockService({
      masterBarangId: parseInt(masterBarangId),
      stok: parseInt(stok),
      tanggalBerlaku: new Date(tanggalBerlaku),
    });
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get stock by date
export const getStockByDate = async (req, res) => {
  const { date } = req.query; // Tanggal dalam format YYYY-MM-DD

  try {
    const stockData = await getStockByDateService(date);
    const response = stockData.map((item) => ({
      namaBarang: item.masterBarang.namaBarang,
      totalStok: item.stok,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
