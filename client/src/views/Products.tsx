import { ActionFunctionArgs, Link, useLoaderData } from "react-router";
import {
  getProducts,
  toggleProductAvailability,
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await toggleProductAvailability(Number(data.id));
}

export default function Products() {
  const products = (useLoaderData() as Product[]) ?? [];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>
        <Link
          to="products/new"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Add Product
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Availability</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-2 mt-20">
          <p className="text-center text-2xl font-black">No products yet</p>
        </div>
      )}
    </>
  );
}
