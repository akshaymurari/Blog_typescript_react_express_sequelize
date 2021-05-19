const auth = require("./auth");

const getposts = (req,res,db) => {
    try{
        const data = req.body;
        if(!auth(data.token)){
            return res.status(400).send("invalid jwt token");
        }
        const result = req.db.posts.findAll({});
        console.log(result);
        return res.status(200).send({data:result});
    }
    catch{
        return res.status(400).send("error");
    }
}

const addposts = (req,res,db) => {
    const data = JSON.parse(req.data);
    if(!auth(data.token)){
        return res.status(400).send("invalid jwt token");
    }
    if(req.files!=null){
        return res.status(400).send("file is null");
    }
    else{
        const file = req.files.file;
        const pic = `${__dirname}/static/${file.name}`;
        file.mv(`${__dirname}/static/${file.name}`,function(err){
            if(err){
                console.log(`error in addposts ${err}`);
            }
            else{
                const result = db.posts.create({
                    pic,
                    tagline:data.tagline
                });
                console.log(result);
                return res.status(200).send({pic:pic});
            }
        })
    }
}

module.exports = {addposts,getposts}