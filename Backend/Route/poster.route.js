import express from "express";
import { getPosterById, getPosters } from "../Controller/poster.controller.js";
const router = express.Router();

router.route("/").get(getPosters);
router.route("/:id").get(getPosterById);


export default router;