const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    description: {type: String, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
    createdOn: {type: Date, default: new Date() },
    updatedOn: {type: Date, default: new Date()},
    // user: { type: Schema.Types.ObjectId, ref: 'users' }
})

module.exports = mongoose.model('Project', projectSchema)
