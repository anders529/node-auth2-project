const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/router.js");
const restricted = require("../auth/restricted-middleware.js");
const validateLogin = require("../auth/validateLogin.js");
const ProjectsRouter = require("../projects/project-router.js");
const ResourcesRouter = require("../resources/resource-router.js");
const server = express();
const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production to send only over https
    httpOnly: true, // true means no access from JS
  },
  resave: false,
  saveUninitialized: true, // GDPR laws require to check with client
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 12000000
  })
};
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/projects", validateLogin, ProjectsRouter);
server.use("/api/resources", validateLogin, ResourcesRouter);
server.get("/", (req, res) => {
  res.json({ api: "up" });
});
module.exports = server;
