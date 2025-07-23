import React, { useState, useEffect } from "react";
import { Container, PostCard, PostForm, RTE } from "../Components/index";
import appwriteService from "../appwrite/Db_service";
import { PreviewComponent } from "../Components/PreviewComponent";

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
