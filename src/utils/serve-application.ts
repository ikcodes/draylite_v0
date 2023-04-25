/*===============================================
ONLY FOR USE with current Serverless Cloud setup. 
-------------------------------------------------------------------
This is directly from their dev - cohabitation of API and SPA to be
  supported in future releases, including Ampt. For the time being, 
  prevent API 404s when accessing the root SPA build.
*/
export const serveSinglePageApp = async (req: any, res: any) => {
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
};
