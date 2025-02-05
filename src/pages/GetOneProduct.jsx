import { CoinsIcon } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import studentCrm from "../stores/student.crm";
import useMarketStore from "../stores/marketCrm";

function GetOneProduct() {
  const location = useLocation();
  const { product } = location.state;
  const currentStudent = JSON.parse(
    window.localStorage.getItem("currentStudent")
  );
  const { addToPurchased } = useMarketStore();

  const handlePurchase = (currentStudent, product) => {
    if (currentStudent && product) {
      addToPurchased(currentStudent?._id, product?._id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={product.image ? product.image : ""}
        alt={product.product_name}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
      />

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {product.product_name}
      </h2>

      <p className="text-gray-600 mb-4">{product.description}</p>

      <p className="text-xl font-medium text-gray-800 flex items-center mb-4">
        Qiymati: {product.product_price}{" "}
        <CoinsIcon className="ml-2 text-yellow-500" />
      </p>

      <p
        className={`text-lg font-semibold mb-6 ${
          product.product_price <= currentStudent.student_grade
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        {product.product_price <= currentStudent.student_grade
          ? "Ballaringiz yetadi 😊"
          : "Afsuski ballaringiz yetmaydi 😔"}
      </p>

      {product.product_price <= currentStudent.student_grade ? (
        <button
          onClick={() => handlePurchase(currentStudent, product)}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Sotib olish
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default GetOneProduct;
