import { ActionFunctionArgs, Form, Link, redirect } from "react-router";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) await deleteProduct(Number(params.id));

  return redirect("/");
}

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
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Delete?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Delete"
              className="bg-red-600 text-white cursor-pointer rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
