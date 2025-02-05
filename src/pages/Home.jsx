import React, { useEffect, useState } from "react";
import postCrm from "../stores/postCrm"; // import postCrm to call addPost
import authStore from "../stores/auth.store";
import { Heart, MessageCircle, X } from "lucide-react";
import { teacherCrm } from "../stores/teacher.crm";
import studentCrm from "../stores/student.crm";

function Home() {
  const { user } = authStore();
  const { currentTeacher } = teacherCrm();
  const { currentStudent } = studentCrm();
  const {
    addPost,
    globalPosts,
    getGlobalPosts,
    deletePost,
    addComment,
    addLike,
  } = postCrm();
  const [formData, setFormData] = useState({
    image: "",
    description: "",
  });

  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    getGlobalPosts();
  }, [user, addPost, currentStudent, currentTeacher]);

  useEffect(() => {
    if (globalPosts?.length > 0) {
      const likedPostIds = globalPosts
        .filter((post) => post.likes.includes(user?._id))
        .map((post) => post._id);
      setLikedPosts(likedPostIds);
    }
  }, [globalPosts, user]);

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (postId) => {
    if (commentInput.trim()) {
      addComment(
        postId,
        (user && user._id) ||
          (currentTeacher && currentTeacher?._id) ||
          (currentTeacher && currentTeacher?._id),
        commentInput
      );
      setCommentInput("");
    }
  };

  const toggleCommentsVisibility = (postId) => {
    setShowComments((prev) => (prev === postId ? null : postId));
  };

  const handleLiked = (post_id) => {
    const user_id =
      (user && user?._id) ||
      (currentStudent && currentStudent?._id) ||
      (currentTeacher && currentTeacher?._id);

    if (likedPosts.includes(post_id)) {
      setLikedPosts(likedPosts.filter((id) => id !== post_id));
    } else {
      setLikedPosts([...likedPosts, post_id]);
    }

    addLike(post_id, user_id);
  };
  console.log(globalPosts);

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Saytdagi barcha postlar
        </h1>
        <div className="space-y-6">
          {globalPosts?.length > 0 &&
            globalPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 relative"
              >
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-gray-800">{post.description}</p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Heart
                      className={`cursor-pointer ${
                        likedPosts.includes(post._id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                      fill={likedPosts.includes(post._id) ? "red" : "none"}
                      onClick={() => handleLiked(post._id)}
                    />
                    <p>{post.likes.length}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle
                      className="text-blue-500 cursor-pointer"
                      onClick={() => toggleCommentsVisibility(post._id)}
                    />
                    <p>{post.caments.length}</p>
                  </div>
                </div>

                {showComments === post._id && (
                  <div className="mt-4">
                    <div
                      className="overflow-y-auto max-h-64"
                      style={{ maxHeight: "300px" }}
                    >
                      {post.caments.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-2 rounded-md mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <img
                              src={
                                comment.user?.image
                                  ? comment.user.image
                                  : "noUserImg.png"
                              }
                              alt="User"
                              className="w-8 h-8 rounded-full"
                            />
                            <p>
                              <strong>
                                {(comment.user.firstname &&
                                  comment.user.firstname) ||
                                  comment.user.username}
                              </strong>
                              : {comment.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={handleCommentChange}
                        placeholder="Yangi izoh yozing..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post._id)}
                        className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Izoh qo'shish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
