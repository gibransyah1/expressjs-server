// module.exports = {
//   multipleStatements: true,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "belajar",
// };


module.exports = {
  connectionLimit: 10,
  multipleStatements: true,

  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),

  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",

  database: process.env.DB_NAME || "belajar",
};
