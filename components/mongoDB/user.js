const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const requiredString = { type: String, required: true };

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	ethAddress: requiredString,
	accessToken: requiredString,
	refreshToken: requiredString,
	expirationDate: requiredString,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
