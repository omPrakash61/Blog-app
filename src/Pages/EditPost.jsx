import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/Db_service";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../Components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const PostEditSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title skeleton */}
      <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto" />

      {/* Form skeleton - you can expand as needed */}
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-60 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
};

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((post) => {
        setPost(post);
        // console.log(post);
      });
    }
  }, [postId, navigate]);
  return (
  <div className="py-8">
    <Container>
      {post ? (
        <>
          <h1 className="flex justify-center text-4xl font-semibold mb-6">{post.Title}</h1>
          <PostForm post={post} />
        </>
      ) : (
        <PostEditSkeleton />
      )}
    </Container>
  </div>
);
}

export default EditPost;
