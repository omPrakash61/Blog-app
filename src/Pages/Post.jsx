import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/Db_service";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import PostSkeleton from "../Skeleton";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
  const postId = params.postId;

  const [confirmText, setConfirmText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const handleDelete = (input) => {
    const expectedText = `Remove ${post.Title}`;

    if (input != expectedText) {
      alert("Confirmation text does not match. Please type it exactly.");
      return;
    }
    deletePost();
    setConfirmDelete(false);
  };

  useEffect(() => {
    if (!userData) navigate(`/login`);

    if (postId) {
      // console.log(postId);
      appwriteService.getPost(postId).then(
        (post) => {
          setPost(post);
          setImageUrl(post.featuredImage);
        },
        (e) => console.log("error while getting the data", e)
      );
    } else navigate("/");
  }, [postId, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        const url = post.featuredImage;
        const cleanUrl = url.split(/[?#]/)[0];
        const parts = cleanUrl.split("/");
        const filename = parts.pop();
        const publicId = filename.split(".")[0];
        appwriteService.deleteFile(publicId).then((res) => {
          console.log("image deleted", res);
          navigate("/");
        });
      }
    });
  };

  return post ? (
    <div className="py-8 sm:py-10 lg:py-16">
      <Container>
        {/* Image */}
        <div className="w-full mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt={post.Title}
            className="rounded-xl max-h-[750px] object-cover shadow-md"
          />
        </div>

        {/* Author Buttons */}
        {isAuthor && (
          <div className="w-full flex flex-col items-end space-y-3 mb-6 px-2 md:px-0">
            <div className="flex space-x-3">
              <Button bgColor="bg-green-600 hover:bg-green-700 transition-all duration-300">
                <Link to={`/edit-post/${post.$id}`}>Edit</Link>
              </Button>
              <Button
                className="rounded-none"
                bgColor="bg-red-700"
                onClick={() => setConfirmDelete(true)}
              >
                Remove
              </Button>
            </div>

            {confirmDelete && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md animate-fade-in-up">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                    Confirm Deletion
                  </h2>
                  <span className="text-sm">
                    Type <i className="text-red-600">Remove {post.Title}</i>{" "}
                    inside the box
                  </span>
                  <input
                    type="text"
                    placeholder="Type here.."
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                  />
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(confirmText)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="w-full mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            {post.Title}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none w-full px-2 md:px-0">
          {parse(post.Content || "")}
        </div>
      </Container>
    </div>
  ) : (
    <Container>
      <PostSkeleton />
    </Container>
  );
}
