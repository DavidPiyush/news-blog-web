import WebsiteSettingComponent from "@/app/_components/WebsiteSettingComponent";
import { connectToDB } from "@/app/_lib/connectDB";
import WebsiteSetting from "@/models/WebsiteModel";
export const dynamic = "force-dynamic"; // Mark the page as dynamic
export const revalidate = 0;

async function page() {
  await connectToDB();
  const data = await WebsiteSetting.findOne();
  if (!data) {
    toast.error("Failed to fetch website settings.");
    return <div>Error: No data found</div>;
  }

  const {
    _id,
    websiteName,
    contactPhone,
    footerText,
    defaultLanguage,
    timeZone,
    socialMediaLinks,
  } = data;

  const id = _id?.toString();
  const socialLinks = Object.fromEntries(socialMediaLinks || []);

  return (
    <WebsiteSettingComponent
      id={id}
      websiteName={websiteName}
      contactPhone={contactPhone}
      footerText={footerText}
      defaultLanguage={defaultLanguage}
      timeZone={timeZone}
      socialLinks={socialLinks}
    />
  );
}

export default page;
