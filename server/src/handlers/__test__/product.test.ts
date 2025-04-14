import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation error", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should validate the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "New item",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should validate the price is a number and grater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "New item",
      price: "Hello",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(1);
  });

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "New item",
      price: 50,
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("should check if api/products URL exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application*\/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");
  });

  it("check if it's a valid product id", async () => {
    const productId = "hello";
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Not a valid ID");
  });

  it("get a JSON reponse for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("check if it's a valid product id", async () => {
    const productId = "hello";
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Test item",
        price: 300,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Not a valid ID");
  });

  it("should display validation error message when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(6);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should validate price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Updated item",
      price: -300,
      availability: false,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Price must be greater than 0");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Updated item",
        price: 100,
        availability: false,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should update an existing product with valid data", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Updated item",
        price: 100,
        availability: true,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  it("should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should update product availability", async () => {
    const response = await request(server).patch("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toEqual(false);

    expect(response.status).not.toBe(404);
    expect(response.body.data.availability).not.toEqual(true);
  });
});

describe("DELETE /api/products/:id", () => {
  it("should check a valid product ID", async () => {
    const response = await request(server).delete(
      "/api/products/not-valid-url"
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Not a valid ID");
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");

    expect(response.status).not.toBe(204);
  });

  it("should delete an existing product", async () => {
    const response = await request(server).delete(`/api/products/1`);
    expect(response.status).toBe(200);

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
