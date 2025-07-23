import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/Db_service";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPost([]).then((post) => {
      if (post && post.documents) {
        setPosts(post.documents);
        
        console.log("Fetched posts:", post.documents);
      }
    });
  }, []);


  return (
    <div className="w-full py-10 ">
  <Container>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div
          key={post.$id}
          className="transform hover:scale-[1.02] transition duration-300 ease-in-out"
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  </Container>
</div>
  );
}

export default AllPosts;
