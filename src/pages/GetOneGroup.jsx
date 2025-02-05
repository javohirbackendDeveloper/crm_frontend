import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupCrm } from "../stores/group.crm";
import noUserImg from "/noUserImg.png";
import crm_image from "/crm_image.avif";
import attendanceCrm from "../stores/attendance";
import authStore from "../stores/auth.store";
import { toast } from "react-hot-toast";
import studentCrm from "../stores/student.crm";
import { teacherCrm } from "../stores/teacher.crm";
function GetOneGroup() {
  const { id } = useParams();
  const {
    getOneGroup,
    gettedGroup,
    getAllStudents,
    gettedStudents,
    getGroupTeacher,
    gettedTeacher,
  } = groupCrm();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const { saveAttendance, attendance, getAttendanceForGroup } = attendanceCrm();
  const [attendanceLocked, setAttendanceLocked] = useState(false);
  const { user } = authStore();
  const { addGrade } = studentCrm();
  const { currentTeacher } = teacherCrm();
  useEffect(() => {
    if (id) {
      getOneGroup(id);
    }
  }, [id, getOneGroup]);

  useEffect(() => {
    if (group?._id) {
      getAllStudents(group?._id);
      getAttendanceForGroup(group._id);
    }
  }, [group?._id, getAllStudents, getAttendanceForGroup]);

  useEffect(() => {
    if (gettedGroup) {
      setGroup(gettedGroup);
    }
  }, [gettedGroup]);

  useEffect(() => {
    if (group?.teacher_data) {
      getGroupTeacher(group.teacher_data);
    }
  }, [group?.teacher_data, getGroupTeacher]);

  useEffect(() => {
    const checkAttendanceLock = () => {
      const currentDate = new Date();
      const nextAttendanceDate = new Date(group?.next_attendance_date);

      if (currentDate >= nextAttendanceDate) {
        setAttendanceLocked(true);
      }
    };

    checkAttendanceLock();
  }, [group]);

  const handleAttendanceChange = (studentId, groupId) => {
    if (!attendanceLocked && !attendance[studentId]) {
      saveAttendance(studentId, groupId);
    }
  };

  const handleGetOneTeacher = (teacher) => {
    navigate(`/teacher/getOneTeacher/${teacher?._id}`, {
      state: { teacher },
    });
  };

  if (!group) {
    return (
      <div className="text-center text-xl font-semibold">
        Guruh ma'lumotlari topilmadi.
      </div>
    );
  }

  // GRADING THE STUDENTS

  const handleGrade = (grade, student) => {
    if (user && group && student) {
      const data = {
        student_id: student?._id,
        student_grade: grade,
        group_id: group._id,
      };

      addGrade(user?._id, data);
    } else if (currentTeacher && group && student) {
      const data = {
        student_id: student?._id,
        student_grade: grade,
        group_id: group._id,
      };
      addGrade(currentTeacher?.center_id, data);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg">
      {/* Group Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={group.group_image ? group.group_image : crm_image}
          alt="Group Image"
          className="w-full max-w-xl rounded-xl shadow-xl mb-6"
        />
        <h1 className="text-4xl font-extrabold text-gray-800">
          {group.group_name}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          {group.description || "Guruh tavsifi mavjud emas"}
        </p>
      </div>

      {/* Teacher Information */}
      <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
        <img
          src={gettedTeacher?.image ? gettedTeacher.image : noUserImg}
          alt="Teacher"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
        <div onClick={() => handleGetOneTeacher(gettedTeacher)}>
          <h3 className="text-2xl font-semibold text-gray-700">
            {gettedTeacher?.firstname} {gettedTeacher?.lastname}
          </h3>
          <p className="text-sm text-gray-500">Kurs o'qituvchisi</p>
        </div>
      </div>

      {/* Students Table */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        Guruh o'quvchilari
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Student
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Parent Phone
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Attendance
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Baholash
              </th>
            </tr>
          </thead>
          <tbody>
            {gettedStudents?.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b flex items-center gap-2">
                  <img
                    src={
                      student.image?.split("")[0] === "h"
                        ? student.image
                        : noUserImg
                    }
                    alt="Student"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span>
                    {student.firstname} {student.lastname}
                  </span>
                </td>
                <td className="px-6 py-3 border-b">
                  {student.parent_phone_number}
                </td>
                <td className="px-6 py-3 border-b text-center">
                  <button
                    onClick={() =>
                      handleAttendanceChange(student._id, group._id)
                    }
                    className={`px-4 py-2 text-white rounded-full ${
                      attendance[student._id] ? "bg-green-500" : "bg-gray-300"
                    }`}
                    disabled={attendanceLocked}
                  >
                    {attendance[student._id] ? "✔" : "Mark Attendance"}
                  </button>
                </td>
                {/* GRADE BUTTONS */}
                <td className="px-6 py-3 border-b text-center">
                  <button
                    onClick={() => handleGrade(1, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleGrade(2, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    2
                  </button>
                  <button
                    onClick={() => handleGrade(3, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    3
                  </button>
                  <button
                    onClick={() => handleGrade(4, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    4
                  </button>
                  <button
                    onClick={() => handleGrade(5, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    5
                  </button>
                  <button
                    onClick={() => handleGrade(6, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    6
                  </button>
                  <button
                    onClick={() => handleGrade(7, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    7
                  </button>
                  <button
                    onClick={() => handleGrade(8, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    8
                  </button>
                  <button
                    onClick={() => handleGrade(9, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    9
                  </button>
                  <button
                    onClick={() => handleGrade(10, student)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full mr-1 hover:bg-blue-600"
                  >
                    10
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetOneGroup;
