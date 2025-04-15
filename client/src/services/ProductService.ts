import { safeParse, parse } from "valibot";
import axios from "axios";
import {
  BooleanSchema,
  DraftProductSchema,
  NumberSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: parse(NumberSchema, data.price),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log("Error adding product: ", error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Error fetching products");
    }
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
}

export async function getProductsById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error(`Error fetching product ${id}`);
    }
  } catch (error) {
    console.log("Error fetching product: ", error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: data.price,
      availability: parse(BooleanSchema, data.availability),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, {
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log("Error updating product: ", error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log("Error deleting product: ", error);
  }
}

export async function toggleProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log("Error changing product availability: ", error);
  }
}
