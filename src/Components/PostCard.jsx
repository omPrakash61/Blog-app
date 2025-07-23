import { Link } from "react-router-dom";

function PostCard({post}) {
  const id = post.$id;
  const title = post.Title;

  return (
    <Link to={`/post/${id}`}>
      <div className="w-full border-b-1 p-4 ">
        <div className="w-full justify-center mb-4">
          <img
            src={ post.featuredImage }
            alt={ title }
            className="rounded-md"
          />
        </div>
        <h2 className="text-xl font-mono">{ title }</h2>
      </div>
    </Link>
  );
}

export default PostCard;
