  const mongoose = require("mongoose")

  const blockChain = new mongoose.Schema({

    "symbol" : { type :String , Unique : true},
    "name":  { type: String , Unique : true },
    "marketCapUsd":  String , 
    "priceUsd": String 

  })

  module.exports = mongoose.model("blockchain",blockChain)

