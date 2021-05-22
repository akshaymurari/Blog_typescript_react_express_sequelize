const { Sequelize,DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "ecommerce",
  process.env.dbuser,
  process.env.dbpassword,
  {
    "host":"localhost",
    "dialect":"mysql",
    // "logging":false
  }
);

sequelize.authenticate().then(()=>{
    console.log("database connected");  
}).catch((err)=>{
    console.log(`error :${err}`);
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users")(sequelize,DataTypes);

db.posts = require("../models/posts")(sequelize,DataTypes);

db.profile = require("../models/profile")(sequelize,DataTypes);

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users,{
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
});
db.following = require("../models/following")(sequelize,DataTypes);

db.likes = require("../models/like")(sequelize,DataTypes);

db.users.hasOne(db.profile);

db.users.hasMany(db.following);

db.following.belongsTo(db.users);

db.profile.belongsTo(db.users,{
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
})

db.posts.hasMany(db.likes,{
  onDelete:"cascade",
  onUpdate:"cascade"
});

db.likes.belongsTo(db.posts);

sequelize.sync({force:false}).then(()=>{
    console.log("table synced");
}).catch((err)=>{
    console.log(`error sync failed :${err}`);
})

module.exports = db;