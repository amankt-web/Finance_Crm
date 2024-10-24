const express = require("express");
const router = express.Router();

const{getAgents,registerAgent,loginAgent,deleteAgent} = require("../controllers/agentController");

router.post('/register',registerAgent);
router.post('/login',loginAgent);
router.get('/',getAgents);
router.delete('/:id',deleteAgent);

module.exports = router;
