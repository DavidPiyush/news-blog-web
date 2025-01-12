import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  origin: "https://news-blog-web.vercel.app", // Allow this origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Run CORS middleware

  // Your API logic
  res.status(200).json({ message: "CORS is configured correctly!" });
}
