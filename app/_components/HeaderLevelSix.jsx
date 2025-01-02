import Link from "next/link";

function HeaderLevelSix({author, date}) {
    return (
      
        <h6 className="text-xs font-light text-gray-500 tracking-wide">
          <strong>
            by{" "}
            <Link href="#" className="font-bold text-gray-600 ">
              {author}{" "}
            </Link>{" "}
          </strong>
          , <span>{date}</span>
        </h6>
      
    );
}

export default HeaderLevelSix
