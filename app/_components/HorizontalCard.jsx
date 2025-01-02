function HorizontalCard({ articles }) {
  return (
    <>
      {articles?.map((post) => (
        <div
          key={post.id} // Make sure each element has a unique key
          className="flex flex-col md:flex-row max-w-4xl mx-auto border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image Side */}
          <div className="md:w-1/2">
            <img
              src={post.image} // Use dynamic image from post object
              alt={post.title} // Use dynamic alt text from post object
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Side */}
          <div className="md:w-1/2 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center space-y-4">
            <span className="text-sm font-medium text-blue-500 uppercase tracking-wide">
              {post.tag} {/* Use dynamic category from post object */}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              {post.title} {/* Use dynamic title from post object */}
            </h3>
            <p className="text-sm text-gray-500">
              {post.date} • {post.read} Read • {post.views} Views{" "}
              {/* Use dynamic published date, reading time, and views */}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {post.summary}
              {/* Use dynamic description from post object */}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default HorizontalCard;
