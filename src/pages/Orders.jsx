import React, { useEffect } from "react";
import useMarketStore from "../stores/marketCrm";
import authStore from "../stores/auth.store";
import studentCrm from "../stores/student.crm";

function Orders() {
  const {
    getAllOrders,
    orders,
    deleteOrder,
    getAllOrdersOfStudent,
    studentOrders,
  } = useMarketStore();
  const { user } = authStore();
  const { currentStudent } = studentCrm();

  useEffect(() => {
    if (user) {
      getAllOrders(user?._id);
    } else if (currentStudent) {
      getAllOrdersOfStudent(currentStudent?._id);
    }
  }, [getAllOrders, getAllOrdersOfStudent, user, currentStudent]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(date).toLocaleString("en-US", options);
  };

  const handleDelete = async (orderId) => {
    if (
      window.confirm(
        "Ushbu buyurtma haqiqatdan ham yetkazildimi? Chunki bu o'chirib yuboriladi"
      )
    ) {
      await deleteOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Agar user yoki currentStudent bo'lsa, buyurtmalarni ko'rsatamiz */}
      {user && (
        <div>
          {orders.length > 0 && Array.isArray(orders) ? (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="border-b py-4 mb-4 flex items-start gap-4"
              >
                {/* Order Number */}
                <div className="flex-shrink-0 text-lg font-bold">
                  {index + 1}
                </div>

                {/* Order Image */}
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={
                    order.student.image ? order.student.image : "/noUserImg.png"
                  }
                  alt="Student"
                />

                {/* Order Details */}
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-xl font-semibold">{`${order.student.firstname} ${order.student.lastname}`}</h1>
                  <p className="text-gray-500">{order.student.phone_number}</p>
                  <p className="text-gray-500">
                    {order.student.parent_phone_number}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleDelete(order?._id)}
                    className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all"
                  >
                    Yetkazildi
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-col items-center">
                  <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={order.product.image}
                    alt={order.product.product_name}
                  />
                  <p className="mt-2 font-medium">
                    {order.product.product_name}
                  </p>
                  <p className="text-lg font-semibold">
                    {order.product.product_price} $
                  </p>
                </div>

                {/* Purchase Date */}
                <div className="flex-shrink-0 mt-2 text-sm text-gray-600">
                  <p>
                    Buyurtma berilgan sanasi: {formatDate(order.purchased_date)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="bg-teal-950 text-white font-bold text-2xl py-4 px-6 rounded-lg shadow-md text-center">
              {(user && "Hali hech kim buyurtma qilmadi") ||
                "Hali hech kim buyurtma qilgani yo'q"}
            </h1>
          )}
        </div>
      )}

      {/* Agar studentOrders mavjud bo'lsa, uni map qilib chiqaramiz */}
      {currentStudent && (
        <div>
          {(studentOrders.length > 0 &&
            studentOrders.map((order, index) => (
              <div
                key={order._id}
                className="border-b py-4 mb-4 flex items-start gap-4"
              >
                {/* Student Order Number */}
                <div className="flex-shrink-0 text-lg font-bold">
                  {index + 1}
                </div>

                {/* Student Order Image */}
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={
                    order.student.image ? order.student.image : "/noUserImg.png"
                  }
                  alt="Student"
                />

                {/* Student Order Details */}
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-xl font-semibold">{`${order.student.firstname} ${order.student.lastname}`}</h1>
                  <p className="text-gray-500">{order.student.phone_number}</p>
                  <p className="text-gray-500">
                    {order.student.parent_phone_number}
                  </p>
                </div>

                {/* Product Details */}
                <div className="flex flex-col items-center">
                  <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={order.product.image}
                    alt={order.product.product_name}
                  />
                  <p className="mt-2 font-medium">
                    {order.product.product_name}
                  </p>
                  <p className="text-lg font-semibold">
                    {order.product.product_price} $
                  </p>
                </div>

                {/* Purchase Date */}
                <div className="flex-shrink-0 mt-2 text-sm text-gray-600">
                  <p>
                    Buyurtma berilgan sanasi: {formatDate(order.purchased_date)}
                  </p>
                </div>
              </div>
            ))) || (
            <>
              <h1 className="bg-teal-950 text-white font-bold text-2xl py-4 px-6 rounded-lg shadow-md text-center">
                "Sizda hali hech qanday buyurtmalar yo'q"
              </h1>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
