import { Link } from "react-router";
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
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <Link
            to={`/products/${product.id}/edit`}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Edit
          </Link>
        </div>
      </td>
    </tr>
  );
}
