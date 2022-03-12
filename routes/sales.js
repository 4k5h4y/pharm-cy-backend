const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const Sales = require('../models/sales');
const User = require('../models/user')

router.post("", (req, res, next) => {
  const sales = new Sales({
    customerName: req.body.customerName,
    drugName: req.body.drugName,
    totalPrice: req.body.totalPrice,
    tax: req.body.tax,
    paidAmount: req.body.paidAmount,
    balance: req.body.balance
  });

  User.updateOne({ _id: req.body.userId }, { $addToSet: { "sales": sales } }).then(newSale => {
    console.log(" sale completed ", newSale)
    res.status(201).json({
      message: ' sale completed ',
      inventory: newSale['_doc']
    });
  });
});

router.get("/getSalesChartInfo", (req, res, next) => {

  Sales.aggregate([{
    "$project": {
      "paidAmount": 1,
      "balance": 1,
      "month": { "$month": "$dateTime" }
    }
  },
  {
    "$group": {
      "_id": "$month",
      "totalSale": { "$sum": { $toDouble: "$paidAmount" } },
      "totalBalance": { "$sum": { $toDouble: "$balance" } }
    }
  }
  ])
    .then(documents => {
      res.status(200).json({
        message: 'sales chart details obtaine sucessfully',
        sales: documents
      });
    });
});

router.get("", (req, res, next) => {
  Sales.find().then(documents => {
    res.status(200).json({
      message: 'sales details retrieved',
      sales: documents
    });
  });
});

module.exports = router;
