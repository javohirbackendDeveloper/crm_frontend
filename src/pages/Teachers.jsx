import React, { useEffect, useState } from "react";
import AddingTeacher from "./AddingTeacher";
import { FileCog2, Trash } from "lucide-react";
import authStore from "../stores/auth.store";
import { teacherCrm } from "../stores/teacher.crm";
import { Link, useNavigate } from "react-router-dom";

function Teachers() {
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { getTeachers, teachers, loading, deleteTeacher, getOneTeacher } =
    teacherCrm();
  const { user } = authStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (user ? user : "") {
      getTeachers(user);
    }
  }, [user, getTeachers]);

  const handleDelete = (e, teacherId) => {
    e.preventDefault();
    e.stopPropagation();

    deleteTeacher(teacherId);
  };

  const handleUpdate = (teacher, e) => {
    e.stopPropagation();
    setSelectedTeacher(teacher);
    console.log(teacher);
  };

  const handleGetOne = async (teacher) => {
    const teacherData = await getOneTeacher(teacher?._id);

    navigate("/teacher/getOneTeacher/" + teacher?._id, {
      state: { teacher: teacherData },
    });
  };

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers =
    (teachers &&
      Array.isArray(teachers) &&
      teachers.slice(indexOfFirstTeacher, indexOfLastTeacher)) ||
    [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(currentTeachers.length / teachersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <AddingTeacher teacher={selectedTeacher} />
      <form className="mt-6 mb-10">
        <input
          type="text"
          placeholder="O'qituvchi ismini yozing..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />
      </form>
      {currentTeachers.length > 0 ? (
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-gray-700">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Lastname</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Salary</th>
              <th className="py-3 px-4">Update</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentTeachers
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.firstname.toLowerCase().includes(search);
              })
              .map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-b hover:bg-gray-50"
                  onClick={() => handleGetOne(teacher)}
                >
                  <td className="py-3 px-4">
                    <img
                      src={teacher.image ? teacher.image : "/noUserImg.png"}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4">{teacher.firstname}</td>
                  <td className="py-3 px-4">{teacher.lastname}</td>
                  <td className="py-3 px-4">{teacher.location}</td>
                  <td className="py-3 px-4">{teacher.subject}</td>
                  <td className="py-3 px-4">{teacher.salary}</td>
                  <td className="py-3 px-4 transition-transform transform hover:scale-110 hover:text-blue-500">
                    <FileCog2 onClick={(e) => handleUpdate(teacher, e)} />
                  </td>
                  <td className="py-3 px-4 transition-transform transform hover:scale-110 hover:text-red-500">
                    <Trash onClick={(e) => handleDelete(e, teacher._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <span className="text-gray-500 text-2xl font-semibold text-center mx-auto mt-10">
          Sizda hali o'qituvchilar mavjud emas
        </span>
      )}

      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`py-2 px-4 mx-1 border rounded-md ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
