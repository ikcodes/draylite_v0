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
//==============
import routes from "./api/routes/router";
serverlessApi.use(cors(corsSettings));

// UPLOAD STUFF (MODULARIZE!)
//======================================================

// creates a POST and PUT route at `/upload`
serverlessApi.post("/api/v0/upload", async (req: any, res: any) => {
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

// See dedicated file, procedure to be updated after Serverless => Ampt
http.on("404", serveSinglePageApp);

serverlessApi.use("/api", routes);
