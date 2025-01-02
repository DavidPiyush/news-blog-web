import Link from "next/link";

function StayInTouch({
  icon: Icon,
  view,
  socialMediaName,
  color,
  hoverColor,
  backgroundColor,
  textColor,
  href
}) {
  if (!Icon) {
    console.error("Icon is undefined");
    return null;
  }
  return (
    <div
      className={`border  rounded-md shadow-sm  px-4 py-2 ${hoverColor} ${backgroundColor} ${textColor}`}
    >
      <Link href={href || ""} className="flex items-center gap-2">
        <Icon size={24} color={color} />
      <div className="text-xs">
        <p>{view}</p>
        <h6>{socialMediaName}</h6>
      </div>
      </Link>
    </div>
  );
}

export default StayInTouch;
