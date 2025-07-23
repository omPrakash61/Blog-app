import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/Db_service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getAllPost([]).then((post) => {
      if (post && post.documents) {
        setPosts(post.documents);
        setLoading(false);
        
        console.log("Fetched posts:", post.documents);
      }
    });
  }, []);

  const PostCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4">
      <div className="h-40 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

  return (
  <div className="w-full py-14">
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          : posts.map((post) => (
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
