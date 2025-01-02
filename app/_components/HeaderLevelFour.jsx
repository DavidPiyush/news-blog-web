import Link from "next/link";

function HeaderLevelFour({
  title,
  href = "#", // Default link
  paddingPx = "", // Default padding for X
  paddingPy = "", // Default padding for Y
  fontSize = "", // Default font size
}) {
  return (
    <h4
      className={`font-semibold text-gray-800 hover:text-red-600 transition-colors duration-300 ${paddingPx} ${paddingPy} ${fontSize}`}
    >
      <Link href={href}>{title}</Link>
    </h4>
  );
}

export default HeaderLevelFour;
