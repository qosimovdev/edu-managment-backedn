const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { sequelize } = require("./model")

const app = express()
app.use(express.json())
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


const authRoutes = require("./routes/auth.routes")
const mentorRoutes = require("./routes/mentor.routes")
const studentRoutes = require("./routes/student.routes")
const groupRoutes = require("./routes/group.routes")
const paymentRoutes = require("./routes/payment.routes")
app.use("/api/auth", authRoutes)
app.use("/api/mentors", mentorRoutes)
app.use("/api/groups", groupRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/payments", paymentRoutes)
const { swaggerUi, swaggerSpec } = require("./swagger/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))