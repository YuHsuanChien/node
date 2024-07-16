import createError from "http-errors";
import express from "express";
import { join, dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";
import getData from "./routes/getData.mjs";
import heroData from "./routes/heroData.mjs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const whiteList = ["http://localhost:4200", "http://127.0.0.1:4200"];

const corsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("不允許連線"));
		}
	},
};

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(cors(corsOptions));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/getData", getData);
app.use("/heroData", heroData);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
