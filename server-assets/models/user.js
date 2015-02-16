var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Product = require('./product');


var userSchema = new Schema({
	name: { type: String, required: true },
	googleId: { type: Number, required: true, unique: true },
	plusLink: { type: String, required: true, unique: true },
	picture: { type: String, required: true },
	gender: { type: String, enum: ['male', 'female', 'undecided'], required: true },
	cart: [{
		product: {
			name: { type: String, unique: true, required: true },
			price: { type: Number, required: true, precision: 2 },
			description: { type: String, required: true }
		},
		quantity: { type: Number, required: true, min: 1 }
	}],
	address: {
		line1: { type: String },
		line2: { type: String },
		city: { type: String },
		state: { type: String },
		country: { type: String },
		zip: { type: String }
	}
});


module.exports = Mongoose.model('User', userSchema);