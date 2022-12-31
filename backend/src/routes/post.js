import { Router } from "express";
import fs from 'fs';
import multer from 'multer';
import AWS from 'aws-sdk';
import mime from 'mime';
import Post from "../models/Post";
import User from "../models/userModel";

const ObjectId = require('mongoose').Types.ObjectId; 

const router = Router();
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "uploadedFiles/")
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.originalname)
// 	}
// });
// var upload = multer({ storage: storage });
const upload = multer({ dest: 'uploadedFiles/' });
// console.log(upload);
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.get("/user", async (req,res) => {
	// console.log("Get user api called");
	// console.log("req.query.username", req.query.username);
	const username = req.query.username;
	const result = await User.find({username});
	if(result.length >= 1){
		// console.log(result);
		res.status(200).send({ message: 'Success', contents: result[0]._id });
	}
	else{
		res.status(500).send({ message: 'Username not found.' });
	};
});

router.post("/uploadImg", upload.single('image'), async (req, res) => {
	// console.log(req.file);
	const content = fs.readFileSync(req.file.path);
	// console.log(mime.getType(req.file.path));
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: req.file.originalname,
		Body: content,
		ContentType: mime.getType(req.file.path),
		ContentEncoding: 'base64'
	};
	s3.upload(params, (err, data) => {
		if (err) {
			console.log('ERROR MSG: ', err);
		};
		// console.log(data);
		res.json(data.Location);
	});
	fs.unlink(req.file.path, (err => {
		if (err) console.log(err);
		else console.log("\nDeleted file");
	}));
});

router.post("/post", async (req, res) => {
	const id = String(req.body.id);
	const address = String(req.body.address);
	const latitude = Number(req.body.latitude);
	const longitude = Number(req.body.longitude);
	const time = Date(req.body.time);
	const description = String(req.body.description);
	const userID = String(req.body.userID);
	const author = String(req.body.author);
	// console.log("Working here");
	// console.log(userID);
	// console.log(req.body.images);
	let tags = [];
	for (var key in req.body.tags) {
		if (req.body.tags.hasOwnProperty(key)) {
			tags.push(req.body.tags[key]);
		};
	};
	let images = [];
	for (var key in req.body.images) {
		if (req.body.images.hasOwnProperty(key)) {
			images.push(req.body.images[key]);
		};
	};
	const newEntry = {
		id,
		address,
		latitude,
		longitude,
		time,
		description,
		tags,
		images,
		user: ObjectId(userID),
		author
	};
	try{
		const newPost = await new Post(newEntry).save();
		console.log("Created post", newPost);
		res.status(200).send({ message: 'Success', contents: newPost });
		// res.json({ newPost });
		return newPost;
	}
	catch(e){
		res.status(400).send({ message: 'Post creation error' });
		// throw new Error("Post creation error: " + e);
	};
});

router.get("/posts", async (req, res) => {
	// console.log("Get api called");
	// console.log("req.query", req.query);
	const author = req.query.authorFilter;
	const place = req.query.placeFilter;
	const tags = req.query.tagFilter;
	// console.log("tags", tags);
	const authorFilter = (author !== "") ? author : { $exists: true };
	// console.log(authorFilter);
	const placeFilter = (place !== "") ? place : { $exists: true };
	const tagFilter = (tags !== undefined) ? { $in: tags } : { $exists: true };
	const result = await Post.find({author: authorFilter, address: placeFilter, tags: tagFilter}).sort({time: -1});
	if(result.length >= 1){
		res.status(200).send({ message: 'Success', contents: result });
	}
	else{
		res.status(200).send({ message: 'No matching result. Please try different filters' });
	};
});

router.get("/post", async (req, res) => {
	const id = String(req.query.id);
	// console.log(id);
	const result = await Post.find({ id });
	if(result.length === 1){
		res.status(200).send({ message: 'Success', contents: result });
	}
	else{
		res.status(400).send({ message: 'Error: Post ID not found' });
	};
	// res.json({ result });
});

router.patch("/post", async (req, res) => {
	const id = String(req.query.id);
	// console.log(req.body);
	const updatedPost = await Post.findOneAndUpdate({ id }, req.body, { new: true });
	console.log(updatedPost);
	res.status(200).send({ message: 'Updated post successfully', contents: updatedPost });
	// const result = await Post.find({ id });
	// if(result.length !== 1){
	// 	res.status(400).send({ message: 'Error: Post ID not found' });
	// };
});

router.delete("/post", async (req, res) => {
	const id = String(req.query.id);
	try{
		await Post.deleteOne({ id });
		res.status(200).send({ message: 'Post deleted' });
	}
	catch (e) {
		res.status(500).send({ message: 'Post deletion failed' });
	};
});

export default router;