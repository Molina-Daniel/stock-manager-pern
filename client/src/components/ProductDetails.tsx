import { Product } from "../types";
import { formatCurrency } from "../utils";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-center text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        {product.availability ? "Available" : "Unavailable"}
      </td>
    </tr>
  );
}
