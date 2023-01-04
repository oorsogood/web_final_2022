export default {
  allAccess: (req, res, next) => {
    res.status(200).send("Public Content.");
  },

  userBoard: (req, res, next) => {
    res.status(200).send("User Content.");
  },

  adminBoard: (req, res, next) => {
    res.status(200).send("Admin Content.");
  },
};
