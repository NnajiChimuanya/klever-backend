const mongoose = require("mongoose")

const bettingSchema = new mongoose.Schema({
  userName : String,
  address : String,
  privateKey : String,
  Balance : Number
})

const Betting = mongoose.model("Betting", bettingSchema)

module.exports = Betting