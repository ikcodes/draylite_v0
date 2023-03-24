const errorOut = (errMessage, res) => {
  try {
    res.status(500).send({
      message: errMessage,
    });
  } catch (e) {
    res.end();
  }
};

module.exports = {
  errorOut,
};
