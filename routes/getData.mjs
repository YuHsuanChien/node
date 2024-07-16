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

router.get("/test", async (req, res) => {
	try {
		const response = await connection("heroes").select("*");
		res.status(200).json({ message: "success", data: response });
	} catch (err) {
		console.log(err);
	}
	res.send("1");
});

/* select */
router.get("/", async (req, res) => {
	console.log(12121);
	try {
		const getData = await connection("information").select("*");
		console.log(getData);
		res.render("index.ejs", {
			title: "練習",
			dataArray: getData,
		});
	} catch (error) {
		console.log(error);
	}
});

/* insert into. */
router.post("/getform", upload.none(), async (req, res) => {
	// console.log(req.body);
	const inputName = req.body.name || "未設定";
	const inputAge = req.body.age || "未設定";
	const inputAddress = req.body.address || "未設定";
	try {
		const getData = await connection("information").insert({
			name: inputName,
			age: inputAge,
			address: inputAddress,
		});
		console.log("增加成功");
		res.status(200).json("增加成功");
	} catch (err) {
		console.log(err);
	}
});

// detail
router.get("/detail/:id", async (req, res) => {
	const id = req.params.id;
	const [db] = await connection("information").select("*").where("id", id);
	console.log(db);
	res.render("change", {
		title: "修改資料練習",
		id: id,
		name: db.name,
		age: db.age,
		address: db.address,
	});
});

// put
router.put("/changeDetail/:id", upload.none(), async (req, res) => {
	// console.log(req.body);
	const id = req.params.id;
	const inputName = req.body.name || "未設定";
	const inputAge = req.body.age || "未設定";
	const inputAddress = req.body.address || "未設定";
	try {
		const getData = await connection("information").where("id", id).update({
			name: inputName,
			age: inputAge,
			address: inputAddress,
		});
		console.log("修改成功");
		res.status(200).json("修改成功");
	} catch (err) {
		console.log(err);
	}
});

// del
router.delete("/deleted/:id", async (req, res) => {
	const id = req.params.id;
	const delWho = await connection("information").where("id", id).del();
	console.log(delWho);
	res.status(200).json({ message: "刪除成功" });
});

export default router;
