import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useFetcher,
} from "react-router";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) await deleteProduct(Number(params.id));

  return redirect("/");
}

export default function ProductDetails({ product }: { product: Product }) {
  const fetcher = useFetcher();
  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-center text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        <fetcher.Form method="post">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-gray-300 hover:cursor-pointer focus:border-gray-600`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        </fetcher.Form>
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
