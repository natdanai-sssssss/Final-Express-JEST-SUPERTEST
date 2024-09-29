import { Router } from "express";
import productController from "../controller/product.controller"; // สมมติว่าไฟล์คอนโทรลเลอร์อยู่ในไดเรกทอรีที่เป็นพ่อของไฟล์นี้

const productRouter = Router();

// Endpoint เพื่อดึงข้อมูลผลิตภัณฑ์ทั้งหมด
productRouter.get("/", productController.getAll);

// Endpoint เพื่อลบผลิตภัณฑ์ตาม ID
productRouter.delete("/:id", productController.deleteById);

// Endpoint เพื่อเพิ่มผลิตภัณฑ์ใหม่
productRouter.post("/", productController.insertProduct);

// Endpoint เพื่ออัปเดตผลิตภัณฑ์ที่มีอยู่ตาม ID
productRouter.put("/:id", productController.updateProduct);

export default productRouter;
