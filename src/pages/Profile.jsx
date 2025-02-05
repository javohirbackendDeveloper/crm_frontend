import { Pencil, Plus } from "lucide-react";
import authStore from "../stores/auth.store";
import studentCrm from "../stores/student.crm";
import { teacherCrm } from "../stores/teacher.crm";
import { useState, useEffect } from "react";

function Profile() {
  const { user } = authStore();
  const { currentStudent } = studentCrm();
  const { currentTeacher } = teacherCrm();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    image: user?.user_image || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        image: user.user_image,
      });
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mt-6">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={formData.image || "/noUserImg.png"}
              alt="User Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            {/* Rasmni yangilash imkoniyatini olib tashlash */}
          </div>
          <div className="space-y-2 flex-1">
            <p className="text-2xl font-semibold text-gray-900">
              {formData.username}
            </p>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-gray-600">
              ********* {/* Parolni ko'rsatish */}
            </p>
          </div>
        </div>
      ) : currentStudent ? (
        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Shaxsiy ma'lumotlar
            </h2>
            {/* Studentni tahrirlash tugmasini olib tashladik */}
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
            <div className="w-32 h-32">
              <img
                src={currentStudent.image || "/default-avatar.png"}
                alt="Student"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold">
                {currentStudent.firstname} {currentStudent.lastname}
              </p>
              <p className="text-gray-600">Yosh: {currentStudent.age}</p>
              <p className="text-gray-600">
                Jinsi: {currentStudent.gender === "Male" ? "Erkak" : "Ayol"}
              </p>
              {currentStudent.phone_number && (
                <p className="text-gray-600">
                  Telefon raqam: {currentStudent.phone_number}
                </p>
              )}
              <p className="text-gray-600">
                Ota-onasining telefon raqami:{" "}
                {currentStudent.parent_phone_number}
              </p>
              <p className="text-gray-600">Manzil: {currentStudent.address}</p>
              <p className="text-gray-600">Login: {currentStudent.login}</p>
              <p className="text-gray-600 flex items-center">
                Parol: ***** {/* Parolni ko'rsatish */}
              </p>
            </div>
          </div>
        </div>
      ) : currentTeacher ? (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
          <div className="relative">
            <div className="flex flex-col items-center space-y-4 bg-blue-100 p-6 rounded-lg shadow-md">
              <img
                src={currentTeacher.image || "/noUserImg.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
              />
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentTeacher.firstname} {currentTeacher.lastname}
              </h1>
              <p className="text-gray-600">
                Jinsi: {currentTeacher.gender === "male" ? "Erkak" : "Ayol"}
              </p>
              <p className="text-gray-600">
                Telefon raqam: {currentTeacher.phone_number}
              </p>
              <p className="text-gray-600">Login: {currentTeacher.login}</p>
              <p className="text-gray-600">Manzil: {currentTeacher.location}</p>
            </div>

            <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                Tajriba: {currentTeacher.experience}
              </p>
              <p className="text-gray-600">Oylik: {currentTeacher.salary}</p>
              <p className="text-gray-600">Fan: {currentTeacher.subject}</p>
            </div>

            <div className="mt-6 bg-red-100 p-6 rounded-lg shadow-md relative">
              <h3 className="text-lg font-semibold text-gray-900">Parol</h3>
              <p className="text-gray-600">***********</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No profile data available
        </div>
      )}
    </div>
  );
}

export default Profile;
