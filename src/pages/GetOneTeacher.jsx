import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { teacherCrm } from "../stores/teacher.crm";

function GetOneTeacher() {
  const location = useLocation();
  const { teacher } = location.state || {};
  const { getTeacherStudents, teacherStudents, students, groups } =
    teacherCrm();
  const navigate = useNavigate();
  if (!teacher) {
    return (
      <div className="text-center text-xl text-red-600">
        Teacher data not found!
      </div>
    );
  }

  useEffect(() => {
    if (teacher?._id) {
      getTeacherStudents(teacher?._id);
    }
  }, [teacher, getTeacherStudents]);

  const handleGetOne = (student) => {
    navigate(`/student/getOneStudent/${student?._id}`, {
      state: { student },
    });
  };
  console.log(teacherStudents);

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Teacher Info */}
      <div className="flex items-center space-x-6">
        <img
          src={
            teacher?.image?.split("")[0] === "h"
              ? teacher?.image
              : "/noUserImg.png"
          }
          alt="Teacher"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-800">
            {teacher.firstname} {teacher.lastname}
          </h1>
          <p className="text-lg text-gray-600">
            Subject: <span className="text-blue-600">{teacher.subject}</span>
          </p>
          <p className="text-lg text-gray-600">
            Salary: <span className="text-blue-600">{teacher.salary}</span>
          </p>
          <p className="text-lg text-gray-600">
            Login: <span className="text-blue-600">{teacher.login}</span>
          </p>
          <p className="text-lg text-gray-600">
            Experience:{" "}
            <span className="text-blue-600">{teacher.experience} years</span>
          </p>
        </div>
      </div>

      {/* Students Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Jami o'quvchilari soni:{" "}
          <span className="text-blue-600">{teacherStudents?.length}</span>
        </h2>
        <ul className="space-y-2">
          {teacherStudents?.length > 0 ? (
            teacherStudents.map((student, index) => (
              <li
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition duration-200"
              >
                <p
                  className="font-medium text-gray-700"
                  onClick={() => handleGetOne(student)}
                >
                  {student.firstname} {student.lastname}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No students found.</p>
          )}
        </ul>
      </div>

      {/* Groups Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Jami guruhlari soni:{" "}
          <span className="text-blue-600">{groups?.length}</span>
        </h2>
        <ul className="space-y-2">
          {groups?.length > 0 ? (
            groups.map((group, index) => (
              <li
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm hover:bg-green-50 transition duration-200"
              >
                <Link to={`/group/getOneGroup/${group?._id}`}>
                  <p className="font-medium text-gray-700">
                    {group.group_name}
                  </p>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No groups found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default GetOneTeacher;
