# Data Association

Data Association is the process of connecting the data of one model to another through id of the data.

EXAMPLE : - In user model the users collection stores the id its posts.In post model the post collection stores the id of the user

user collection ->posts id
posts->user id

Each collections document contains its unique id so we can use this unique id to link the data

populate() method converts the collections documents specified fileds id's into the actual documents

eg:
let data = await users
.findOne({ _id: "660ffaca6d73f235f492ce8b" })
.populate("posts");
