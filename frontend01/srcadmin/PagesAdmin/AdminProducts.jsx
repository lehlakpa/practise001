import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 120,
    stock: 34,
    status: "Active",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Fashion",
    price: 80,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 150,
    stock: 12,
    status: "Active",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>

        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Stock</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-center">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
