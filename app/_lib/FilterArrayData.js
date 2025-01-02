// export a function FilterArrayData() {
//    const techArticles = articles
//      .filter((article) => {
//        // Find the category object that matches the name "Tech"
//        const techCategory = categories.find(
//          (category) => category.name === "Tech"
//        );

//        // Check if the article's category matches the found category's _id
//        return techCategory && article.categories === techCategory._id;
//      })
//      .map((article) => {
//        // Find the matching category again to append the name
//        const matchedCategory = categories.find(
//          (category) => category._id === article.categories
//        );

//        // Return a new object with the category name appended
//        return {
//          ...article,
//          categoryName: matchedCategory ? matchedCategory.name : "Unknown",
//        };
//      });

//    console.log(techArticles);

// }

