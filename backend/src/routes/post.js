import { Router } from "express";
import fs from 'fs';
import multer from 'multer';
import AWS from 'aws-sdk';
import mime from 'mime';
import Post from "../models/Post";

const router = Router();
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploadedFiles/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});
var upload = multer({ storage: storage });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
		images
	};
	try{
		const newPost = await new Post(newEntry).save();
		console.log("Created post", newPost);
		res.json({ newPost });
		return newPost;
	}
	catch(e){
		throw new Error("Post creation error: " + e);
	};
});

router.get("/posts", async (req, res) => {
	const id = String(req.query.id);
	const post = await Post.find({ id });
	res.json({ post });
});

export default router;