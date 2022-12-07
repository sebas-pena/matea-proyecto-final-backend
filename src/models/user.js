const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true
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
		direction: { type: String },
	},
	{ versionKey: false }
)

UserSchema.pre("save", function (next) {
	if (this.inNew || this.isModified("password")) {
		const document = this
		bcrypt.hash(document.password, 8, (err, hashedPassword) => {
			if (err) {
				next(err)
			} else {
				document.password = hashedPassword
				next()
			}
		})
	} else {
		next()
	}
})

UserSchema.methods.comparePasswords = function (
	candidatepassword,
	callback
) {
	bcrypt.compare(candidatepassword, this.password, function (err, same) {
		if (err) {
			callback(err)
		} else {
			callback(err, same)
		}
	})
}

module.exports = model("User", UserSchema)
