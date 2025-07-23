import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const PostSkeleton = () => (
  <div className="py-12">
    <Skeleton height={250} borderRadius={12} />
    <div className="mt-4">
      <Skeleton height={30} width={200} />
      <Skeleton count={5} />
    </div>
  </div>
);

export default PostSkeleton