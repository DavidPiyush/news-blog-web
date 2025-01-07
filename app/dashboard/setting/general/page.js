import WebsiteSettingComponent from "@/app/_components/WebsiteSettingComponent";

async function page() {
  const data = await websiteSettingData();
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
