import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.masterBarang.findMany(); // Menggunakan masterBarang
};

export const getLastId = async () => {
  const lastProduct = await prisma.masterBarang.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  return lastProduct ? lastProduct.id : 0;
};

export const getProductById = async (id) => {
  return await prisma.masterBarang.findUnique({ where: { id: parseInt(id) } });
};

export const createProduct = async (data) => {
  return await prisma.masterBarang.create({ data });
};

export const updateProduct = async (id, data) => {
  return await prisma.masterBarang.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.masterBarang.delete({ where: { id: parseInt(id) } });
};

// Tambahkan fungsi untuk mengupdate stok
export const updateStock = async (id, stock) => {
  // Pastikan stok tidak negatif
  if (stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  return await prisma.masterBarang.update({
    where: { id: parseInt(id) },
    data: { stok: stock },
  });
};

// Fungsi untuk mendapatkan stok berdasarkan tanggal
export const getStockByDate = async (date) => {
  return await prisma.stokBarang.findMany({
    where: {
      tanggalBerlaku: new Date(date), // Menggunakan tanggal yang diberikan
    },
    include: {
      masterBarang: {
        select: {
          namaBarang: true, // Mengambil nama barang
        },
      },
    },
  });
};

// Fungsi untuk mendapatkan harga berdasarkan tanggal
export const getPriceByDate = async (date) => {
  return await prisma.hargaBarang.findMany({
    where: {
      tanggalBerlaku: new Date(date), // Menggunakan tanggal yang diberikan
    },
    include: {
      masterBarang: {
        select: {
          namaBarang: true, // Mengambil nama barang
        },
      },
    },
  });
};

export const createPrice = async (data) => {
  return await prisma.hargaBarang.create({ data });
};

export const createStock = async (data) => {
  return await prisma.stokBarang.create({ data });
};
