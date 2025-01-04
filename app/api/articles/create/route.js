import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const createNewArticle = await req.json();

    // Validate the request body
    if (!createNewArticle || !createNewArticle.title) {
      return NextResponse.json(
        {
          error:
            "Request body must contain 'title', 'subTitle', 'content', 'coverImage', 'author', and 'categories'",
        },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      subTitle,
      content,
      coverImage,
      author,
      categories,
      tags,
      status,
      isFeatured,
      isApproved,
      publishedAt,
      relatedPosts,
      readingTime,
      isDeleted,
      isCommentAllowed,
    } = createNewArticle;

    // Create a new article
    const newArticle = new Article({
      title,
      subTitle,
      slug,
      content,
      coverImage,
      status: status || "draft", // Default to "draft" if not provided
      author,
      categories,
      tags: tags || [],
      views: 0, // Default to 0 views
      likes: 0, // Default to 0 likes
      isFeatured: isFeatured || false,
      isApproved: isApproved || false,
      publishedAt,
      relatedPosts: relatedPosts || [],
      readingTime: readingTime || 0,
      isDeleted: isDeleted || false,
      isCommentAllowed: isCommentAllowed || true,
    });

    // Save the new article to the database
    await newArticle.save();

    return NextResponse.json(
      { message: "Article created successfully", article: newArticle },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the article" },
      { status: 500 }
    );
  }
};
