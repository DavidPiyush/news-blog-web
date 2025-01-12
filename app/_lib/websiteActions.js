"use server";

import WebsiteSetting from "@/models/WebsiteModel";
import { connectToDB } from "./connectDB";

export async function createWebsiteSittings(formData) {
  try {
    // Connect to the database
    await connectToDB();
    // Parse form data into an object
    const {
      websiteName,
      contactPhone,
      footerText,
      defaultLanguage,
      timeZone,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = Object.fromEntries(formData.entries());

    // Prepare the data object
    const data = {
      websiteName,
      contactPhone,
      footerText,
      defaultLanguage,
      timeZone,
      socialMediaLinks: {
        facebook,
        instagram,
        twitter,
        linkedin,
      },
    };

    // Create and save the new website settings
    const newSettings = new WebsiteSetting(data);
    await newSettings.save();

    return { success: true, message: "Website settings saved successfully." };
  } catch (error) {
    console.error("Error creating website settings:", error);
    return {
      success: false,
      message: "Failed to save website settings.",
      error,
    };
  }
}

export async function updateWebsiteSittings(formData) {
  try {
    // Parse form data into an object
    // Connect to the database
    await connectToDB();
    const {
      //   id,
      websiteName,
      contactPhone,
      footerText,
      defaultLanguage,
      timeZone,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = Object.fromEntries(formData.entries());

    // Prepare the update data object
    const data = {
      websiteName,
      contactPhone,
      footerText,
      defaultLanguage,
      timeZone,
      socialMediaLinks: {
        facebook,
        instagram,
        twitter,
        linkedin,
      },
    };

    

    // Update the website settings (assuming only one settings document exists)
    const updatedSettings = await WebsiteSetting.findOneAndUpdate(
      {}, // Find the first document (adjust this filter if needed)
      data, // Update with new data
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedSettings) {
      throw new Error("No website settings found to update.");
    }

    return { success: true, message: "Website settings updated successfully." };
  } catch (error) {
    console.error("Error updating website settings:", error);
    return {
      success: false,
      message: "Failed to update website settings.",
      error: error.message || "Unknown error",
    };
  }
}
