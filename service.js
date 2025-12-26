require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routesApi = require("./src/route/routes.js")
const resMsg = require("./src/util/resMessage.js")
const stCode = require("./src/util/statusCode.js")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/connect", (req, res) => {
    res.status(stCode.OK).json(
        resMsg.success([])
    )
})
app.use("/api/habit", routesApi.habitRoutes);
app.use("/api/habitTracker", routesApi.habitTrackerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
