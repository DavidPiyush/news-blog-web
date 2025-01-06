export function date() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
}

export function getRandomEmoji() {
  const emojis = ["👋", "🎉", "🚀", "💻", "🔥"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export function calculateReadingTimeFromHTML(htmlContent) {
  const wordsPerMinute = 200; // Average reading speed

  // Remove HTML tags
  const plainText = htmlContent.replace(/<[^>]*>/g, "").trim();

  // Split text into words
  const words = plainText.split(/\s+/);
  const wordCount = words.length;

  // Calculate reading time
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return {
    wordCount,
    readingTimeMinutes,
    readingTimeText: `${readingTimeMinutes} min read`,
  };
}

