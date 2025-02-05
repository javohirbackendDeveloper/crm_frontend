import React, { useEffect, useState } from "react";
import { teacherCrm } from "../stores/teacher.crm";
import authStore from "../stores/auth.store";
import { groupCrm } from "../stores/group.crm";

function AddingGroup({ group }) {
  const [formData, setFormData] = useState({
    group_name: "",
    start_date: "",
    days: [],
    start_time: "",
    age_range_end: "",
    age_range_start: "",
    duration: "",
    description: "",
    group_image: "",
    teacher_data: "",
    money: 0,
  });

  const { getTeachers, loading, teachers } = teacherCrm();
  const { user } = authStore();
  const { addGroup, getGroups, updateGroup } = groupCrm();
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (user) {
      getTeachers(user);
    }
  }, [getTeachers, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      days: checked
        ? [...formData.days, value]
        : formData.days.filter((day) => day !== value),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, group_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (group) {
      updateGroup(group._id, formData);
    } else {
      addGroup(formData, user);
    }
  };

  useEffect(() => {
    if (group) {
      setFormData({ ...group });
    }
    getGroups(user);
  }, [group, getGroups, user]);

  console.log(formData);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Group Name</label>
          <input
            type="text"
            name="group_name"
            value={formData.group_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Kurs boshlanish sanasi */}
        <div>
          <label className="block font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Kunlar */}
        <div>
          <label className="block font-medium text-gray-700">Days</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.days.includes(day)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Dars boshlanish vaqti */}
        <div>
          <label className="block font-medium text-gray-700">
            Class Start Time
          </label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Yosh diapazoni */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-medium text-gray-700">
              Age Range Start
            </label>
            <input
              type="number"
              name="age_range_start"
              value={formData.age_range_start}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block font-medium text-gray-700">
              Age Range End
            </label>
            <input
              type="number"
              name="age_range_end"
              value={formData.age_range_end}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        {/* PAYMENT */}
        <div className="w-1/2">
          <label className="block font-medium text-gray-700">
            Kurs oylik to'lovi
          </label>
          <input
            type="number"
            name="money"
            value={formData.money}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Davomiylik */}
        <div>
          <label className="block font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 2 months"
            required
          />
        </div>

        {/* Guruh rasmi */}
        <div>
          <label className="block font-medium text-gray-700">Group Image</label>
          <input
            type="file"
            name="group_image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Tavsif */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* O'qituvchini tanlash */}
        <div>
          <label className="block font-medium text-gray-700">Teacher</label>
          <select
            name="teacher_data"
            value={formData.teacher_data}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstname}
              </option>
            ))}
          </select>
        </div>

        {/* Formni yuborish */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          {group ? "Update group" : "Add group"}
        </button>
      </form>
    </div>
  );
}

export default AddingGroup;
