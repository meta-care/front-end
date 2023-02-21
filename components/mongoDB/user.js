const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true },
	refreshToken: { type: String, required: true },
	signupDate: { type: Date },
	premium: { type: Boolean, default: false },
	ethAddress: { type: String, default: "" },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
