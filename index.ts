/**********************{ API INDEX }********************|
 * This project utilizes Serverless Cloud to manage all 
 * deveopment, deployments, etc.
 * 
 * This index services the API, hosted in api/
 * 
 * This app's package.json covers both sides of things.
 *
 |*******************************************************/
import { api as serverlessApi } from "@serverless/cloud";

// NETWORKING
//=============
const bodyParser = require("body-parser");
const cors = require("cors");
const corsSettings = {
  origin: "*",
};

// LOGS
//==============
const morgan = require("morgan");
serverlessApi.use(morgan("tiny"));

// ROUTES
//==============
import routes from "./api/routes/router";
serverlessApi.use(cors(corsSettings));

// Parse request of content-type - application/json
serverlessApi.use(bodyParser.json());

// parse requests of content-type -application/x-www-form-urlencoded
serverlessApi.use(bodyParser.urlencoded({ extended: true }));

// INIT ROUTES TO SERVERLESS API
serverlessApi.use("/", routes);
