const express = require("express");
const server = express();
const login = require("./routes/login");
const dbConfig = require("./db-config");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8008;

server.use(express.json());

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secretkey",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false
    },
    store: new knexSessionStore({
      knex: dbConfig,
      createtable: true
    })
  })
);

server.use((req, res, next) => {
  console.log(
    `Method Used: ${req.method} --- URL Used: ${
      req.originalUrl
    } ---- TimeStamp: ${new Date()} `
  );

  console.log(req.session);
  next();
});
server.use("/api", login);

server.use((err, req, res, next) => {
  console.log(err),
    res.status(500).json({
      message: "Internal error occured, please try again later!"
    });
});
server.listen(port, host, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
