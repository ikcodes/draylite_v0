// Serverless Cloud storage: https://www.serverless.com/cloud/docs/apps/blob-storage
const { storage } = require("@serverless/cloud");

const uploadDocument = async (req, res) => {
  try {
    const { files } = req;
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
};

// Large documents respond with an Upload URL.
const uploadLargeDocument = async (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).send("No filename provided");
  }

  const uploadUrl = await storage.getUploadUrl(filename);

  return res.send({
    uploadUrl,
  });
};

const getDocumentsByCarrier = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .send("Could not get docs by carrier! Please provide all necessary params.");
    }
    const carrierDir = `carrierData/carrier${req.params.id}`;

    const allFiles = [];
    const pages = await storage.list(carrierDir, { recursive: true, pageSize: 100 });
    for await (const page of pages) {
      allFiles.push(...page);
    }

    const carrierFiles = [];

    for await (file of allFiles) {
      const downloadUrl = await storage.getDownloadUrl(`${carrierDir}/${file}`);
      const thisFile = {
        filename: file,
        url: downloadUrl,
      };
      carrierFiles.push(thisFile);
    }
    return res.status(200).send(carrierFiles);
  } catch (e) {
    res.status(403).send(JSON.stringify(e));
  }
};

module.exports = {
  uploadDocument,
  uploadLargeDocument,
  getDocumentsByCarrier,
};
