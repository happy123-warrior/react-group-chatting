const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: {
        type:String,
    },
    users : {
        type: Array,
        default:[],
    },


})


module.exports = mongoose.model("Group", groupSchema);