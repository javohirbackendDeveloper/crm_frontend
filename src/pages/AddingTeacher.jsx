import React, { useEffect, useState } from "react";
import { teacherCrm } from "../stores/teacher.crm";
import authStore from "../stores/auth.store";

function AddingTeacher({ teacher }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone_number: "",
    subject: "",
    experience: "",
    salary: 0,
    location: "",
    login: "",
    password: "",
    image: "",
  });

  const { addTeacher, getTeachers, updateTeacher } = teacherCrm();
  const user = JSON.parse(window.localStorage.getItem("user")) || null;

  const subjects = ["Math", "Science", "History", "Literature", "Art"];
  const experiences = ["Less than 1 year", "1-3 years", "More than 3 years"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  useEffect(() => {
    if (teacher) {
      setFormData({ ...teacher });
    }
  }, [teacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacher) {
      updateTeacher(teacher._id, formData);
    } else {
      addTeacher(formData, user);
    }
  };

  console.log(user);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
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
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
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
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-3 years">1-3 years</option>
            <option value="More than 3 years">More than 3 years</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Upload Photo
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
}

export default AddingTeacher;
