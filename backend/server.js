const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

//cors middleware
app.use(cors());

//config
//Config
dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
