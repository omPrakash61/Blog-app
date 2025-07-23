import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/Db_service";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../Components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((post) => {
        setPost(post);
        console.log(post);
      });
    }
  }, [postId, navigate]);
  return (
    <div className="py-8">
      <Container>
        {post ? (
          <>
            <h1 className="flex justify-center"> {post.Title} </h1>
            <PostForm post={post} />
          </>
        ) : (
          "Loading post..." // Loading Component 
        )}
      </Container>
    </div>
  );
}

export default EditPost;
