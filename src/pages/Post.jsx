import React, { useEffect, useState } from "react";
import postCrm from "../stores/postCrm"; // import postCrm to call addPost
import authStore from "../stores/auth.store";
import { Heart, MessageCircle, X } from "lucide-react";
import { teacherCrm } from "../stores/teacher.crm";
import studentCrm from "../stores/student.crm";

function Post() {
  const { user } = authStore();
  const { currentTeacher } = teacherCrm();
  const { currentStudent } = studentCrm();
  const { addPost, posts, getPosts, deletePost, addComment, addLike } =
    postCrm(); // addPost and addComment
  const [formData, setFormData] = useState({
    image: "",
    description: "",
  });

  const [commentInput, setCommentInput] = useState(""); // State for comment input
  const [showComments, setShowComments] = useState(null); // State to toggle comments visibility for each post
  const [likedPosts, setLikedPosts] = useState([]); // State to track liked posts

  // Fetch posts and liked status when component mounts
  useEffect(() => {
    if (user) {
      getPosts(user?._id); // Fetch posts when the component mounts
    }
  }, [user, addPost]);

  useEffect(() => {
    if (posts?.length > 0) {
      // Refreshda likedPostsni tekshirib olish
      const likedPostIds = posts
        .filter((post) => post.likes.includes(user?._id))
        .map((post) => post._id);
      setLikedPosts(likedPostIds); // Update liked posts state
    }
  }, [posts, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    if (user) {
      const { image, description } = formData;

      if (!description || !image) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }

      addPost(user?._id, formData); // Submit new post
    }
  };

  const handleDelete = (post) => {
    if (post) {
      if (window.confirm("Postni o'chirish")) {
        deletePost(post?._id); // Delete the post
      }
    }
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value); // Update comment input state
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
      setCommentInput(""); // Clear comment input after submitting
    }
  };

  const toggleCommentsVisibility = (postId) => {
    setShowComments((prev) => (prev === postId ? null : postId)); // Toggle visibility of comments for a specific post
  };

  const handleLiked = (post_id) => {
    const user_id =
      (user && user?._id) ||
      (currentStudent && currentStudent?._id) ||
      (currentTeacher && currentTeacher?._id);

    // If the post is already liked, remove it from likedPosts, otherwise add it
    if (likedPosts.includes(post_id)) {
      setLikedPosts(likedPosts.filter((id) => id !== post_id));
    } else {
      setLikedPosts([...likedPosts, post_id]);
    }

    addLike(post_id, user_id); // Send like request to backend
  };

  console.log(formData);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:bg-gray-100 file:rounded-md file:text-sm file:font-medium hover:file:bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Post haqida qisqacha"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Post qo'shish
        </button>
      </form>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold mb-4">Sizning postlaringiz</h1>
        <div className="space-y-6">
          {posts?.length > 0 &&
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 relative"
              >
                <X
                  onClick={() => handleDelete(post)}
                  className="absolute top-2 right-2 text-black text-3xl cursor-pointer"
                />
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
                              className="w-8 h-8 rounded-full" // Circle image
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

export default Post;
