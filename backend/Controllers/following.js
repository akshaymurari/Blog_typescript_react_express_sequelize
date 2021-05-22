const follow = async (req,res,db) => {
    try{
        const data = req.body;
        console.log(data);
        const user = require("./auth")(req.body.token);
        if(user && user.username!==data.username){
            const found = await db.following.count({
                where:{
                    username: user.username,
                    userUsername:data.username
                }
            })
            if(found==0){
                const result = await db.following.create({
                    username: user.username,
                    userUsername:data.username
                })
                console.log(result);
                return res.status(200).send(result.dataValues);
            }
            else{
                const result = await db.following.destroy({
                    where:{
                        username: user.username,
                        userUsername:data.username
                    }
                })
                console.log(result);
                return res.status(200).send("already following");
            }
        }else{
            return res.status(400).send("invalid token")
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error in follow");
    }
}

const getfollowingstatus = async (req,res,db) => {
    try{
        const data = req.body;
        console.log(data);
        const user = require("./auth")(req.body.token);
        if(user){
            const result = await db.following.count({
                where:{
                    username: user.username,
                    userUsername:data.username
                }
            })
            console.log(result);
            if(result==0){
                return res.status(200).send("follow");
            }
            else{
                return res.status(200).send("following");
            }
        }else{
            return res.status(400).send("invalid token")
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error in getstatusfollowing");
    }
}

const getfollowing = async (req,res,db) => {
    try{
        const data = req.body;
        console.log(data);
        const user = require("./auth")(req.body.token);
        if(user){
            const followers = await db.following.findAll({
                where:{
                    userUsername: data.username
                }
            })
            const following = await db.following.findAll({
                where:{
                    username: data.username
                }
            })
            console.log(followers,"followers");
            console.log(followers,"following");
            return res.status(200).send({followers,following});
        }else{
            return res.status(400).send("invalid token")
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error in getfollowing")
    }
}


const getourfollowing = async (req,res,db) => {
    try{
        const data = req.body;
        console.log(data);
        const user = require("./auth")(req.body.token);
        if(user){
            data.username=user.username;
            const followers = await db.following.findAll({
                where:{
                    userUsername: data.username
                }
            })
            const following = await db.following.findAll({
                where:{
                    username: data.username
                }
            })
            console.log(followers,"followers");
            console.log(followers,"following");
            return res.status(200).send({followers,following});
        }else{
            return res.status(400).send("invalid token")
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error in getfollowing")
    }
}

module.exports = {follow,getfollowing,getfollowingstatus,getourfollowing};
