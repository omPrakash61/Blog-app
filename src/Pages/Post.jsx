import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/Db_service";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
  const postId = params.postId;

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!userData) navigate(`/login`);

    if (postId) {
      console.log(postId);
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
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          <img src={imageUrl} alt={post.Title} className="rounded-xl h-160" />

          {isAuthor && (
            <div className="absolute right-6 top-180">
              <Button bgColor="bg-green-500" className="mr-3">
                <Link to={`/edit-post/${post.$id}`}>Edit</Link>
              </Button>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-4xl font-medium">{post.Title}</h1>
        </div>
        <div className="browser-css">{parse(post.Content || "")}</div>
      </Container>
    </div>
  ) : null;
}
