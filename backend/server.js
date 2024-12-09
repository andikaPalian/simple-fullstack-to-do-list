const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();
const port = 8000;


dotenv.config();
connectDb();
app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use("/tasks", require("./routes/task.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});