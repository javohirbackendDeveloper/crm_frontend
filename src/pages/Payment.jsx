import React, { useState, useEffect } from "react";
import studentCrm from "../stores/student.crm";
import authStore from "../stores/auth.store";
import { groupCrm } from "../stores/group.crm";
import paymentCrm from "../stores/payment";

function Payment() {
  const [formData, setFormData] = useState({
    student_name: "",
    group_name: "",
    money: "",
  });
  const { user } = authStore();
  const { addPayment } = paymentCrm();
  const { getStudents, students } = studentCrm();
  const { getGroups, groups } = groupCrm();

  useEffect(() => {
    if (user && user._id) {
      getStudents(user);
      getGroups(user._id);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      addPayment(user._id, formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log({ students, groups });

  if (!students.length || !groups.length) {
    return (
      <div className="text-center text-gray-500">
        Ma'lumotlar yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        To'lovni amalga oshirish
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Select Student */}
        <div className="mb-4">
          <label
            htmlFor="student"
            className="block text-sm font-medium text-gray-700"
          >
            Talaba:
          </label>
          <select
            id="student"
            name="student_name"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.student_name}
            onChange={handleInputChange}
            required
          >
            <option value="">Talaba tanlang</option>
            {students.map((student) => (
              <option key={student._id} value={student.firstname}>
                {student.firstname} {student.lastname}
              </option>
            ))}
          </select>
        </div>

        {/* Select Group */}
        <div className="mb-4">
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700"
          >
            Guruh:
          </label>
          <select
            id="group"
            name="group_name"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.group_name}
            onChange={handleInputChange}
            required
          >
            <option value="">Guruh tanlang</option>
            {groups.map((group) => (
              <option key={group._id} value={group.group_name}>
                {group.group_name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Input */}
        <div className="mb-4">
          <label
            htmlFor="payment"
            className="block text-sm font-medium text-gray-700"
          >
            To'lov miqdori:
          </label>
          <input
            type="number"
            id="payment"
            name="money"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.money}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600"
          >
            To'lovni amalga oshirish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
