import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";

const PORT = 8080;
const app = express();
const route = express.Router();

const serverRendering = (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error, please check !!");
    }

    const context = {}
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    )

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      )
    );
  });
};

route.use("^/[a-z]+$", serverRendering);

route.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(route);

app.listen(PORT, () => {
  console.log(`SSR running on port http://localhost:${PORT}`);
});