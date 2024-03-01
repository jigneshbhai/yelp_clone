import express from "express";
import {
  addReview,
  createRest,
  deleteRest,
  getAllRest,
  getSingleRest,
  updateRest,
} from "../controllers/rest.controller.js";

const router = express.Router();

router.get("/restaurants", getAllRest);
router.get("/restaurants/:id", getSingleRest);
router.post("/restaurants", createRest);
router.put("/restaurants/:id", updateRest);
router.delete("/restaurants/:id", deleteRest);
router.post("/restaurants/:id/addReview", addReview);

export default router;
