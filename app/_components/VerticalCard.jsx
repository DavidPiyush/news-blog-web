// import Image from "next/image";
import Link from "next/link";

function VerticalCard({ title, subtile, views, read, date, image, url }) {
  return (
    <div className=" border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {/* <div className="relative aspect-square h-[190px]"> */}
      <Link href={"/news/" + url}>
        <img
          src={image || ""}
          alt={title}
          // fill
          className="object-cover w-full  transform hover:scale-105 transition-transform duration-300"
        />
        {/* </div> */}
        {/* Content */}
        <article className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 space-y-4">
          <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            {date} • {read} Mins Read • {views} Views
          </p>
          <p className="text-gray-700 text-xs leading-relaxed">{subtile}</p>
        </article>
      </Link>
    </div>
  );
}

export default VerticalCard;
