import { Router } from "express";
import fs from "fs";
import multer from "multer";
import AWS from "aws-sdk";
import mime from "mime";
import Post from "../models/Post";
import User from "../models/userModel";
import authJwt from "../middleware/authJwt";

const ObjectId = require("mongoose").Types.ObjectId;

const router = Router();
const upload = multer({ dest: "/tmp" });
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

router.get("/user", async (req, res) => {
  const username = req.query.username;
  const result = await User.find({ username });
  if (result.length >= 1) {
    res.status(200).send({ message: "Success", contents: result[0]._id });
  } else {
    res.status(500).send({ message: "Username not found." });
  }
});

router.post("/uploadImg", upload.single("image"), async (req, res) => {
  if (req.file !== undefined) {
    const content = fs.readFileSync(req.file.path);
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.file.originalname,
      Body: content,
      ContentType: mime.getType(req.file.path),
      ContentEncoding: "base64",
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("ERROR MSG: ", err);
      }
      res.json(data.Location);
    });
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
  } else {
    res.status(200).send({ message: "No file to be uploaded" });
  }
});

router.post("/post", async (req, res) => {
  const id = String(req.body.id);
  const location = String(req.body.location);
  const address = String(req.body.address);
  const latitude = Number(req.body.latitude);
  const longitude = Number(req.body.longitude);
  const time = new Date(req.body.time);
  const description = String(req.body.description);
  const userID = String(req.body.userID);
  const author = String(req.body.author);
  let tags = [];
  for (var key in req.body.tags) {
    if (req.body.tags.hasOwnProperty(key)) {
      tags.push(req.body.tags[key]);
    }
  }
  let images = [];
  for (var key in req.body.images) {
    if (req.body.images.hasOwnProperty(key)) {
      images.push(req.body.images[key]);
    }
  }
  const newEntry = {
    id,
    location,
    address,
    latitude,
    longitude,
    time,
    description,
    tags,
    images,
    user: ObjectId(userID),
    author,
  };
  try {
    const newPost = await new Post(newEntry).save();
    res.status(200).send({ message: "Success", contents: newPost });
    return newPost;
  } catch (e) {
    res.status(400).send({ message: "Post creation error" });
  }
});

router.get("/posts", async (req, res) => {
  // console.log("Get api called");
  // console.log("req.query", req.query);
  const author = req.query.authorFilter;
  const place = req.query.placeFilter;
  const tags = req.query.tagFilter;
  const coordinate = req.query.coordinateFilter;
  // console.log("Coordinate is", coordinate);
  // console.log("tags", tags);
  const authorFilter = author !== "" ? author : { $exists: true };
  // console.log("authorFilter is ", authorFilter);
  const placeFilter =
    place !== undefined && place !== ""
      ? { $regex: place, $options: "i" }
      : { $exists: true };
  // console.log("placeFilter is ", placeFilter);
  const tagFilter = tags !== undefined ? { $in: tags } : { $exists: true };
  // console.log("tagFilter is ", tagFilter);
  const latFilter =
    coordinate !== undefined
      ? {
          $gte: Number(coordinate.lat) - 0.0001,
          $lte: Number(coordinate.lat) + 0.0001,
        }
      : { $exists: true };
  // console.log("latFilter is ", latFilter);
  const lngFilter =
    coordinate !== undefined
      ? {
          $gte: Number(coordinate.lng) - 0.0001,
          $lte: Number(coordinate.lng) + 0.0001,
        }
      : { $exists: true };
  // console.log("lngFilter is ", lngFilter);
  const result = await Post.find({
    author: authorFilter,
    location: placeFilter,
    tags: tagFilter,
    latitude: latFilter,
    longitude: lngFilter,
  }).sort({ time: -1 });
  // console.log(result);
  if (result.length >= 1) {
    res.status(200).send({ message: "Success", contents: result });
  } else {
    res
      .status(200)
      .send({ message: "No matching result. Please try different filters" });
  }
});

router.get("/post", async (req, res) => {
  const id = String(req.query.id);
  // console.log(id);
  const result = await Post.find({ id });
  if (result.length === 1) {
    res.status(200).send({ message: "Success", contents: result });
  } else {
    res.status(400).send({ message: "Error: Post ID not found" });
  }
  // res.json({ result });
});

router.patch("/post", async (req, res) => {
  // console.log("patch fired");
  const id = String(req.body.id);
  // console.log("req.body is ", req.body);
  const updatedPost = await Post.findOneAndUpdate({ id }, req.body, {
    new: true,
  });
  // console.log(updatedPost);
  res
    .status(200)
    .send({ message: "Updated post successfully", contents: updatedPost });
  // const result = await Post.find({ id });
  // if(result.length !== 1){
  // 	res.status(400).send({ message: 'Error: Post ID not found' });
  // };
});

router.delete("/post", async (req, res) => {
  const id = String(req.query.id);
  try {
    await Post.deleteOne({ id });
    res.status(200).send({ message: "Post deleted" });
  } catch (e) {
    res.status(500).send({ message: "Post deletion failed" });
  }
});

export default router;
