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
    <div className="w-full py-8">

      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
