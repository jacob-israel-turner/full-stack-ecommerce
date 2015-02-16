var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var productSchema = new Schema({
	name: { type: String, unique: true, required: true },
	price: { type: Number, required: true, precision: 2 },
	description: { type: String, required: true }
});

module.exports = Mongoose.model('Product', productSchema);