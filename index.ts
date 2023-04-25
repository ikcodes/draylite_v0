/**********************{ API INDEX }********************|
 * This project utilizes Serverless Cloud to manage all 
 * deveopment, deployments, etc.
 * 
 * This index services the API, hosted in api/
 * 
 * This app's package.json covers both sides of things.
 *
 |*******************************************************/
import { api as serverlessApi, storage, http } from "@serverless/cloud";
import { serveSinglePageApp } from "./src/utils/serve-application";

// NETWORKING
//=============
const cors = require("cors");
const corsSettings = {
  origin: "*",
};

// LOGS
//==============
const morgan = require("morgan");
serverlessApi.use(morgan("tiny"));

// ROUTES
//=================
import routes from "./api/routes/router";
serverlessApi.use(cors(corsSettings));

// SERVE SPA
//====================
// See dedicated file, procedure to be updated after Serverless => Ampt
http.on("404", serveSinglePageApp);

serverlessApi.use("/api", routes);
