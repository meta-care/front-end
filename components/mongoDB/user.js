const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	refreshToken: { type: String, required: true },
	signupDate: { type: String, required: true },
	premium: { type: Boolean, default: false },
	achievements: { type: Array },
	address: { type: String },
	premiumDate: { type: String },
	professionnals: { type: Array },
	publicData: { type: Boolean },
	tokenID: { type: Number },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
