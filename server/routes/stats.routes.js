import express from "express"
import {
  overallStats,
  genreCounts,
  artistStats,
  albumCounts,
} from "../controllers/stats.controller.js"

const router = express.Router()
router.get("/overallStats", overallStats)
router.get("/genre", genreCounts)
router.get("/artistStats", artistStats)
router.get("/albumCounts", albumCounts)

albumCounts
export default router
