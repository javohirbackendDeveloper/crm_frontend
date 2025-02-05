import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupCrm } from "../stores/group.crm";
import paymentCrm from "../stores/payment";
import authStore from "../stores/auth.store";

function GetOneStudent() {
  const { user } = authStore();
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const location = useLocation();
  const { student } = location.state || {};
  const { getOneGroup, gettedGroup, updateGroup } = groupCrm();
  const { getStudentPayments, payments } = paymentCrm();
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(student?.group_id || "");
  if (!student) {
    return (
      <div className="text-center text-xl">Talaba ma'lumotlari topilmadi.</div>
    );
  }

  useEffect(() => {
    if (student?.group_id) {
      getOneGroup(student.group_id);
    }
  }, [student]);

  useEffect(() => {
    if (student?._id) {
      getStudentPayments(student?._id);
    }
  }, [student]);

  useEffect(() => {
    if (gettedGroup?.group_name) {
      setGroupName(gettedGroup.group_name);
    }
  }, [gettedGroup]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 space-y-8">
      <div className="w-96 p-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl mt-20">
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            src={
              student.image?.split("")[0] === "h"
                ? student.image
                : "/noUserImg.png"
            }
            alt="Student"
          />
          <h1 className="text-2xl font-bold mb-2">
            {student.firstname} {student.lastname}
          </h1>
          <p className="text-lg mb-2">Age: {student.age}</p>
          <p className="text-lg mb-2">Address: {student.address}</p>
          <p className="text-lg mb-2">Login: {student.login}</p>
          <p className="text-lg mb-2">
            Jami baholari: {student.student_grade ? student.student_grade : 0}
          </p>
          <p className="text-lg mb-2">
            Parent Phone Number: {student.parent_phone_number}
          </p>
          <p className="text-lg mb-2">
            {student.phone_number
              ? `Personal Phone Number: ${student.phone_number}`
              : ""}
          </p>

          <div className="mt-4">
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bu o'quvchining guruhlari
            </label>
            <select
              id="group"
              value={selectedGroup}
              onChange={handleGroupChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a group</option>
              <option value={gettedGroup?._id}>
                {groupName || "No Group Assigned"}
              </option>
            </select>
          </div>
        </div>
      </div>

      {user && (
        <div className="w-96 p-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-4">Student To'lovlari</h2>
          {payments && payments.length > 0 ? (
            <ul className="space-y-4">
              {payments.map((payment) => (
                <li
                  key={payment._id}
                  className="p-4 bg-gray-100 rounded-md shadow-sm"
                >
                  <h3>
                    {months[new Date(payment.next_payment_date).getMonth() - 1]}
                    &nbsp;oyi uchun
                  </h3>
                  <p className="text-lg">
                    To'lov miqdori: {payment.money} so'm
                  </p>
                  <p className="text-sm text-gray-600">
                    To'lov sanasi:{" "}
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Hozirda hech qanday to'lov mavjud emas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GetOneStudent;
