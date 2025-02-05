import React, { useEffect, useState } from "react";
import studentCrm from "../stores/student.crm";
import authStore from "../stores/auth.store";
import { groupCrm } from "../stores/group.crm";

function AddingStudent({ student }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    phone_number: "",
    parent_phone_number: "",
    address: "",
    group_name: "",
    image: "",
    login: "",
    password: "",
  });

  const { addStudent, updateStudent, loading } = studentCrm();
  const { user } = authStore();
  const { getGroups, groups } = groupCrm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student) {
      updateStudent(student._id, formData);
    } else {
      addStudent(formData, user);
    }
  };

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
    getGroups(user?._id);
  }, [student, getGroups, user]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {student ? "Update Student" : "Add Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formni yaratish */}
        <div>
          <label className="block font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Parent's Phone Number
          </label>
          <input
            type="text"
            name="parent_phone_number"
            value={formData.parent_phone_number}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="groupName" className="block text-gray-600 mb-1">
            Guruh nomi
          </label>
          <select
            id="group_name"
            name="group_name"
            value={formData.group_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Guruhni tanlang</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.group_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Upload Student Image
          </label>
          <input
            type="file"
            name="studentImage"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          {student ? "Update Student" : "Add Student"}{" "}
        </button>
      </form>
    </div>
  );
}

export default AddingStudent;
