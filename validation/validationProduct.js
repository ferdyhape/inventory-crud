import { body } from "express-validator";

// Validasi untuk menyimpan produk
export const storeProductValidation = [
  body("namaBarang")
    .notEmpty()
    .isString()
    .withMessage("Nama barang is required"),
  body("stok")
    .notEmpty()
    .isInt()
    .withMessage("Stok is required and must be an integer"),
  body("harga")
    .notEmpty()
    .isFloat()
    .withMessage("Harga is required and must be a float"),
  body("foto").optional(),
];

// Validasi untuk memperbarui produk
export const updateProductValidation = [
  body("namaBarang")
    .notEmpty()
    .isString()
    .withMessage("Nama barang is required"),
  body("stok")
    .notEmpty()
    .isInt()
    .withMessage("Stok is required and must be an integer"),
  body("harga")
    .notEmpty()
    .isFloat()
    .withMessage("Harga is required and must be a float"),
  body("foto").optional(),
];

export const createPriceValidation = [
  body("masterBarangId")
    .notEmpty()
    .isInt()
    .withMessage("Master Barang ID is required and must be an integer"),
  body("harga")
    .notEmpty()
    .isFloat()
    .withMessage("Harga is required and must be a float"),
  body("tanggalBerlaku")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage(
      "Tanggal berlaku is required and must be a valid date (YYYY-MM-DD)"
    ),
];

export const createStockValidation = [
  body("masterBarangId")
    .notEmpty()
    .isInt()
    .withMessage("Master Barang ID is required and must be an integer"),
  body("stok")
    .notEmpty()
    .isInt()
    .withMessage("Stok is required and must be an integer"),
  body("tanggalBerlaku")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("Tanggal is required and must be a valid date (YYYY-MM-DD)"),
];
