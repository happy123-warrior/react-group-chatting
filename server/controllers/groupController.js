const Group = require("../models/groupModel");

module.exports.addGroup = async(req,res,next) => {
    const {groupName} = req.body
    const isExist = await Group.findOne({ groupName});
    if (isExist)
        return res.json({msg:'GroupName is aleray used '})
    const data = await Group.create({
        groupName
    })
    return res.json({status: true,data});
}

module.exports.allGroup = async(req,res,next) => {
    const groups = await Group.find();
    return res.json({groups,staus:true});
}
module.exports.joinGroup = async(req,res,next) => {
    console.log(req.body)
    const {groupName,user} = req.body;
   // console.log(groupName)
    const result = await Group.findOne({groupName:groupName});
    
    await Group.updateOne({groupName:groupName},{$push:{users:user}})
    return res.json({data:result,staus:true})
}