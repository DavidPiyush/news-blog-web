import Logo from "@/app/_components/Logo";
import Navbar from "@/app/_components/Navbar";
import { format } from "date-fns"; // Import the format function from date-fns

function Header() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, MMMM dd"); // Format the date

  return (
    <header className="border-b border-primary-900 px-8 py-5 gradient-header-background">
      <div className="flex justify-between items-center max-w-7xl mx-auto text-white">
        <div className="flex gap-6">
          <Logo />
          <span>{formattedDate}</span> {/* Display the formatted date */}
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
