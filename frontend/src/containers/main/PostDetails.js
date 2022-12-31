import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Ben from "../../images/ben.jpg";
import Architects from "../../images/architects.jpg";
import Briton from "../../images/briton.jpg";
import Chris from "../../images/chris.jpg";
import Gigo from "../../images/gigo.jpg";
import Josh from "../../images/josh.jpg";
import Sam from "../../images/sam.jpg";
import Steven from "../../images/steven.jpg";
import WSS from "../../images/wss.jpg";
import Lawrence from "../../images/Lawrence.jfif";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
  },
  background: {
    backgroundColor: "palegoldenrod",
    width: "100%",
    height: "100%",

    top: "0",
    left: "0",
  },
  mainPicture: {
    width: "50%",
    height: "50%",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function PostDetails() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h1>PostDetails</h1>
        <div>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </div>
      </div>
      <h2>Title: {fakeData.title}</h2>
      <h2>Author: {fakeData.author}</h2>
      <h2>Date: {fakeData.time}</h2>
      <h2>
        Tags :{" "}
        <div className={classes.tags}>
          {fakeData.tags.map((tags) => (
            <div>{tags}. </div>
          ))}
        </div>
      </h2>
      <h3>Description: {fakeData.description}</h3>
      <div class="carousel-wrapper" className={classes.mainPicture}>
        <Carousel infiniteLoop useKeyboardArrows autoPlay showArrows={true}>
          <div>
            <img src={Ben} alt="Ben" />
            <p className="legend">Ben</p>
          </div>
          <div>
            <img src={Architects} alt="Architects" />
            <p className="legend">Architects</p>
          </div>
          <div>
            <img src={Briton} alt="Briton" />
            <p className="legend">Briton</p>
          </div>
          <div>
            <img src={Chris} alt="Chris" />
            <p className="legend">Chris</p>
          </div>
          <div>
            <img src={Gigo} alt="Gigo" />
            <p className="legend">Gigo</p>
          </div>
          <div>
            <img src={Josh} alt="Josh" />
            <p className="legend">Josh</p>
          </div>
          <div>
            <img src={Sam} alt="Sam" />
            <p className="legend">Sam</p>
          </div>
          <div>
            <img src={Steven} alt="Steven" />
            <p className="legend">Steven</p>
          </div>
          <div>
            <img src={WSS} alt="While She Sleeps" />
            <p className="legend">While She Sleeps</p>
          </div>
          <div>
            <img src={Lawrence} alt="Lawrence" />
            <p className="legend">Lawrence</p>
          </div>
        </Carousel>
        <h3>Address : {fakeData.address}</h3>
      </div>
    </div>
  );
}

const fakeData = {
  title: "這球樂團修煉場",
  address:
    "106, Taipei City, Da’an District, Section 1, Fuxing S Rd, 390號十樓之六",
  time: "2022/12/31",
  description:
    "成立於2006年，主要經營項目為練團室出租及音樂教學。在這裡我們提供頂級練團設備及專業的服務品質，用心聚焦於提供每位音樂同好一個舒適練團環境。",
  tags: [
    "練團",
    "學生樂團",
    "樂器學習",
    "歌唱教學",
    "吉他",
    "貝斯",
    "鋼琴",
    "爵士鼓",
  ],
  author: "Wilson",
};
