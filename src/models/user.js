const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
	{
		username: {
			type: String,
			require: true,
		},
		rol: {
			type: String,
			enum: ["admin", "customer"],
			default: "customer",
		},
		email: {
			type: String,
			require: true,
			unique: true
		},
		password: {
			type: String,
			require: true,
		},
		phone: {
			type: String,
			default: ""
		},
		direction: {
			type: String,
			default: ""
		},
		profileImage: {
			type: String,
			default:
				"https://koohanimlaw.com/wp-content/uploads/2015/01/default-user-icon-profile.png",
		}
	},
	{ versionKey: false }
)

module.exports = model("User", UserSchema)
