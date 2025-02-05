import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import studentCrm from "../stores/student.crm";
import authStore from "../stores/auth.store";

// Chart.js modulini ro'yxatga olish
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function Statistics() {
  const { getStudents, students: fetchedStudents } = studentCrm();
  const { user, getStatistics, statistic } = authStore();

  useEffect(() => {
    if (user) {
      getStatistics(user?._id);
    }
  }, [user, getStatistics]);
  const totalEmployees =
    statistic &&
    Array.isArray(statistic?.totalTeachers) &&
    statistic.totalTeachers.length;
  const totalStudents =
    statistic &&
    Array.isArray(statistic?.totalStudents) &&
    statistic.totalStudents.length;
  const totalPosts =
    statistic &&
    Array.isArray(statistic?.totalPosts) &&
    statistic.totalPosts.length;
  const totalGroups =
    statistic &&
    Array.isArray(statistic?.totalGroups) &&
    statistic.totalGroups.length;
  const todaysAttendance = 15;
  const posts = 10;
  const todaysAbsentees = totalStudents - todaysAttendance;
  const data = {
    labels: ["Bugun Kelganlar", "Bugun Kelmaganlar"],
    datasets: [
      {
        label: "O'quvchilar Statistikasi",
        data: [todaysAttendance, todaysAbsentees],
        backgroundColor: ["#34D399", "#F87171"],
        borderColor: ["#34D399", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  const [sortedStudents, setSortedStudents] = useState([]);

  useEffect(() => {
    if (user) {
      getStudents(user);
    }
  }, [user, getStudents]);

  // useEffect(() => {
  //   if (gr) {
  //     getOneGroup(user);
  //   }
  // }, [user, getStudents]);

  useEffect(() => {
    if (fetchedStudents) {
      // O'quvchilarni baho bo'yicha kamayish tartibida sortlash
      const sorted = [...fetchedStudents].sort(
        (a, b) => a.student_grade - b.student_grade
      );
      setSortedStudents(sorted);
    }
  }, [fetchedStudents]);

  console.log(statistic);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Jami o'quv markazidagi ishchilar soni */}
      {user ? (
        <>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Jami Ishchilar</h3>
            <p className="text-xl mt-4">{totalEmployees}</p>
          </div>

          {/* 2. Jami o'quvchilar soni va bugun kelganlar soni */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">O'quvchilar</h3>
            <p className="text-xl mt-4">{totalStudents}</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Postlar</h3>
            <p className="text-xl mt-4">{totalPosts} ta</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Guruhlar</h3>
            <p className="text-xl mt-4">{totalGroups} ta</p>
          </div>

          {/* 4. Bugun kelmagan o'quvchilar soni */}
          {/* <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Bugun Kelmaganlar</h3>
            <p className="text-xl mt-4">{todaysAbsentees}</p>
          </div> */}

          <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-lg mt-6 block">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Kelgan va Kelmagan O'quvchilar
            </h3>
            <div className="w-full h-64">
              <Bar
                data={data}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {/* O'quvchilar reytingi va tartib raqami */}
      <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          O'quvchilar Baholari Bo'yicha Reyting
        </h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Tartib
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                O'quvchi
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-700">
                Baho
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b text-center">{index + 1}</td>
                <td className="px-6 py-3 border-b">
                  {student.firstname} {student.lastname}
                </td>
                <td className="px-6 py-3 border-b text-center">
                  {student.student_grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistics;
