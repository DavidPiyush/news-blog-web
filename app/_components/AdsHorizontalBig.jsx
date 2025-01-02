import Link from "next/link";

function AdsHorizontalBig({
  adImage = "https://via.placeholder.com/1111x209",
  adLink = "#",
  adText = "Advertisement",
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {/* Ad Text */}
      <p className="text-gray-500 text-xs mb-2 uppercase">{adText}</p>

      {/* Clickable Ad Image */}
      <Link href={adLink} target="_blank">
        <img
          src={adImage} // Dynamically uses the adImage prop
          alt="Advertisement"
          className="w-full object-cover rounded-md shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
        />
      </Link>
    </div>
  );
}

export default AdsHorizontalBig;
