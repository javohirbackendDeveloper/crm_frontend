import React, { useState, useEffect } from "react";
import { FileCog, Trash2 } from "lucide-react";
import AddingStudent from "./AddingStudent";
import studentCrm from "../stores/student.crm";
import authStore from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";
import { teacherCrm } from "../stores/teacher.crm";

function Students() {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();
  const { getStudents, getOneStudent, students, deleteStudent, gettedStudent } =
    studentCrm();
  const { user } = authStore();
  const { currentTeacher, getTeacherStudents, teacherStudents } = teacherCrm();
  const [search, setSearch] = useState("");

  // PAGINATION
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    (Array.isArray(students) &&
      students.length > 0 &&
      students.slice(indexOfFirstStudent, indexOfLastStudent)) ||
    (Array.isArray(teacherStudents) &&
      teacherStudents.length > 0 &&
      teacherStudents.slice(indexOfFirstStudent, indexOfLastStudent));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students?.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (studentId, e) => {
    e.stopPropagation(); // `onClick` ni faqat delete tugmasida ishlatish
    if (window.confirm("Siz ushbu o'quvchini o'chirishni xohlaysizmi?")) {
      await deleteStudent(studentId);
    }
  };

  const handleUpdate = (student, e) => {
    e.stopPropagation();
    setSelectedStudent(student);
  };

  const handleGetOne = (id, student) => {
    getOneStudent(id); // Ma'lumotni olish
    navigate(`/student/getOneStudent/${id}`, { state: { student } }); // Ma'lumotlar sahifasiga o'tish
  };

  useEffect(() => {
    if (user) {
      getStudents(user);
    } else if (currentTeacher) {
      getTeacherStudents(currentTeacher?._id);
    }
  }, [getStudents, user]);

  console.log(search);

  return (
    <div className="overflow-x-auto p-4">
      {user ? <AddingStudent student={selectedStudent} /> : ""}
      <form className="mt-6 mb-10">
        <input
          type="text"
          placeholder="Talaba ismini yozing..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />
      </form>

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100 text-left text-gray-700">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Age</th>
            <th className="py-3 px-4">Address</th>
            <th className="py-3 px-4">Login</th>
            <th className="py-3 px-4">Jami baholari</th>
            {user && (
              <>
                <th className="py-3 px-4">Update</th>
                <th className="py-3 px-4">Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentStudents &&
            currentStudents
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.firstname.toLowerCase().includes(search);
              })
              .map((student) => (
                <tr
                  key={student?._id}
                  className="border-b hover:bg-gray-50"
                  onClick={() => handleGetOne(student?._id, student)} // Faqat tr bosilganda ishlaydi
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        student?.image?.split("")[0] === "h"
                          ? student.image
                          : "/noUserImg.png"
                      }
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/getOneStudent/${student?._id}`}>
                      {student.firstname} {student.lastname}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{student.age}</td>
                  <td className="py-3 px-4">{student.address}</td>
                  <td className="py-3 px-4">{student.login}</td>
                  <td className="py-3 px-4">
                    {student.student_grade ? student?.student_grade : 0}
                  </td>

                  {user && (
                    <>
                      <td className="py-3 px-4 flex space-x-2">
                        <FileCog
                          className="cursor-pointer"
                          onClick={(e) => handleUpdate(student, e)}
                        />
                      </td>
                      <td>
                        <Trash2
                          className="cursor-pointer"
                          onClick={(e) => handleDelete(student._id, e)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
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

export default Students;
