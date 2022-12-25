import { Router } from "express";
import Post from "../models/Post";

const router = Router();

router.post("/post", async (req, res) => {
	const id = String(req.body.id);
	const address = String(req.body.address);
	const latitude = Number(req.body.latitude);
	const longitude = Number(req.body.longitude);
	const time = Date(req.body.time);
	const description = String(req.body.description);
	const newEntry = {
		id,
		address,
		latitude,
		longitude,
		time,
		description
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