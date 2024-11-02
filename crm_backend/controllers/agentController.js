const Agent = require("../models/agentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerAgent = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAgent = new Agent({
            name: req.body.name, 
            email: req.body.email,
            password: hashedPassword, 
            role:'agent',
        });
        newAgent.save()
        .then((agent) => {
        res.status(201).json({
         message: "Agent registered successfully",
         agent: agent,
         });
       })
        
    } catch (error) {
        res.status(400).json({message:error.message});
    }
} 

//login an agent
exports.loginAgent = async (req,res) =>{
    const agent = await Agent.findOne({email:req.body.email});
    if(!agent)
        return res.status(404).json({message:'Agent Not Found'});

    const validPassword = await bcrypt.compare(req.body.password,agent.password);
    if(!validPassword)
        return res.status(404).json({message:"Invalid password or email "})

    const token = jwt.sign({id:agent._id, role:agent.role}, process.env.JWT_SECRET)
    res.status(200).json({token,agent});
};

//get all agents

exports.getAgents = async (req,res) =>{
    const agents = await Agent.find();
    res.status(200).json(agents);
};

//admin can delete an agent
exports.deleteAgent = async (req, res) => {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).send();
};