import BreadCrumb from "../_components/BreadCrumb";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import SubNavigation from "../_components/SubNavigation";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <SubNavigation />
      {/* <BreadCrumb /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
