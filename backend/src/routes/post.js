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

// router.post("/card", async (req, res) => {
// 	let name = String(req.body.name);
// 	let subject = String(req.body.subject);
// 	let score = Number(req.body.score);
	
// 	const query = {name: name, subject: subject};
// 	const newEntry = {name, subject, score};
// 	const existing = await ScoreCard.findOne(query);
// 	if(existing){
// 		try {
// 			const newScoreCard = await ScoreCard.findOneAndUpdate(query, {score: score}, {
// 				new: true,
// 				upsert: true,
// 				rawResult: true // Return the raw result from the MongoDB driver
// 			});
// 			console.log("Updated score card", newScoreCard.value);
// 			res.json({message: `Updating (${name}, ${subject}, ${score})`, card: newEntry});
// 		} catch (e) {
// 			throw new Error("Update error: " + e);
// 		}
// 	}
// 	else{
// 		try {
// 			const newScoreCard = new ScoreCard(newEntry);
// 			console.log("Created score card", newScoreCard);
// 			res.json({message: `Adding (${name}, ${subject}, ${score})`, card: newEntry});
// 			return newScoreCard.save();
// 		} catch (e) {
// 			throw new Error("ScoreCard creation error: " + e);
// 		}
// 	}
// });

// router.get("/cards", async (req, res) => {
// 	let queryType = String(req.query.type);
// 	let queryString = String(req.query.queryString);
// 	var messages = [];
// 	if(queryType === "name"){
// 		const cards = await ScoreCard.find({name: queryString});
// 		if(cards.length === 0){
// 			messages.push(`Name (${queryString}) not found!`);
// 		}
// 		else{
// 			for(const e of cards){
// 				messages.push(`Found card with name: (${e.name}, ${e.subject}, ${e.score})`);
// 			}
// 		}
// 	}
// 	else{ // queryType === "subject"
// 		var messages = [];
// 		const cards = await ScoreCard.find({subject: queryString});
// 		if(cards.length === 0){
// 			messages.push(`Subject (${queryString}) not found!`);
// 		}
// 		else{
// 			for(const e of cards){
// 				messages.push(`Found card with subject: (${e.name}, ${e.subject}, ${e.score})`);
// 			}
// 		}
// 	}
// 	res.json({messages})
// });