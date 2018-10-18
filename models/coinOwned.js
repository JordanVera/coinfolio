const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const coinOwnedSchema = new Schema({
    ticker: { type: String, required: true },
    shares: { type: Number, required: true },
    buyPrice: { type: Number, required: true }
})

// const CoinOwned = mongoose.model("CoinOwned", coinOwnedSchema)
module.exports = coinOwnedSchema;