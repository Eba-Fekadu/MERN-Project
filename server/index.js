import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import songRouter from "./routes/song.routes.js"
import statsRouter from "./routes/stats.routes.js"

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB!")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log("Server is running on port 3000!")
})

app.use("/server/song", songRouter)
app.use("/server/stats", statsRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
