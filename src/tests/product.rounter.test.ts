import request from "supertest";
import express from "express";
import productRouter from "../routes/product.route"; 

const app = express();
app.use(express.json());
app.use("/products", productRouter);

// Mocking the product module
jest.mock("../db/product", () => ({
  selectAll: jest.fn(() => Promise.resolve([
    { id: 1, name: "Natdanai", nickname: "Tle", studentId: "6604101327", price: 1 }
  ])),
  insertProduct: jest.fn(() => Promise.resolve()),
  deleteProductById: jest.fn(() => Promise.resolve()),
  updateProduct: jest.fn(() => Promise.resolve()),
}));

describe("Product Router", () => {
  it("should get all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ID: "OK",
      result: [{ id: 1, name: "Natdanai", nickname: "Tle", studentId: "6604101327", price: 1 }],
    });
  });

  it("should insert a new product", async () => {
    const newProduct = { id: 1, name: "Natdanai", nickname: "Tle", studentId: "6604101327", price: 1 };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Product created successfully" });
  });


});
