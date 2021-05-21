const auth = require("./auth");

const getposts = async (req,res,db) => {
    try{
        const data = req.body;
        const user = auth(data.token);
        if(user){
            console.log(user);
            const result = await db.posts.findAll({
                where:{
                    userUsername:user.username
                }
            });
            console.log(result);
            return res.status(200).send({data:result});
        }
        return res.status(400).send("invalid jwt token");
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error");
    }
}

const addposts = async (req,res,db) => {
    const data = req.body;
    const user = auth(data.token);
    if(!user){
        return res.status(400).send("invalid jwt token");
    }
    else{
        try{
            const img = data.profilepic.replace(/^data:image\/png;base64,/,"");
            const posts = await db.posts.create({
                userUsername: user.username,
                tagline:data.tagline,
                pic:""
            });
            console.log(posts,"in 39");
            const postdata = posts.dataValues;
            require("fs").writeFileSync(
                "./static/posts/" + user.username.trim() + postdata.id + ".png",
                img,
                "base64",
                function (err) {
                  console.log(err);
                }
            )
            const result = await db.posts.update({
                userUsername: user.username,
                tagline:data.tagline,
                pic: `${process.env.Baseurl}/static/posts/${user.username.trim()}${postdata.id}.png`,
            },
            {
                where:{
                    id:postdata.id
                }
            }
            );
            console.log(result);
            const allposts = await db.posts.findAll({
                where:{
                    userUsername:user.username
                },
                attributes:["id","pic","tagline"]
            })
            console.log(allposts);
            const senddata=[];
            for(var i=0;i<allposts.length;i++){
                var obj = (allposts[i].dataValues);
                senddata.push({pic:obj.pic, tagline:obj.tagline,id:obj.id})
            }
            console.log(senddata,"insend");
            return res.status(200).send(senddata);
        }
        catch(error){
            console.log(error);
            return res.status(400).send("error in addposts")
        }
    }
}

module.exports = {addposts,getposts}
