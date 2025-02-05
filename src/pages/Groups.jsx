import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddingGroup from "./AddingGroup";
import { groupCrm } from "../stores/group.crm";
import authStore from "../stores/auth.store";
import noUserImg from "/noUserImg.png";
import { Link, useNavigate } from "react-router-dom";
import { teacherCrm } from "../stores/teacher.crm";
import studentCrm from "../stores/student.crm";

function Groups() {
  const {
    getGroups,
    getOneGroup,
    groups,
    deleteGroup,
    getStudentGroup,
    gettedGroup,
  } = groupCrm();
  const { user } = authStore();
  const { currentTeacher, getTeacherGroups, teacherGroups } = teacherCrm();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;
  const navigate = useNavigate();
  const { currentStudent } = studentCrm();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) {
      getGroups(user?._id);
    } else if (currentTeacher?._id) {
      getTeacherGroups(currentTeacher?._id);
    } else if (currentStudent?.group_name) {
      getStudentGroup(currentStudent?.group_name);
    }
  }, [
    getGroups,
    user,
    getTeacherGroups,
    currentTeacher,
    getStudentGroup,
    currentStudent,
  ]);

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups
    ? groups
    : [].slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (groupId) => {
    if (window.confirm("Siz ushbu guruhni o'chirishni xohlaysizmi?")) {
      await deleteGroup(groupId);
      toast.success("Guruh muvaffaqiyatli o'chirildi!");
    }
  };

  const handleUpdate = (group) => {
    setSelectedGroup(group);
  };

  const handleGetOneGroup = (group) => {
    navigate(`/getOneGroup/${group._id}`);
  };

  return (
    <div className="px-4 py-6">
      {user ? <AddingGroup group={selectedGroup} /> : ""}

      {/* Search Form */}
      <form className="mt-6 mb-10">
        <input
          type="text"
          placeholder="Guruh nomini yozing..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />
      </form>

      <div className="flex flex-wrap gap-6 justify-start">
        {/* Check if teacherGroups, currentGroups, or gettedGroup has data */}
        {teacherGroups.length > 0 ? (
          // Display Teacher Groups
          teacherGroups
            .filter((item) =>
              item.group_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((group) => (
              <div
                key={group._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
              >
                <Link
                  to={`/group/getOneGroup/${group._id}`}
                  onClick={() => handleGetOneGroup(group)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        group?.group_image?.split("")[0] === "h"
                          ? group.group_image
                          : noUserImg
                      }
                      alt={group.group_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {group.group_name}
                      </h3>
                    </div>
                  </div>
                </Link>
                {/* Update and Delete Buttons */}
                {user && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(group)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Yangilash
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                      O'chirish
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : currentGroups.length > 0 ? (
          // Display Current Groups
          currentGroups
            .filter((item) =>
              item.group_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((group) => (
              <div
                key={group._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
              >
                <Link
                  to={`/group/getOneGroup/${group._id}`}
                  onClick={() => handleGetOneGroup(group)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        group.group_image &&
                        group.group_image.split("")[0] === "h"
                          ? group.group_image
                          : noUserImg
                      }
                      alt={group.group_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {group.group_name}
                      </h3>
                    </div>
                  </div>
                </Link>
                {/* Update and Delete Buttons */}
                {user && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(group)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Yangilash
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                      O'chirish
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : Array.isArray(gettedGroup) && gettedGroup.length > 0 ? (
          // Display Getted Groups
          gettedGroup
            .filter((item) =>
              item.group_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((group) => (
              <div
                key={group._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
              >
                <Link
                  to={`/group/getOneGroup/${group._id}`}
                  onClick={() => handleGetOneGroup(group)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        group.group_image.split("")[0] === "h"
                          ? group.group_image
                          : noUserImg
                      }
                      alt={group.group_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {group.group_name}
                      </h3>
                    </div>
                  </div>
                </Link>
                {/* Update and Delete Buttons */}
                {user && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(group)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Yangilash
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                      O'chirish
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          // No groups found
          <div className="w-full text-center text-gray-600 mt-4">
            Sizda hali hech qanday guruh yo'q
          </div>
        )}
      </div>

      {/* Pagination (if any) */}
      {currentGroups.length > 0 && (
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <span className="text-sm font-semibold text-gray-700 bg-blue-500 text-white py-1 px-4 rounded-full">
            Sahifa {currentPage}
          </span>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all ${
              currentPage === Math.ceil(groups.length / groupsPerPage)
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(groups.length / groupsPerPage)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Groups;
