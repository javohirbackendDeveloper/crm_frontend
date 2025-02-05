import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMarketStore from "../stores/marketCrm";
import authStore from "../stores/auth.store";
import studentCrm from "../stores/student.crm";
import { Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Market() {
  const { user } = authStore();
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    description: "",
    image: "",
    quantity: "",
  });

  const createProduct = useMarketStore((state) => state.createProduct);
  const { getAllProducts, products, deleteProduct, updateProduct } =
    useMarketStore();

  const currentStudent = JSON.parse(
    window.localStorage.getItem("currentStudent")
  );

  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (editingProduct) {
        // Update qilish
        await updateProduct(editingProduct._id, formData); // updateProduct API'ga so'rov yuboramiz
        setEditingProduct(null); // Update tugagach, tahrirlashni to'xtatamiz
        toast.success("Mahsulot muvaffaqiyatli yangilandi!");
      } else {
        // Yangi mahsulot yaratish
        await createProduct(user?._id, formData);
        toast.success("Mahsulot yaratildi!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      getAllProducts(user?._id);
    } else if (currentStudent) {
      getAllProducts(currentStudent?.center_id);
    }
  }, [getAllProducts, user, updateProduct, createProduct]);

  const handleEdit = (product) => {
    setFormData({
      product_name: product.product_name,
      product_price: product.product_price,
      description: product.description,
      image: product.image,
      quantity: product.quantity,
    });
    setEditingProduct(product);
  };

  const handleNavigate = (product) => {
    navigate(`/getOneProduct/${product?._id}`, { state: { product } });
  };

  const handleDelete = (product_id) => {
    deleteProduct(product_id);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {user ? (
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 shadow-md rounded-lg"
          >
            {/* Mahsulot rasmiga fayl yuklash */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mahsulot rasmi
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mahsulot nomi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mahsulot nomi
              </label>
              <input
                type="text"
                name="product_name"
                placeholder="Mahsulot nomini kiriting"
                value={formData.product_name}
                onChange={(e) =>
                  setFormData({ ...formData, product_name: e.target.value })
                }
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mahsulot narxi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mahsulot narxi
              </label>
              <input
                type="number"
                name="product_price"
                placeholder="Mahsulot narxini kiriting"
                value={formData.product_price}
                onChange={(e) =>
                  setFormData({ ...formData, product_price: e.target.value })
                }
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mahsulot miqdori */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mahsulot miqdori
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Mahsulot miqdorini kiriting"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mahsulot haqida qisqacha ma'lumot */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mahsulot haqida qisqacha
              </label>
              <textarea
                name="description"
                placeholder="Mahsulot haqida qisqacha ma'lumot kiriting"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Yaratish yoki yangilash tugmasi */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {editingProduct ? "Yangilash" : "Yaratish"}
              </button>
            </div>
          </form>

          {/* Mahsulotlar ro'yxati */}
          {(currentStudent || user) && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Mahsulotlar
              </h2>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-700">
                {product.product_name}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-md font-medium text-gray-900 mt-2">
                Narxi: {product.product_price}{" "}
                <Coins className="text-yellow-500 inline" />
              </p>
              <p className="text-sm text-gray-600">
                Miqdori: {product.quantity} ta
              </p>
              {currentStudent &&
                (product.quantity > 0 ? (
                  product.product_price <= currentStudent.student_grade ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                      onClick={() => handleNavigate(product)}
                    >
                      Ballaringiz yetadi
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigate(product)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                      Ballaringiz yetmaydi
                    </button>
                  )
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Mahsulot tugagan
                  </button>
                ))}

              {user && !currentStudent && (
                <>
                  <div className="mt-4 flex gap-4 justify-start">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    >
                      Yangilash
                    </button>
                    {user && (
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        O'chirish
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Mahsulotlar mavjud emas</p>
        )}
      </div>
    </div>
  );
}

export default Market;
