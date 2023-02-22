const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const requiredString = { type: String, required: true };

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true },
	name: requiredString,
	image: requiredString,
	refreshToken: requiredString,
	signupDate: requiredString,
	premium: { type: Boolean, default: false },
	ethAddress: { type: String, default: "" },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
