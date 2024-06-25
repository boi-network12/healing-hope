import React from 'react';
import FirstImg from "../../assets/1.jpg";
import SecondImg from "../../assets/2.jpg";
import ThirdImg from "../../assets/3.jpg";
import FourthImg from "../../assets/4.jpg";
import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import './MyCarousel.css';

const items = [
    {
        name: "image 1",
        url: FirstImg,
    },
    {
        name: "image 2",
        url: SecondImg,
    },
    {
        name: "image 3",
        url: ThirdImg,
    },
    {
        name: "image 4",
        url: FourthImg,
    },
];

const MyCarousel = () => {
    return (
        <Carousel
            autoPlay={true}
            interval={3000}
            indicators={false}
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    );
};

const Item = ({ item }) => {
    return (
        <Paper elevation={0} style={{ border: 'none' }}>
            <img src={item.url} alt={item.name} className="carousel-img" />
        </Paper>
    );
};

export default MyCarousel;
