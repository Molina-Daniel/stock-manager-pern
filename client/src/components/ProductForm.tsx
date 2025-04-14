import { useState, ChangeEvent } from "react";
import { Product } from "../types";

export default function ProductForm({ product }: { product?: Product }) {
  const [priceValue, setPriceValue] = useState<string>(
    product?.price?.toString() || ""
  );

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setPriceValue(value);
    }
  };

  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Product Name:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Product Name"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Price:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Product Price, eg. 19.99, 299.50"
          name="price"
          value={priceValue}
          onChange={handlePriceChange}
          step="0.01"
          min="0.01"
          pattern="\d+(\.\d{1,2})?"
          title="Please enter a valid price with up to 2 decimal places"
        />
        <small className="text-gray-500">
          Enter a price with up to 2 decimal places
        </small>
      </div>
    </>
  );
}
