import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import connection from "../public/javascripts/getData.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const upload = multer({ dest: resolve(__dirname, "public") });

/* GET users listing with parameters. */
router.get("/getParams/:id", function (req, res, next) {
	const params = req.params.id;
	res.send(`getParams: ${params}`);
});

/* select */
router.get("/", async (req, res) => {
	try {
		const getData = await connection("heroes").select("*");
		res.status(200).json({ message: "success", data: getData });
	} catch (error) {
		console.log(error);
	}
});

export default router;
