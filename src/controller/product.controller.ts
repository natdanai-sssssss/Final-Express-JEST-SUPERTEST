import { Request, Response } from "express";
import product from "../db/product"; // สมมติว่ามีการจัดการฐานข้อมูลในไฟล์นี้

// Handler เพื่อดึงข้อมูลผลิตภัณฑ์ทั้งหมด
const getAll = async (req: Request, res: Response) => {
  try {
    const products = await product.selectAll(); // เรียกใช้ฟังก์ชันที่ดึงข้อมูลผลิตภัณฑ์
    res.status(200).send({
      ID: "OK",
      result: products,
    });
  } catch (err) {
    res.status(500).send({
      message: "DATABASE ERROR",
      error: err.code,
    });
  }
};

// Handler เพื่อลบผลิตภัณฑ์ตาม ID
const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send({
      message: "Invalid ID format",
    });
  }

  try {
    await product.deleteProductById(id);
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(`Error deleting product with ID ${id}:`, err);
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error",
    });
  }
};

// Handler เพื่อเพิ่มผลิตภัณฑ์ใหม่
const insertProduct = async (req: Request, res: Response) => {
  const { id, name, nickname, studentId, price } = req.body; // เพิ่ม nickname และ studentId

  // การตรวจสอบข้อมูลพื้นฐาน
  if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof nickname !== "string" ||
    typeof studentId !== "string" ||
    typeof price !== "number"
  ) {
    return res.status(400).send({
      message: "Invalid input data",
    });
  }

  try {
    await product.insertProduct(id, name, nickname, studentId, price); // เรียกใช้ฟังก์ชันเพิ่มผลิตภัณฑ์
    res.status(201).send({
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error",
    });
  }
};

// Handler เพื่ออัปเดตผลิตภัณฑ์ที่มีอยู่ตาม ID
const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, nickname, studentId, price } = req.body; // เพิ่ม nickname และ studentId

  // การตรวจสอบข้อมูลพื้นฐาน
  if (isNaN(id) || typeof name !== "string" || typeof nickname !== "string" || typeof studentId !== "string" || typeof price !== "number") {
    return res.status(400).send({
      message: "Invalid input data",
    });
  }

  try {
    await product.updateProduct(id, name, nickname, studentId, price); // เรียกใช้ฟังก์ชันอัปเดตผลิตภัณฑ์
    res.status(200).send({
      message: `Product with ID ${id} updated successfully`,
    });
  } catch (err) {
    console.error(`Error updating product with ID ${id}:`, err);
    res.status(500).send({
      message: "DATABASE ERROR",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export default { getAll, deleteById, insertProduct, updateProduct };
