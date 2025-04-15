import {
  InferOutput,
  object,
  string,
  number,
  boolean,
  array,
  pipe,
  decimal,
  transform,
} from "valibot";
import { toBoolean } from "../utils";

export const NumberSchema = pipe(string(), decimal(), transform(Number));
export const BooleanSchema = pipe(string(), transform(toBoolean));

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: pipe(string(), decimal(), transform(Number)),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>;
