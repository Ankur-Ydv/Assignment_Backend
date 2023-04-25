const User = require("./userModel");

module.exports.query1 = async (req, res, next) => {
  try {
    const users = await User.find({
      income: { $lt: "$5" },
      car: { $in: ["BMW", "Mercedes", "Audi"] },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.query2 = async (req, res, next) => {
  try {
    const users = await User.find({
      gender: "Male",
      $expr: { $gt: [{ $toDouble: "$phone_price" }, 10000] },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.query3 = async (req, res, next) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/i },
      quote: { $gt: 15 },
      email: { $regex: /M/i },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.query4 = async (req, res, next) => {
  try {
    const users = await User.find({
      car: { $in: ["BMW", "Mercedes-Benz", "Audi"] },
      email: { $not: /\d/ },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.query5 = async (req, res, next) => {
  try {
    const cities = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avgIncome: {
            $avg: {
              $convert: {
                input: { $substr: ["$income", 1, -1] },
                to: "decimal",
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
      {
        $sort: {
          avgIncome: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    return res.json(cities);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
