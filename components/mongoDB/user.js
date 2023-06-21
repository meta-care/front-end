const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	refreshToken: { type: String, required: true },
	signupDate: { type: String, required: true },
	professionnals: { type: Array, required: false },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
