import { Link } from "react-router-dom";
import dbServices from "../appwrite/Db_service"
import { useState, useEffect } from "react";

function PostCard({post}) {

  const [imageUrl, setImageUrl] = useState(post.featuredImage);

  // useEffect(() => {
  //   async function fetchImageUrl() {
  //     try {
  //       const preview = await dbServices.getFilePreview({ fileId: post.featuredImage });
  //       setImageUrl(preview.href); // `preview` is a `URL` object
  //     } catch (error) {
  //       console.error("Error loading image preview:", error);
  //     }
  //   }

  //   fetchImageUrl();
  // }, [post.featuredImage]);


  const id = post.$id;
  const title = post.Title;

  return (
    <Link to={`/post/${id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-md"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
