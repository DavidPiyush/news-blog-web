import Image from "next/image";
import HeaderLevelFour from "./HeaderLevelFour";
import Link from "next/link";

function SportTrendList({ articles }) {
  return (
    <div>
      {/* Increased the gap between items */}
      {articles?.map((post) => (
        <div
          key={post.id}
          className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Clickable Container */}
          <div className="relative w-full h-[150px] overflow-hidden rounded-t-lg">
            <Link href={`news/${post.slug}`} className="w-full">
              <Image
                src={post.coverImage||""}
                alt={post.title}
                layout="fill" // Use layout="fill" for responsiveness
                className="object-cover w-full h-full" // Ensure proper aspect ratio with object-cover
              />
            </Link>
          </div>

          {/* Text */}
          <div className="flex items-center justify-center py-3 w-full rounded-b-lg pl-4 pt-6">
            <HeaderLevelFour title={post.title} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SportTrendList;
