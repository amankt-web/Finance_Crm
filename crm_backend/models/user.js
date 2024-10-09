
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type:String, require:true},
    password: { type: String, required: true },
    role: { type: String, enum:['user','admin'],default: 'user' }
});

//hash password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified('password'))
        return next();
    this.password = await bcrypt().hash(this.password, 10);
})

//compare the hash password 
userSchema.methods.comparePassword = function(password){
    return bcrypt.compaare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
