"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaPlus,
  FaList,
  FaTag,
  FaImage,
  FaClock,
  FaShieldAlt,
  FaClipboardList,
  FaCommentAlt,
  FaAd,
  FaSearch,
  FaLink,
  FaChartLine,
  FaFire,
  FaThumbsUp,
  FaDollarSign,
  FaHistory,
  FaWrench,
  FaShareAlt,
  FaCheckCircle,
  FaDatabase,
  FaUser,
  FaCog,
  FaPen,
} from "react-icons/fa";

const sidebarData = {
  sections: [
    {
      title: "Dashboard",
      icon: FaTachometerAlt,
      link: "/dashboard",
      roles: ["admin", "reader", "author", "manager", "contributor"], // Accessible to all roles.
    },
    {
      title: "Content Management",
      icon: FaNewspaper,
      roles: ["admin", "author", "manager"],
      subSections: [
        {
          title: "Articles",
          icon: FaPlus,
          link: "/dashboard/content/article",
          roles: ["admin", "author", "manager"],
        },
        {
          title: "Manage",
          icon: FaPen,
          link: "/dashboard/content/manage",
          roles: ["admin", "author"],
        },
        {
          title: "Categories",
          icon: FaList,
          link: "/dashboard/content/categories",
          roles: ["admin", "manager"],
        },
        {
          title: "Tags",
          icon: FaTag,
          link: "/dashboard/content/tag",
          roles: ["admin", "manager"],
        },
        {
          title: "Media Library",
          icon: FaImage,
          link: "/dashboard/content/library",
          roles: ["admin", "author", "manager"],
        },
        {
          title: "Scheduled Posts",
          icon: FaClock,
          link: "/dashboard/content/scheduled-posts",
          roles: ["admin", "author"],
        },
      ],
    },
    {
      title: "User Management",
      icon: FaUser,
      roles: ["admin", "manager"],
      subSections: [
        {
          title: "Users",
          icon: FaUser,
          link: "/dashboard/user",
          roles: ["admin"],
        },
        {
          title: "Roles & Permissions",
          icon: FaShieldAlt,
          link: "/dashboard/user/role",
          roles: ["admin"],
        },
        {
          title: "User Activity",
          icon: FaClipboardList,
          link: "/dashboard/user/activity",
          roles: ["admin", "manager"],
        },
        {
          title: "Comments",
          icon: FaCommentAlt,
          link: "/dashboard/user/comment",
          roles: ["admin", "manager"],
        },
      ],
    },
    {
      title: "Advertising",
      icon: FaAd,
      roles: ["admin", "manager"],
      subSections: [
        {
          title: "Campaigns",
          icon: FaList,
          link: "/dashboard/advertising/campaign",
          roles: ["admin", "manager"],
        },
        {
          title: "Ad Settings",
          icon: FaCog,
          link: "/dashboard/advertising/setting",
          roles: ["admin"],
        },
        {
          title: "Ad Reports",
          icon: FaChartLine,
          link: "/dashboard/advertising/report",
          roles: ["admin", "manager"],
        },
        {
          title: "Targeting",
          icon: FaSearch,
          link: "/dashboard/advertising/targeting",
          roles: ["admin"],
        },
      ],
    },
    {
      title: "SEO & Metadata",
      icon: FaSearch,
      roles: ["admin", "manager"],
      subSections: [
        {
          title: "SEO Settings",
          icon: FaCog,
          link: "/dashboard/seo/setting",
          roles: ["admin"],
        },
        {
          title: "URL Management",
          icon: FaLink,
          link: "/dashboard/seo/url",
          roles: ["admin", "manager"],
        },
      ],
    },
    {
      title: "Analytics",
      icon: FaChartLine,
      roles: ["admin", "manager", "reader"],
      subSections: [
        {
          title: "Traffic Overview",
          icon: FaUser,
          link: "/dashboard/analytics/traffic",
          roles: ["admin", "manager"],
        },
        {
          title: "Popular Articles",
          icon: FaFire,
          link: "/dashboard/analytics/pop-article",
          roles: ["admin", "manager", "reader"],
        },
        {
          title: "Engagement",
          icon: FaThumbsUp,
          link: "/dashboard/analytics/engagement",
          roles: ["admin", "manager"],
        },
      ],
    },
    {
      title: "Subscription Management",
      icon: FaDollarSign,
      roles: ["admin", "manager"],
      subSections: [
        {
          title: "Subscription Plans",
          icon: FaCog,
          link: "/dashboard/subscriptions/plans",
          roles: ["admin"],
        },
        {
          title: "Payment History",
          icon: FaHistory,
          link: "/dashboard/subscriptions/payment-history",
          roles: ["admin", "manager"],
        },
      ],
    },
    {
      title: "Site Settings",
      icon: FaCog,
      roles: ["admin"],
      subSections: [
        {
          title: "General Settings",
          icon: FaWrench,
          link: "/dashboard/setting/general",
          roles: ["admin"],
        },
        {
          title: "Social Media Links",
          icon: FaShareAlt,
          link: "/dashboard/setting/social",
          roles: ["admin"],
        },
        {
          title: "Content Approval",
          icon: FaCheckCircle,
          link: "/dashboard/setting/approval",
          roles: ["admin"],
        },
        {
          title: "Backup Settings",
          icon: FaDatabase,
          link: "/dashboard/setting/backup",
          roles: ["admin"],
        },
      ],
    },
  ],
};

function Sidebar({ role }) {
  const [openSections, setOpenSections] = useState({});
  const currentPath = usePathname();

  const toggleSection = (sectionTitle) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  // Filter sections based on the user's role
  const filteredSections = sidebarData.sections.filter((section) =>
    section.roles.includes(role)
  );

  return (
    <nav className="hidden md:block bg-white text-gray-800 p-4 shadow-lg  ">
      <ul className="flex flex-col gap-2  text-lg  overflow-y-auto hide-scrollbar h-screen  ">
        {filteredSections.map((section, idx) => (
          <li key={idx}>
            {section.link ? (
              <Link
                href={section.link}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 ${
                  currentPath === section.link
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <section.icon className="w-5 h-5 text-gray-600" />
                <span className="ms-3 text-sm">{section.title}</span>
              </Link>
            ) : (
              <div
                onClick={() => toggleSection(section.title)}
                className="flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                <section.icon className="w-5 h-5 text-gray-600" />
                <span className="ms-3 text-sm">{section.title}</span>
                {section.subSections && (
                  <span
                    className={`ml-auto transition-transform duration-300 transform ${
                      openSections[section.title] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </div>
            )}

            {section.subSections && openSections[section.title] && (
              <ul className="space-y-3 ml-5 mt-2">
                {section.subSections
                  .filter((subSection) => subSection.roles.includes(role))
                  .map((subSection, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        href={subSection.link}
                        className={`flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 ${
                          currentPath === subSection.link
                            ? "bg-gray-200 font-semibold"
                            : ""
                        }`}
                      >
                        <subSection.icon className="w-5 h-5 text-gray-600" />
                        <span className="ms-3 text-sm">{subSection.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
