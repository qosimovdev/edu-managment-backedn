const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { sequelize } = require("./model")

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5577


sequelize
    .sync()
    .then(() => {
        console.log("DB ulandi");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);

        })
    })
    .catch((err) => console.error("DB error: ", err))
