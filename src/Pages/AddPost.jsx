import React, { useState, useEffect } from "react";
import { Container, PostCard, PostForm } from "../Components/index";
import appwriteService from "../appwrite/Db_service";

function AddPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    appwriteService.getAllPost().then((posts) => {
      if (posts) setPost(posts.documents);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
