// getData.mjs 文件
import mysql from "mysql2";
import knex from "knex";

// const connection = mysql
// 	.createPool({
// 		host: "localhost",
// 		port: 3306,
// 		user: "root",
// 		password: "Dc7532147",
// 		database: "sakila",
// 		waitForConnections: true,
// 		connectionLimit: 5,
// 		queueLimit: 0,
// 	})
// 	.promise();

const connection = knex({
	client: "mysql2",
	connection: {
		host: "localhost",
		port: 3306,
		user: "root",
		password: "Dc7532147",
		database: "sakila",
	},
});
export default connection;
