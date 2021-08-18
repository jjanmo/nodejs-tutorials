const home = (req, res, next) => {
  res.status(200).send({ data: 'hello world' });
};

module.exports = {
  home,
};
