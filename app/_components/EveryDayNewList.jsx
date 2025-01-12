import HeaderLevelFour from "./HeaderLevelFour";


function EveryDayNewList({articles}) {
   const getRecentArticle = articles
     ?.filter((article) => article.createdAt)
     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      {getRecentArticle?.map((post) => (
        <div
          className="shadow-md hover:shadow-lg rounded-lg overflow-hidden bg-white transition-all duration-300 mt-[-100px]"
          key={post.id}
        >
          <img
            src={post.coverImage}
            alt="side card image"
            className="w-full h-32 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="px-4 py-3 space-y-2">
            <HeaderLevelFour title={post.title} />
           
          </div>
        </div>
      ))}
    </>
  );
}

export default EveryDayNewList;
