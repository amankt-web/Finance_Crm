const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Data', dataSchema);
