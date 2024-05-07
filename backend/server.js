const express = require("express");
const multer = require("multer");
const fs = require("fs"); 
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

//Config
dotenv.config({ path: "backend/config/config.env" });

const filesDir = './files';
if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filesDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

//Cors middleware
app.use(cors());

app.post("/uploadChunk", upload.single("chunk"), (req, res, next) => {
  const { path, originalname: filename } = req.file;
  res.send({
    success: true,
    message: "Chunk has been uploaded successfully",
    data: { path, filename },
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
