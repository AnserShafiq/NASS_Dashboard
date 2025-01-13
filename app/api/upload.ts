import multer from "multer";
import path from "path";
import fs from "fs";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

interface MulterRequest extends NextApiRequest {
  file: MulterFile;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

const apiRoute = nextConnect<MulterRequest, NextApiResponse>({
  onError(error: multer.MulterError, req: MulterRequest, res: NextApiResponse) {
    if (error instanceof multer.MulterError) {
      res.status(400).json({ error: `Multer Error: ${error}` });
    } else {
      res.status(501).json({ error: `Sorry, something went wrong! ${error}` });
    }
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req: MulterRequest, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're handling it with Multer
  },
};
