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
//==============
import routes from "./api/routes/router";
serverlessApi.use(cors(corsSettings));

// UPLOAD STUFF (MODULARIZE!)
//======================================================

// creates a POST and PUT route at `/upload`
serverlessApi.post("/api/v0/upload", async (req, res) => {
  try {
    const { files } = req as any;
    if (!files || !files.length) {
      return res.status(400).send("No files uploaded");
    }
    if (!req.body.carrier_id) {
      return res.status(400).send("No carrier_id provided");
    }
    const carrier_id = req.body.carrier_id;

    // Using the filename and path, upload
    const file = files[0];
    const fileName = files[0].originalname;
    const filePath = `/carrierData/carrier${carrier_id}/${fileName}`;
    const writeRes = await storage.write(filePath, file.buffer, {
      type: file.mimetype,
    });
    return res.send({
      writeRes,
      message: "File uploaded successfully",
    });
  } catch (e) {
    res.status(403).send(e);
  }
});

serverlessApi.get("/api/v0/big-upload", async (req, res) => {
  const { filename } = req.query as any;

  if (!filename) {
    return res.status(400).send("No filename provided");
  }

  const uploadUrl = await storage.getUploadUrl(filename);

  return res.send({
    uploadUrl,
  });
});

// THIS ACTUALLY SERVES THE SPA
//==============================
http.on("404", async (req: any, res: any) => {
  if (req.path.startsWith("/api")) {
    // This is an api level 404, so some api route that was not found
    res.sendStatus(404);
  } else if (req.accepts("html")) {
    // all other routes (i.e. your frontend) will hit this, and serve the SPA
    // this is supposed to be in the types, but isn't. im sry.
    // @ts-ignore
    const stream = await http.assets.readFile("index.html");
    if (stream) {
      res.status(200).type("html");
      stream.pipe(res);
      return;
    }
  }
});

serverlessApi.use("/api", routes);
