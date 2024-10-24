const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name:{type:String, required :true},
    email:{type:String, required: true},
    password:{type:String, required:true},
    role:{type:String, enum:['admin','agent'],default:'agent'}
});

const Agent = mongoose.model('Agent',agentSchema);
module.exports = Agent;
